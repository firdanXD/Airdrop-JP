import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import {
  collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, getDocs, writeBatch,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useAuth } from './AuthContext';
import { type Airdrop } from '../types';
import { sampleAirdrops } from '../data/sampleData';
import { toast } from 'react-hot-toast';

declare const __app_id: string;

interface AirdropContextType {
  airdrops: Airdrop[];
  addAirdrop: (airdrop: Omit<Airdrop, 'id' | 'dateAdded'>) => Promise<void>;
  updateAirdrop: (id: string, updatedAirdrop: Partial<Airdrop>) => Promise<void>;
  deleteAirdrop: (id: string) => Promise<void>;
  resetAirdrops: () => Promise<void>;
  checkInAirdrop: (id: string) => Promise<void>;
  loading: boolean;
}

const AirdropContext = createContext<AirdropContextType | undefined>(undefined);

export const AirdropProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [airdrops, setAirdrops] = useState<Airdrop[]>([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useAuth();
  const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

  useEffect(() => {
    if (!userId || !db) {
      setLoading(!userId);
      return;
    }

    const collectionPath = `artifacts/${appId}/users/${userId}/airdrops`;
    const q = query(collection(db, collectionPath));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const airdropsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Airdrop));
      setAirdrops(airdropsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching airdrops:", error);
      toast.error("Failed to load airdrops.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId, appId]);

  const getCollectionRef = () => {
      if (!userId) throw new Error("User not authenticated");
      return collection(db, `artifacts/${appId}/users/${userId}/airdrops`);
  }

  const addAirdrop = async (airdrop: Omit<Airdrop, 'id' | 'dateAdded'>) => {
    try {
      const newAirdrop = { ...airdrop, dateAdded: new Date().toISOString() };
      await addDoc(getCollectionRef(), newAirdrop);
      toast.success(`${airdrop.projectName} airdrop added!`);
    } catch (error) {
      console.error("Error adding airdrop:", error);
      toast.error("Failed to add airdrop.");
    }
  };

  const updateAirdrop = async (id: string, updatedAirdrop: Partial<Airdrop>) => {
    try {
      const docRef = doc(db, `artifacts/${appId}/users/${userId}/airdrops`, id);
      await updateDoc(docRef, updatedAirdrop);
      toast.success(`Airdrop updated!`);
    } catch (error) {
      console.error("Error updating airdrop:", error);
      toast.error("Failed to update airdrop.");
    }
  };

  const deleteAirdrop = async (id: string) => {
    try {
      const docRef = doc(db, `artifacts/${appId}/users/${userId}/airdrops`, id);
      await deleteDoc(docRef);
      toast.error(`Airdrop deleted!`);
    } catch (error) {
      console.error("Error deleting airdrop:", error);
      toast.error("Failed to delete airdrop.");
    }
  };

  const resetAirdrops = async () => {
    try {
        const collectionRef = getCollectionRef();
        const querySnapshot = await getDocs(collectionRef);
        const batch = writeBatch(db);
        querySnapshot.docs.forEach(doc => batch.delete(doc.ref));
        sampleAirdrops.forEach(airdropSample => {
            const newDocRef = doc(collectionRef);
            batch.set(newDocRef, airdropSample);
        });
        await batch.commit();
        toast.success('All data has been reset!');
    } catch (error) {
        console.error("Error resetting data:", error);
        toast.error("Failed to reset data.");
    }
  };

  const checkInAirdrop = async (id: string) => {
    try {
      const docRef = doc(db, `artifacts/${appId}/users/${userId}/airdrops`, id);
      await updateDoc(docRef, { lastCheckedIn: new Date().toISOString() });
      toast.success('Daily task marked as complete!');
    } catch (error) {
      console.error("Failed to check in:", error);
      toast.error("Failed to mark task.");
    }
  };

  return (
    <AirdropContext.Provider value={{ airdrops, addAirdrop, updateAirdrop, deleteAirdrop, resetAirdrops, checkInAirdrop, loading }}>
      {children}
    </AirdropContext.Provider>
  );
};

export const useAirdrops = () => {
  const context = useContext(AirdropContext);
  if (context === undefined) {
    throw new Error('useAirdrops must be used within an AirdropProvider');
  }
  return context;
};
