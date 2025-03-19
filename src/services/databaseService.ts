// src/services/databaseService.ts
import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { tables } from '../models/schema';
import { Ticket, Expense, Mileage, User, Truck } from '../models';

let database: Database | null = null;

export const getLocalDatabase = async () => {
  if (database) return database;

  // Définir l'adaptateur SQLite
  const adapter = new SQLiteAdapter({
    schema: tables,
    dbName: 'sosec_mobile.db',
    // Ajouter des options si nécessaire
  });

  // Créer la base de données
  database = new Database({
    adapter,
    modelClasses: [Ticket, Expense, Mileage, User, Truck],
  });

  return database;
};

// Fonctions pour manipuler les tickets
export const saveTicket = async (ticketData, imageUri) => {
  const db = await getLocalDatabase();
  const tickets = db.get('tickets');
  
  const newTicket = await db.action(async () => {
    return await tickets.create(ticket => {
      Object.assign(ticket, {
        ...ticketData,
        imageLocalUri: imageUri,
        syncStatus: 'local',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    });
  });
  
  return newTicket;
};

export const getTickets = async () => {
  const db = await getLocalDatabase();
  const tickets = await db.get('tickets').query().fetch();
  return tickets;
};

// Fonctions pour manipuler les dépenses
export const saveExpense = async (expenseData) => {
  const db = await getLocalDatabase();
  const expenses = db.get('expenses');
  
  const newExpense = await db.action(async () => {
    return await expenses.create(expense => {
      Object.assign(expense, {
       ...expenseData,
        syncStatus: 'local',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    });
  });
  
  return newExpense;
};

export const getExpenses = async () => {
  const db = await getLocalDatabase();
  const expenses = await db.get('expenses').query().fetch();
  return expenses;
}

// Ajouter des fonctions similaires pour les autres types de données