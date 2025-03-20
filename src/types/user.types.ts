// src/types/user.types.ts
export interface User {
  id: string;
  displayName: string;
  photoURL?: string;
  phoneNumber: string;
  role: 'admin' | 'dispatcher' | 'driver';
  truckAssigned?: string;
  email?: string;
  address?: string;
  language?: string;
  notifications?: boolean;
  licenseDetails?: {
    number: string;
    category: string;
    expiryDate: Date;
  };
}

// export interface Truck {
//   id: string;
//   model: string;
//   licensePlate: string;
//   currentKm?: number;
//   lastServiceKm?: number;
//   nextServiceKm?: number;
//   assignedDriver?: string;
//   status?: 'active' | 'maintenance' | 'inactive';
//   fuelEfficiency?: number;
// }

