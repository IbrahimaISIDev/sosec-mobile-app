// src/models/schema.ts
import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'tickets',
      columns: [
        { name: 'ticket_num', type: 'string' },
        { name: 'date_entree', type: 'string' },
        { name: 'date_sortie', type: 'string' },
        { name: 'camion_id', type: 'string' },
        { name: 'produit', type: 'string' },
        { name: 'poids_net', type: 'number' },
        { name: 'transporteur', type: 'string' },
        { name: 'preneur', type: 'string' },
        { name: 'commande_id', type: 'string', isOptional: true },
        { name: 'fournisseur', type: 'string', isOptional: true },
        { name: 'localImageUri', type: 'string', isOptional: true },
        { name: 'imageUrl', type: 'string', isOptional: true },
        { name: 'syncStatus', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ]
    }),
    tableSchema({
      name: 'expenses',
      columns: [
        { name: 'type', type: 'string' },
        { name: 'amount', type: 'number' },
        { name: 'date', type: 'string' },
        { name: 'truck_id', type: 'string' },
        { name: 'driver_id', type: 'string' },
        { name: 'location', type: 'string', isOptional: true },
        { name: 'designation', type: 'string', isOptional: true },
        { name: 'quantite', type: 'number', isOptional: true },
        { name: 'location', type: 'string', isOptional: true },
        { name: 'notes', type: 'string', isOptional: true },
        { name: 'localImageUri', type: 'string', isOptional: true },
        { name: 'imageUrl', type: 'string', isOptional: true },
        { name: 'syncStatus', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },

      ]
    }),
    tableSchema({
      name: 'mileage',
      columns: [
        { name: 'truck_id', type: 'string' },
        { name: 'driver_id', type: 'string' },
        { name: 'date', type: 'string' },
        { name: 'kilometer', type: 'number' },
        { name: 'localImageUri', type: 'string', isOptional: true },
        { name: 'imageUrl', type: 'string', isOptional: true },
        { name: 'isVerified', type: 'boolean' },
        { name: 'syncStatus', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ]
    }),
    tableSchema({
      name: 'fuel_tickets',
      columns: [
        { name: 'date', type: 'string' },
        { name: 'chauffeur', type: 'string' },
        { name: 'telephone', type: 'string' },
        { name: 'camion_id', type: 'string' },
        { name: 'designation', type: 'string' },
        { name: 'quantite', type: 'number' },
        { name: 'montant', type: 'number' },
        { name: 'imageUrl', type: 'string', isOptional: true },
        { name: 'imageLocalUri', type: 'string', isOptional: true },
        { name: 'syncStatus', type: 'string' },
        { name: 'createdAt', type: 'number' },
        { name: 'updatedAt', type: 'number' }
      ]
    }),
    tableSchema(
      {
        name: 'drivers',
        columns: [
          { name: 'driver_id', type:'string' },
          { name: 'nom', type:'string' },
          { name: 'prenom', type:'string' },
          { name: 'telephone', type:'string' },
          { name: 'adresse', type:'string', isOptional: true },
          { name: 'email', type:'string', isOptional: true },
          { name: 'image_url', type:'string', isOptional: true },
          { name: 'image_local_uri', type:'string', isOptional: true },
          { name: 'syncStatus', type:'string' },
          { name: 'createdAt', type: 'number' },
          { name: 'updatedAt', type: 'number' }
        ]
      }),
      tableSchema(
        {
          name: 'trucks',
          columns: [
            { name: 'camion_id', type:'string' },
            { name: 'immatriculation', type:'string' },
            { name: 'type', type:'string' },
            { name: 'couleur', type:'string' },
            { name: 'annee_construction', type: 'number' },
            { name: 'kilometrage', type: 'number' },
            { name: 'image_url', type:'string', isOptional: true },
            { name: 'image_local_uri', type:'string', isOptional: true },
            { name:'syncStatus', type:'string' },
            { name: 'createdAt', type: 'number' },
            { name: 'updatedAt', type: 'number' }
          ]
        }
      ),
      tableSchema({
        name: 'others',
        columns: [
          { name: 'type', type:'string' },
          { name: 'valeur', type:'string' },
          { name: 'date', type:'string' },
          { name: 'truck_id', type:'string' },
          { name: 'driver_id', type:'string' },
          { name: 'notes', type:'string', isOptional: true },
          { name: 'syncStatus', type:'string' },
          { name: 'createdAt', type: 'number' },
          { name: 'updatedAt', type: 'number' }
        ]
      }),
      tableSchema(
        {
          name: 'repairs',
          columns: [
            { name: 'id', type:'string' },
            { name: 'type', type:'string' },
            { name: 'date', type:'string' },
            { name: 'truck_id', type:'string' },
            { name: 'driver_id', type:'string' },
            { name: 'notes', type:'string', isOptional: true },
            { name: 'syncStatus', type:'string' },
            { name: 'createdAt', type: 'number' },
            { name: 'updatedAt', type: 'number' }
          ]
        }),
        tableSchema({
          name: 'notifications',
          columns: [
            { name: 'id', type:'string' },
            { name: 'title', type:'string' },
            { name: 'body', type:'string' },
            { name: 'type', type:'string' },
            { name: 'is_read', type: 'boolean' },
            { name: 'driver_id', type:'string' },
            { name: 'truck_id', type:'string' },
            { name: 'createdAt', type: 'number' },
            { name: 'updatedAt', type: 'number' }
          ]
        }), 
        tableSchema({
          name: 'users',
          columns: [
            { name: 'id', type:'string' },
            { name: 'email', type:'string' },
            { name: 'password', type:'string' },
            { name: 'role', type:'string' },
            { name: 'createdAt', type: 'number' },
            { name: 'updatedAt', type: 'number' }
          ]
        })
      ],
});
