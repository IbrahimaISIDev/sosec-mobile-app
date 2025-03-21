// src/models/decorators.ts
import { field } from '@nozbe/watermelondb/decorators';

export const requiredField = (fieldName: string) => field(fieldName);

// src/models/Expense.ts
import { Model } from '@nozbe/watermelondb';
import { date, readonly } from '@nozbe/watermelondb/decorators';
import { requiredField } from './decorators';

interface ExpenseFields {
  type: string;
  amount: number;
  date: Date;
  truckId: string;
  driverId: string;
  designation: string;
  quantite: number;
  location: string;
  notes?: string;
  localImageUri?: string;
  imageUrl?: string;
  syncStatus: 'local' | 'synced';
  createdAt: Date;
  updatedAt: Date;
}

export class Expense extends Model {
  static table = 'expenses';

  @requiredField('type') type!: ExpenseFields['type'];
  @requiredField('amount') amount!: ExpenseFields['amount'];
  @date('date') date!: ExpenseFields['date'];
  @requiredField('truck_id') truckId!: ExpenseFields['truckId'];
  @requiredField('driver_id') driverId!: ExpenseFields['driverId'];
  @requiredField('designation') designation!: ExpenseFields['designation'];
  @requiredField('quantite') quantite!: ExpenseFields['quantite'];
  @requiredField('location') location!: ExpenseFields['location'];
  @requiredField('notes') notes!: ExpenseFields['notes'];
  @requiredField('local_image_uri') localImageUri!: ExpenseFields['localImageUri'];
  @requiredField('image_url') imageUrl!: ExpenseFields['imageUrl'];
  @requiredField('sync_status') syncStatus!: ExpenseFields['syncStatus'];
  @readonly @date('created_at') createdAt!: ExpenseFields['createdAt'];
  @readonly @date('updated_at') updatedAt!: ExpenseFields['updatedAt'];
}

export type ExpenseModel = Expense & ExpenseFields;