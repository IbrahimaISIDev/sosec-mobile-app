// src/types/mileage.types.ts
export interface MileageRecord {
    id: string;
    truckId: string;
    driverId: string;
    date: Date;
    kilometer: number;
    imageUrl: string;
    isVerified: boolean;
    syncStatus: 'local' | 'synced';
  }