// src/types/mileage.types.ts
export interface MileageRecord {
  id: string;
  truckId: string;
  driverId: string;
  kilometer: number;
  date: Date;
  imageUrl: string;
  licensePlate: string;
  isVerified: boolean;
  syncStatus: "local" | "synced";
}

export type MileageData = MileageRecord & { localImageUri?: string };
