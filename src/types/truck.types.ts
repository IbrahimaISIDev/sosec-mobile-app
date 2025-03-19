// src/types/truck.types.ts
export interface Truck {
    id: string;
    model: string;
    licensePlate: string;
    currentKm: number;
    lastServiceKm: number;
    nextServiceKm: number;
    assignedDriver?: string;
    status: 'active' | 'maintenance' | 'inactive';
    fuelEfficiency: number;
  }