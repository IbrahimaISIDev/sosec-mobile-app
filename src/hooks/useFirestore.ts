// src/hooks/useFirestore.ts
import { useState, useEffect } from 'react';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { TruckData } from '../types/truck.types';
import { ExpenseData } from '../types/expense.types';
import { HistoryItem } from '../types/history.types';
import { useAuth } from './useAuth';

export const useFirestore = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Typage corrigé avec FirebaseFirestoreTypes.Module
  const getFirestore = (): FirebaseFirestoreTypes.Module => firestore();

  const getTruckById = async (truckId: string): Promise<TruckData | null> => {
    if (!truckId) return null;
    setLoading(true);
    setError(null);
    try {
      const truckDoc = await firestore().collection('trucks').doc(truckId).get();
      if (truckDoc.exists) {
        return { id: truckDoc.id, ...truckDoc.data() } as TruckData;
      }
      return null;
    } catch (err) {
      const errorMsg = 'Erreur lors de la récupération du camion';
      console.error(`${errorMsg}:`, err);
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getLastFuelingForTruck = async (truckId: string): Promise<ExpenseData | null> => {
    if (!truckId) return null;
    setLoading(true);
    setError(null);
    try {
      const fuelingSnapshot = await firestore()
        .collection('expenses')
        .where('truckId', '==', truckId)
        .where('type', '==', 'fuel')
        .orderBy('date', 'desc')
        .limit(1)
        .get();

      if (!fuelingSnapshot.empty) {
        const fuelingDoc = fuelingSnapshot.docs[0];
        return { id: fuelingDoc.id, ...fuelingDoc.data() } as ExpenseData;
      }
      return null;
    } catch (err) {
      const errorMsg = 'Erreur lors de la récupération du dernier plein';
      console.error(`${errorMsg}:`, err);
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateTruckMileage = async (truckId: string, newMileage: number): Promise<{ success: boolean; message?: string }> => {
    if (!truckId || typeof newMileage !== 'number') {
      return { success: false, message: 'Paramètres invalides' };
    }
    setLoading(true);
    setError(null);
    try {
      await firestore()
        .collection('trucks')
        .doc(truckId)
        .update({
          currentKm: newMileage,
          lastUpdated: firestore.FieldValue.serverTimestamp(),
        });
      return { success: true };
    } catch (err) {
      const errorMsg = 'Erreur lors de la mise à jour du kilométrage';
      console.error(`${errorMsg}:`, err);
      setError(errorMsg);
      return { success: false, message: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const addMileageRecord = async (record: {
    truckId: string;
    driverId: string;
    kilometer: number;
    imageUrl?: string;
  }): Promise<{ success: boolean; data?: any; message?: string }> => {
    if (!record.truckId || !record.driverId || typeof record.kilometer !== 'number') {
      return { success: false, message: 'Paramètres invalides' };
    }
    setLoading(true);
    setError(null);
    try {
      const newRecord = {
        ...record, 
        date: firestore.FieldValue.serverTimestamp(),
        isVerified: false,
        syncStatus: 'synced' as const,
      };

      const docRef = await firestore().collection('mileage').add(newRecord);
      const updateResult = await updateTruckMileage(record.truckId, record.kilometer);

      if (!updateResult.success) {
        throw new Error('Échec de la mise à jour du kilométrage');
      }

      return { success: true, data: { id: docRef.id, ...newRecord } };
    } catch (err) {
      const errorMsg = 'Erreur lors de l’ajout du relevé kilométrique';
      console.error(`${errorMsg}:`, err);
      setError(errorMsg);
      return { success: false, message: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const getHistoryItems = async (userId: string): Promise<HistoryItem[]> => {
    if (!userId) return [];
    setLoading(true);
    setError(null);
    try {
      const mileageSnapshot = await firestore()
        .collection('mileage')
        .where('driverId', '==', userId)
        .orderBy('date', 'desc')
        .get();

      const expensesSnapshot = await firestore()
        .collection('expenses')
        .where('driverId', '==', userId)
        .orderBy('date', 'desc')
        .get();

      const mileageItems: HistoryItem[] = mileageSnapshot.docs.map(doc => ({
        id: doc.id,
        category: 'mileage' as const,
        type: 'tableau_bord' as const,
        date: doc.data().date?.toDate() || new Date(),
        mileage: doc.data().kilometer,
        truckId: doc.data().truckId,
        driverId: doc.data().driverId,
        imageUrl: doc.data().imageUrl,
        syncStatus: doc.data().syncStatus || 'synced',
        verificationStatus: doc.data().isVerified ? 'verified' : 'pending',
      }));

      const expenseItems: HistoryItem[] = expensesSnapshot.docs.map(doc => ({
        id: doc.id,
        category: doc.data().type === 'fuel' ? 'expense' : 'ticket',
        type: (doc.data().type === 'fuel' ? 'carburant' : doc.data().type) as HistoryItem['type'],
        date: doc.data().date?.toDate() || new Date(),
        amount: doc.data().amount,
        truckId: doc.data().truckId,
        driverId: doc.data().driverId,
        imageUrl: doc.data().receiptImageUrl,
        syncStatus: doc.data().syncStatus || 'synced',
      }));

      return [...mileageItems, ...expenseItems].sort((a, b) => b.date.getTime() - a.date.getTime());
    } catch (err) {
      const errorMsg = 'Erreur lors de la récupération de l’historique';
      console.error(`${errorMsg}:`, err);
      setError(errorMsg);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    getFirestore,
    getTruckById,
    getLastFuelingForTruck,
    updateTruckMileage,
    addMileageRecord,
    getHistoryItems,
    loading,
    error,
  };
};