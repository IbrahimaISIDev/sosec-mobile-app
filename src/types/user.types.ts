// src/types/user.types.ts
export interface User {
    id: string;
    displayName: string;
    photoURL: string;
    phoneNumber: string;
    role: 'admin' | 'dispatcher' | 'driver';
    truckAssigned?: string;
    licenseDetails: {
      number: string;
      category: string;
      expiryDate: Date;
    };
  }