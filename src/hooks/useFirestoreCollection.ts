import { useState, useEffect } from "react";
import { db } from "../lib/firebase"; // Adjust this relative path to point to your firebase.ts
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export function useFirestoreCollection<T>(collectionName: string, orderByField?: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 1. Reference the target collection
        const collectionRef = collection(db, collectionName);
        
        // 2. Optional: Add sorting logic if an orderByField is passed
        const q = orderByField 
          ? query(collectionRef, orderBy(orderByField, "asc"))
          : collectionRef;

        // 3. Fetch the snapshot from Firestore
        const querySnapshot = await getDocs(q);
        
        // 4. Map the documents into a clean array including their Firestore IDs
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as T[];

        setData(items);
        setError(null);
      } catch (err: any) {
        console.error(`Error fetching collection ${collectionName}:`, err);
        setError(err.message || "Failed to load data from database.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [collectionName, orderByField]);

  return { data, loading, error };
}