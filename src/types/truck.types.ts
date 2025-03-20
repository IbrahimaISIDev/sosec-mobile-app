// src/types/truck.types.ts
export interface TruckData {
  id: string;
  model: string;
  licensePlate: string;
  currentKm: number;
  lastServiceKm: number;
  nextServiceKm: number;
  lastServiceDate: string | Date;
  assignedDriver: string;
  status: "active" | "maintenance" | "inactive";
  fuelEfficiency: number;
  type: string;
  lastFueling?: {
    date: string | Date;
    amount: number;
    liters?: number;
  };
  nextOilChange?: number;
  lastMaintenance?: Date;
}

export interface MaintenanceAlert {
  type: "oil" | "service" | "tires" | "other";
  dueDate?: string | Date;
  dueKm?: number;
  message: string;
  severity: "info" | "warning" | "critical";
}
