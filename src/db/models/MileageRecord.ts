// src/models/Mileage.ts
import { Model } from '@nozbe/watermelondb';
import { field, date, readonly } from '@nozbe/watermelondb/decorators';

export class Mileage extends Model {
  static table ='mileages';

  @field('date') date: any;
  @field('km_initial') km_initial: any;
  @field('km_final') km_final: any;
  @field('km_remarqués') km_remarqués: any;
  @field('truck_id') truck_id: any;
  @field('driver_id') driver_id: any;
  @field('syncStatus') syncStatus: any;
  @readonly @date('created_at') createdAt: any;
  @readonly @date('updated_at') updatedAt: any;
  @field('localImageUri') localImageUri: any;
  @field('imageUrl') imageUrl: any;
  @field('isVerified') isVerified: any;
  @field('isRecorded') isRecorded: any;
  @field('isCalculated') isCalculated: any;
}
