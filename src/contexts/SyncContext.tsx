import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import NetInfo from '@react-native-community/netinfo';

type SyncStatus = 'synced' | 'syncing' | 'offline';

interface SyncContextType {
  syncStatus: SyncStatus;
  lastSyncTime: string | null;
  sync: () => Promise<void>;
}

const SyncContext = createContext<SyncContextType | undefined>(undefined);

export const useSyncContext = () => {
  const context = useContext(SyncContext);
  if (context === undefined) {
    throw new Error('useSyncContext must be used within a SyncProvider');
  }
  return context;
};

interface SyncProviderProps {
  children: ReactNode;
}

export const SyncProvider = ({ children }: SyncProviderProps) => {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('synced');
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(true);

  // Vérifier la connexion réseau
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected ?? false);
      if (!state.isConnected) {
        setSyncStatus('offline');
      } else if (syncStatus === 'offline') {
        setSyncStatus('synced');
      }
    });

    return () => unsubscribe();
  }, [syncStatus]);

  // Fonction de synchronisation
  const sync = async (): Promise<void> => {
    if (!isConnected) {
      setSyncStatus('offline');
      return;
    }

    try {
      setSyncStatus('syncing');
      
      // Ici, on simulerait la synchronisation avec le serveur
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const now = new Date();
      setLastSyncTime(now.toLocaleString());
      setSyncStatus('synced');
    } catch (error) {
      console.error('Erreur de synchronisation:', error);
      setSyncStatus('offline');
    }
  };

  return (
    <SyncContext.Provider value={{ syncStatus, lastSyncTime, sync }}>
      {children}
    </SyncContext.Provider>
  );
};