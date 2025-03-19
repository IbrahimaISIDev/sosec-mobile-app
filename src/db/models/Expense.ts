// src/models/Expense.ts
import { Model } from '@nozbe/watermelondb';
import { field, date, readonly } from '@nozbe/watermelondb/decorators';

export class Expense extends Model {
  static table = 'expenses';

  @field('type') type;
  @field('amount') amount;
  @field('date') date;
  @field('truck_id') truck_id;
  @field('driver_id') driver_id;
  @field('designation') designation;
  @field('quantite') quantite;
  @field('location') location;
  @field('notes') notes;
  @field('localImageUri') localImageUri;
  @field('imageUrl') imageUrl;
  @field('syncStatus') syncStatus;
  @readonly @date('created_at') createdAt;
  @readonly @date('updated_at') updatedAt;