// src/types/expense.types.ts
  export enum ExpenseType {
    FUEL = 'FUEL',
    OIL = 'OIL',
    REPAIRS = 'REPAIRS',
    OTHER = 'OTHER'
  }
  
  export enum InputType {
    MANUAL = 'MANUAL',
    SCAN = 'SCAN'
  }
  
  export interface ExpenseData {
    id: string;
    type: ExpenseType;
    date: Date;
    amount: number;
    quantity?: number; // en litres pour carburant/huile
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
  export interface ExpenseFormData {
    type: ExpenseType;
    date: Date;
    amount: number;
    quantity?: number;
    notes?: string;
  }