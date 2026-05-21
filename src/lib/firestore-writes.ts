import { addDoc, collection, serverTimestamp, Timestamp } from "firebase/firestore";
import { db } from "./firebase";

export async function createCustomInquiry(data: {
  occasion: string;
  itemType: string;
  size: string;
  photoCount: number;
  name: string;
  email: string;
  phone: string;
  deadline?: string;
  vision: string;
}) {
  return addDoc(collection(db, "customInquiries"), {
    ...data,
    status: "new",
    createdAt: serverTimestamp(),
  });
}

export async function createPrivateBooking(data: {
  date: Date;
  guestCount: number;
  guests: Array<{ name: string; workshop: string }>;
  contactName: string;
  email: string;
  phone: string;
  notes?: string;
}) {
  return addDoc(collection(db, "privateBookings"), {
    ...data,
    date: Timestamp.fromDate(data.date),
    status: "new",
    createdAt: serverTimestamp(),
  });
}

export async function createReservation(data: {
  date: Date;
  guestCount: number;
  guests: Array<{ name: string; workshopId: string; workshopName: string; price: number }>;
  totalAmount: number;
  contactName: string;
  email: string;
  phone: string;
  notes?: string;
}) {
  return addDoc(collection(db, "reservations"), {
    ...data,
    date: Timestamp.fromDate(data.date),
    status: "pending",
    createdAt: serverTimestamp(),
  });
}
