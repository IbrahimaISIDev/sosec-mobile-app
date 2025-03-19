// src/services/syncService.ts
import { db, storage } from '../api/firebase';
import { collection, addDoc, updateDoc, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateLocalDatabase, getLocalData } from './localDbService';
import NetInfo from '@react-native-community/netinfo';

// Vérifier la connexion
export const checkConnection = async () => {
  const state = await NetInfo.fetch();
  return state.isConnected && state.isInternetReachable;
};

// Synchroniser les tickets
export const syncTickets = async () => {
  try {
    // Vérifier la connexion
    const isConnected = await checkConnection();
    if (!isConnected) {
      console.log('Pas de connexion internet disponible. Synchronisation reportée.');
      return { success: false, message: 'Pas de connexion internet' };
    }

    // Récupérer les tickets non synchronisés
    const unsyncedTickets = await getLocalData('tickets', { syncStatus: 'local' });

    for (const ticket of unsyncedTickets) {
      // Uploader l'image si disponible
      let imageUrl = null;
      if (ticket.localImageUri) {
        imageUrl = await uploadImage(ticket.localImageUri, `tickets/${ticket.id}.jpg`);
      }

      // Créer ou mettre à jour le document dans Firestore
      const ticketData = {
        ...ticket.toJSON(),
        imageUrl,
        syncStatus: 'synced',
        updatedAt: new Date()
      };

      // Supprimer les propriétés spécifiques à la base locale
      delete ticketData.localImageUri;

      await addDoc(collection(db, 'tickets'), ticketData);

      // Mettre à jour le statut du ticket dans la base locale
      await updateLocalDatabase('tickets', ticket.id, { syncStatus: 'synced', imageUrl });
    }

    return { success: true, message: `${unsyncedTickets.length} tickets synchronisés` };
  } catch (error) {
    console.error('Erreur de synchronisation:', error);
    return { success: false, message: 'Erreur de synchronisation', error };
  }
};

// Uploader une image
export const uploadImage = async (localUri: string, storagePath: string): Promise<string> => {
  try {
    const response = await fetch(localUri);
    const blob = await response.blob();
    
    const storageRef = ref(storage, storagePath);
    await uploadBytes(storageRef, blob);
    
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  } catch (error) {
    console.error('Erreur lors de l\'upload de l\'image:', error);
    throw error;
  }
};

// Synchroniser les données depuis Firebase vers la base locale
export const syncFromFirebase = async () => {
  try {
    // Vérifier la connexion
    const isConnected = await checkConnection();
    if (!isConnected) {
      return { success: false, message: 'Pas de connexion internet' };
    }

    // Récupérer les tickets modifiés récemment
    const lastSync = await getLastSyncTimestamp();
    const ticketsRef = collection(db, 'tickets');
    const q = query(ticketsRef, where('updatedAt', '>', lastSync));
    const querySnapshot = await getDocs(q);
    
    const updatedTickets = [];
    querySnapshot.forEach((doc) => {
      updatedTickets.push({ id: doc.id, ...doc.data() });
    });

    // Mettre à jour la base locale
    for (const ticket of updatedTickets) {
      await updateLocalDatabase('tickets', ticket.id, ticket);
    }

    // Mettre à jour le timestamp de la dernière synchronisation
    await updateLastSyncTimestamp();

    return { success: true, message: `${updatedTickets.length} tickets mis à jour` };
  } catch (error) {
    console.error('Erreur de synchronisation depuis Firebase:', error);
    return { success: false, message: 'Erreur de synchronisation', error };
  }
};

// Obtenir le timestamp de la dernière synchronisation
const getLastSyncTimestamp = async () => {
  try {
    const docRef = doc(db, 'metadata', 'lastSync');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data().timestamp;
    }
    
    // Si le document n'existe pas, retourner une date ancienne
    return new Date(0);
  } catch (error) {
    console.error('Erreur lors de la récupération du timestamp:', error);
    return new Date(0);
  }
};

// Mettre à jour le timestamp de la dernière synchronisation
const updateLastSyncTimestamp = async () => {
  try {
    const docRef = doc(db, 'metadata', 'lastSync');
    await updateDoc(docRef, {
      timestamp: new Date(),
      device: Device.deviceName
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du timestamp:', error);
  }
};

export const syncMileage = async () =>  {
  // Récupérer les kilométrages non synchronisés
  const unsyncedMileages = await getLocalData('mileages', { syncStatus: 'local' });

  for (const mileage of unsyncedMileages) {
    // Créer ou mettre à jour le document dans Firestore
    const mileageData = {
     ...mileage.toJSON(),
      syncStatus:'synced',
      updatedAt: new Date()
    };

    await addDoc(collection(db,'mileages'), mileageData);

    // Mettre à jour le statut du kilométrie dans la base locale
    await updateLocalDatabase('mileages', mileage.id, { syncStatus:'synced' });
  }

  return { success: true, message: `${unsyncedMileages.length} kilométrages synchronisés` };
}

export const syncExpenses = async () => {
  // Récupérer les dépenses non synchronisées
  const unsyncedExpenses = await getLocalData('expenses', { syncStatus: 'local' });

  for (const expense of unsyncedExpenses) {
    // Créer ou mettre à jour le document dans Firestore
    const expenseData = {
     ...expense.toJSON(),
      syncStatus:'synced',
      updatedAt: new Date()
    };

    await addDoc(collection(db, 'expenses'), expenseData);

    // Mettre à jour le statut de la dépense dans la base locale
    await updateLocalDatabase('expenses', expense.id, { syncStatus:'synced' });
  }

  return { success: true, message: `${unsyncedExpenses.length} dépenses synchronisées` };
}

// Synchroniser les données
const results = await Promise.allSettled([
  syncTickets(),
  syncMileage(),
  syncExpenses()
]);

// Gérer les résultats et erreurs de manière individuelle
results.forEach(result => {
  if (result.status === 'rejected') {
    console.error('Erreur de synchronisation:', result.reason);
  } else {
    console.log('Succès de la synchronisation:', result.value);
  }
});
