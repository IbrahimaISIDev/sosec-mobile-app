// src/hooks/useSync.ts

import { useState, useEffect, useContext } from 'react';
import { SyncContext } from '../contexts/SyncContext';
import { OfflineContext } from '../contexts/OfflineContext';

export const useSync = () => {
  const { syncStatus, syncQueue } = useContext(SyncContext);
  const { isOnline } = useContext(OfflineContext);
  
  const synchronize = async () => {
    // Implémentation de synchronisation
    if (isOnline && syncQueue.length > 0) {
      // Synchroniser les données
    }
  };
  
  return { 
    syncStatus, 
    pendingItems: syncQueue.length,
    synchronize 
  };
};