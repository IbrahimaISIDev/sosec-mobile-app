// src/types/expense.types.ts
export interface Expense {
    id: string;
    type: 'fuel' | 'oil' | 'repair' | ' ohters' ;
    amount: number;
    date: Date;
    truckId: string;
    driverId: string;
    location?: {
      latitude: number;
      longitude: number;
    };
    notes?: string;
    receiptImageUrl?: string;
    syncStatus: 'local' | 'synced';
  }