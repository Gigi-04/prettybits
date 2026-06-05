import type { Timestamp } from "firebase/firestore";

export interface WorkshopItem {
  name: string;
  price: number;
}

export interface Workshops {
  id: string;
  date: Timestamp | { toDate: () => Date } | string | Date;
  time?: string;
  remainingSlots?: number;
  totalSlots?: number;
  "available items"?: WorkshopItem[];
  availableItems?: WorkshopItem[];
}

export interface StarterKit {
  id: string;
  name: string;
  price: number;
  description?: string;
  category?: string;
  imageURL?: string;
  stockStatus?: string;
}

export interface CustomInquiry {
  occasion: string;
  itemType: string;
  size: string;
  photoCount: number;
  name: string;
  email: string;
  phone: string;
  deadline?: string;
  vision: string;
  createdAt: ReturnType<typeof Date>;
}

export interface PrivateBooking {
  date: Date;
  guestCount: number;
  guests: Array<{ name: string; workshop: string }>;
  contactName: string;
  email: string;
  phone: string;
  notes?: string;
  createdAt: Date;
}

export interface Reservation {
  date: Date;
  guestCount: number;
  guests: Array<{ name: string; workshopId: string; workshopName: string; price: number }>;
  totalAmount: number;
  contactName: string;
  email: string;
  phone: string;
  notes?: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: Date;
}

/** Safely convert any Firestore date field (Timestamp, string, Date) to JS Date. */
export function toJsDate(value: unknown): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value === "object" && value !== null && typeof (value as { toDate?: () => Date }).toDate === "function") {
    try {
      return (value as { toDate: () => Date }).toDate();
    } catch {
      return null;
    }
  }
  if (typeof value === "string" || typeof value === "number") {
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
  }
  return null;
}
