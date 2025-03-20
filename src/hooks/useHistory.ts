// src/hooks/useHistory.ts
import { useState, useEffect } from 'react';
import { useFirestore } from './useFirestore';
import { HistoryItem, HistoryFilter } from '../types/history.types';
import { getLocalDatabase } from '../db/database';

export const useHistory = (userId: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<HistoryItem[]>([]);
  const { getFirestore } = useFirestore();

  const fetchHistoryItems = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Récupération des données de Firestore lorsque connecté
      const db = getFirestore();
      const combinedItems: HistoryItem[] = [];
      
      // Récupérer les tickets
      const ticketsSnapshot = await db.collection('tickets')
        .where('driverId', '==', userId)
        .orderBy('ticketDate', 'desc')
        .get();
        
      ticketsSnapshot.docs.forEach(doc => {
        const ticketData = doc.data();
        combinedItems.push({
          id: doc.id,
          category: 'ticket',
          type: ticketData.type,
          date: ticketData.ticketDate.toDate(),
          amount: ticketData.extractedData?.amount,
          truckId: ticketData.truckId,
          driverId: ticketData.driverId,
          imageUrl: ticketData.imageUrl,
          syncStatus: 'synced',
          verificationStatus: ticketData.verificationStatus
        });
      });
      
      // Récupérer les dépenses
      const expensesSnapshot = await db.collection('expenses')
        .where('driverId', '==', userId)
        .orderBy('date', 'desc')
        .get();
        
      expensesSnapshot.docs.forEach(doc => {
        const expenseData = doc.data();
        combinedItems.push({
          id: doc.id,
          category: 'expense',
          type: expenseData.type,
          date: expenseData.date.toDate(),
          amount: expenseData.amount,
          truckId: expenseData.truckId,
          driverId: expenseData.driverId,
          imageUrl: expenseData.receiptImageUrl,
          syncStatus: 'synced'
        });
      });
      
      // Récupérer les données de kilométrage
      const mileageSnapshot = await db.collection('mileage')
        .where('driverId', '==', userId)
        .orderBy('date', 'desc')
        .get();
        
      mileageSnapshot.docs.forEach(doc => {
        const mileageData = doc.data();
        combinedItems.push({
          id: doc.id,
          category: 'mileage',
          type: 'tableau_bord',
          date: mileageData.date.toDate(),
          mileage: mileageData.kilometer,
          truckId: mileageData.truckId,
          driverId: mileageData.driverId,
          imageUrl: mileageData.imageUrl,
          syncStatus: 'synced',
          verificationStatus: mileageData.isVerified ? 'verified' : 'pending'
        });
      });
      
      // Essayer de récupérer également les données locales non synchronisées
      const localDb = await getLocalDatabase();
      // Logic pour récupérer les données SQLite...
      
      // Trier tous les éléments par date (du plus récent au plus ancien)
      combinedItems.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });
      
      setItems(combinedItems);
    } catch (err) {
      console.error('Error fetching history items:', err);
      setError('Impossible de récupérer l\'historique. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const filterItems = (items: HistoryItem[], filters: HistoryFilter): HistoryItem[] => {
    return items.filter(item => {
      const itemDate = new Date(item.date);
      
      // Filtre par date
      if (filters.startDate && itemDate < filters.startDate) return false;
      if (filters.endDate && itemDate > filters.endDate) return false;
      
      // Filtre par type
      if (filters.types.length > 0 && !filters.types.includes(item.type)) return false;
      
      // Filtre par montant
      if (filters.minAmount !== null) {
        if (item.amount === undefined || item.amount < filters.minAmount) return false;
      }
      
      if (filters.maxAmount !== null) {
        if (item.amount === undefined || item.amount > filters.maxAmount) return false;
      }
      
      return true;
    });
  };

  return {
    loading,
    error,
    items,
    fetchHistoryItems,
    filterItems
  };
};