// src/services/localDbService.ts
import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { schema } from '../models/schema';
import { Ticket } from '../models/Ticket';
import { Expense } from '../models/Expense';
import { Mileage } from '../models/Mileage';

// Créer l'adaptateur SQLite
const adapter = new SQLiteAdapter({
  schema,
  // Chemin du fichier de base de données
  dbName: 'sosecMobile',
  // Options additionnelles (migrations, etc.)
});

// Initialiser la base de données
export const database = new Database({
  adapter,
  modelClasses: [Ticket, Expense, Mileage],
});

// Insérer des données dans la base locale
export const insertLocalData = async (tableName: string, data: any) => {
  try {
    await database.write(async () => {
      const collection = database.get(tableName);
      await collection.create(record => {
        Object.keys(data).forEach(key => {
          record[key] = data[key];
        });
      });
    });
    return { success: true };
  } catch (error) {
    console.error(`Erreur d'insertion dans ${tableName}:`, error);
    return { success: false, error };
  }
};

// Mettre à jour des données dans la base locale
export const updateLocalDatabase = async (tableName: string, id: string, data: any) => {
  try {
    await database.write(async () => {
      const collection = database.get(tableName);
      const record = await collection.find(id);
      await record.update(rec => {
        Object.keys(data).forEach(key => {
          rec[key] = data[key];
        });
      });
    });
    return { success: true };
  } catch (error) {
    console.error(`Erreur de mise à jour dans ${tableName}:`, error);
    return { success: false, error };
  }
};

// Récupérer des données depuis la base locale
export const getLocalData = async (tableName: string, filter = {}) => {
  try {
    const collection = database.get(tableName);
    let query = collection.query();
    
    // Appliquer les filtres si présents
    Object.keys(filter).forEach(key => {
      query = query.where(key, filter[key]);
    });
    
    const records = await query.fetch();
    return records.map(record => record._raw);
  } catch (error) {
    console.error(`Erreur de récupération depuis ${tableName}:`, error);
    return [];
  }
};

// Supprimer des données de la base locale
export const deleteLocalData = async (tableName: string, id: string) => {
  try {
    await database.write(async () => {
      const collection = database.get(tableName);
      await collection.find(id).delete();
    });
    return { success: true };
  } catch (error) {
    console.error(`Erreur de suppression dans ${tableName}:`, error);
    return { success: false, error };
  }
};