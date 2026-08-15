import {
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase"; // adjust to your actual firebase init file

export const BOOKING_STATUS = {
  PENDING_PAYMENT: "pending_payment",
  INVOICED: "invoiced",
  CONFIRMED: "confirmed",
  CANCELLED: "cancelled",
} as const;

export type BookingStatus = (typeof BOOKING_STATUS)[keyof typeof BOOKING_STATUS];

export interface BookingItem {
  workshopName: string;
  workshopPrice: number | null;
  quantity: number;
}

export interface BookingInput {
  name: string;
  phone: string;
  email?: string;
  items: BookingItem[];
  date: string;
  notes?: string;
}

/**
 * Creates a new booking doc. Called on form submit, before the
 * WhatsApp handoff opens. partySize and total are derived from
 * items so they don't need to be tracked separately.
 */
export async function createBooking(input: BookingInput): Promise<string> {
  const partySize = input.items.reduce((sum, item) => sum + item.quantity, 0);
  const total = input.items.reduce(
    (sum, item) => sum + (item.workshopPrice ?? 0) * item.quantity,
    0
  );

  const ref = await addDoc(collection(db, "bookings"), {
    name: input.name,
    phone: input.phone,
    email: input.email || "",
    items: input.items,
    partySize,
    total,
    date: input.date,
    notes: input.notes || "",
    status: BOOKING_STATUS.PENDING_PAYMENT,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

/**
 * Admin action — flips a booking's status once payment is confirmed
 * (or invoiced, or cancelled).
 */
export async function updateBookingStatus(
  bookingId: string,
  status: BookingStatus
): Promise<void> {
  await updateDoc(doc(db, "bookings", bookingId), { status });
}

/**
 * Builds a pre-filled WhatsApp message summarizing the booking,
 * so the owner gets everything she needs to send an invoice.
 */
export function buildBookingWhatsAppMessage(input: BookingInput): string {
  const partySize = input.items.reduce((sum, item) => sum + item.quantity, 0);
  const total = input.items.reduce(
    (sum, item) => sum + (item.workshopPrice ?? 0) * item.quantity,
    0
  );

  const itemLines = input.items.map(
    (item) =>
      `- ${item.quantity}x ${item.workshopName}${
        item.workshopPrice ? ` (R${item.workshopPrice}pp)` : ""
      }`
  );

  const lines: (string | null)[] = [
    "Hi! I'd like to book a resin workshop.",
    "",
    `Name: ${input.name}`,
    `Phone: ${input.phone}`,
    input.email ? `Email: ${input.email}` : null,
    `Date: ${input.date}`,
    "",
    "Items:",
    ...itemLines,
    "",
    `Total party size: ${partySize}`,
    total ? `Estimated total: R${total}` : null,
    input.notes ? `Notes: ${input.notes}` : null,
  ];

  return lines.filter((line): line is string => line !== null).join("\n");
}