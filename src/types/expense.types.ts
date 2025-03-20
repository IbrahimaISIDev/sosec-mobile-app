// src/types/expense.types.ts
export interface ExpenseData {
    id: string;
    type: 'fuel' | 'oil' | 'repair' | ' ohters' ;
    amount: number;
    date: Date;
    truckId: string;
    driverId: string;
    liters?: number;
    location?: {
      latitude: number;
      longitude: number;
    };
    notes?: string;
    receiptImageUrl?: string;
    syncStatus: 'local' | 'synced';
  }