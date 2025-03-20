// src/types/history.types.ts
export type HistoryCategory = 'ticket' | 'expense' | 'mileage';

export type HistoryItemType =
  | 'prelevement'
  | 'decharge'
  | 'tableau_bord'
  | 'maintenance'
  | 'carburant'
  | 'peage'
  | 'oil' 
  | 'repair' 
  | 'others'; 

export interface HistoryItem {
  id: string;
  category: HistoryCategory;
  type: HistoryItemType;
  date: Date;
  amount?: number;
  mileage?: number;
  truckId?: string;
  driverId?: string;
  label?: string;
  imageUrl?: string;
  syncStatus: 'local' | 'synced';
  verificationStatus?: 'pending' | 'verified' | 'rejected';
}

export interface HistoryFilter {
  startDate: Date | null;
  endDate: Date | null;
  types: HistoryItemType[];
  minAmount: number | null;
  maxAmount: number | null;
}