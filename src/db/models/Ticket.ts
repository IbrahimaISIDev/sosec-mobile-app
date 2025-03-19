// src/models/Ticket.ts
import { Model } from '@nozbe/watermelondb';
import { field, date, readonly } from '@nozbe/watermelondb/decorators';

export class Ticket extends Model {
  static table = 'tickets';

  @field('ticket_num') ticket_num: any;
  @field('date_entree') date_entree: any;
  @field('date_sortie') date_sortie: any;
  @field('camion_id') camion_id: any;
  @field('produit') produit: any;
  @field('poids_net') poids_net: any;
  @field('transporteur') transporteur: any;
  @field('preneur') preneur;
  @field('commande_id') commande_id;
  @field('fournisseur') fournisseur;
  @field('localImageUri') localImageUri;
  @field('imageUrl') imageUrl;
  @field('syncStatus') syncStatus;
  @readonly @date('created_at') createdAt;
  @readonly @date('updated_at') updatedAt;
}