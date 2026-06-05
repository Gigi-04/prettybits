import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
  updateDoc,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export async function fetchCollection<T>(name: string, orderField?: string): Promise<T[]> {
  const ref = collection(db, name);
  const q = orderField ? query(ref, orderBy(orderField, "desc")) : ref;
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as T[];
}

export async function updateDocument(coll: string, id: string, data: Record<string, unknown>) {
  return updateDoc(doc(db, coll, id), data);
}

export async function deleteDocument(coll: string, id: string) {
  return deleteDoc(doc(db, coll, id));
}

export async function createDocument(coll: string, data: Record<string, unknown>) {
  return addDoc(collection(db, coll), { ...data, createdAt: serverTimestamp() });
}

export async function createWorkshopSession(data: {
  date: Date;
  time?: string;
  totalSlots: number;
  remainingSlots: number;
  availableItems: Array<{ name: string; price: number }>;
}) {
  return addDoc(collection(db, "workshops"), {
    date: Timestamp.fromDate(data.date),
    time: data.time ?? "",
    totalSlots: data.totalSlots,
    remainingSlots: data.remainingSlots,
    "available items": data.availableItems,
    createdAt: serverTimestamp(),
  });
}

export async function updateWorkshopSession(
  id: string,
  data: Partial<{
    date: Date;
    time: string;
    totalSlots: number;
    remainingSlots: number;
    availableItems: Array<{ name: string; price: number }>;
  }>,
) {
  const payload: Record<string, unknown> = {};
  if (data.date) payload.date = Timestamp.fromDate(data.date);
  if (data.time !== undefined) payload.time = data.time;
  if (data.totalSlots !== undefined) payload.totalSlots = data.totalSlots;
  if (data.remainingSlots !== undefined) payload.remainingSlots = data.remainingSlots;
  if (data.availableItems) payload["available items"] = data.availableItems;
  return updateDoc(doc(db, "workshop", id), payload);
}

export async function createStarterKitOrder(data: {
  itemId: string;
  itemName: string;
  colours: string[];
  glitter: string;
  quantity: number;
  total: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  notes?: string;
}) {
  return addDoc(collection(db, "starterKitOrders"), {
    ...data,
    status: "new",
    createdAt: serverTimestamp(),
  });
}