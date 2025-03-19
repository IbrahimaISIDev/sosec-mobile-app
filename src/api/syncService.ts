// Importations correctes pour expo-sqlite
import * as SQLite from 'expo-sqlite';
import { getFirestore, collection, doc, writeBatch, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firestore, storage } from './firebase';
import { storageService } from '../services/storageService';

// Initialisation de la base de données SQLite avec openDatabase (asynchrone)
const db: SQLite.SQLiteDatabase = SQLite.openDatabase('sosec_mobile.db');

class SyncService {
  async getPendingItemsCount(): Promise<number> {
    return new Promise((resolve, reject) => {
      db.transaction((tx: SQLite.SQLTransaction) => {
        tx.executeSql(
          `SELECT COUNT(*) as count FROM tickets WHERE syncStatus = 'local'
           UNION ALL
           SELECT COUNT(*) as count FROM expenses WHERE syncStatus = 'local'
           UNION ALL
           SELECT COUNT(*) as count FROM mileage WHERE syncStatus = 'local'`,
          [],
          (transaction: SQLite.SQLTransaction, resultSet: SQLite.SQLResultSet) => {
            let totalCount = 0;
            for (let i = 0; i < resultSet.rows.length; i++) {
              totalCount += resultSet.rows.item(i).count;
            }
            resolve(totalCount);
          },
          (transaction: SQLite.SQLTransaction, error: Error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }

  async synchronizeAll(): Promise<void> {
    await this.synchronizeTickets();
    await this.synchronizeExpenses();
    await this.synchronizeMileage();
  }

  private async synchronizeTickets(): Promise<void> {
    return new Promise((resolve, reject) => {
      db.transaction((tx: SQLite.SQLTransaction) => {
        tx.executeSql(
          `SELECT * FROM tickets WHERE syncStatus = 'local'`,
          [],
          async (transaction: SQLite.SQLTransaction, result: SQLite.SQLResultSet) => {
            try {
              const tickets = result.rows._array;
              const batch = writeBatch(firestore);
              
              for (const ticket of tickets) {
                let imageUrl = ticket.imageUrl;
                if (imageUrl && imageUrl.startsWith('file://')) {
                  imageUrl = await this.uploadImage(imageUrl, `tickets/${ticket.id}`);
                }

                const ticketRef = doc(collection(firestore, 'tickets'), ticket.id);
                batch.set(ticketRef, {
                  ...ticket,
                  imageUrl,
                  syncStatus: 'synced',
                  lastUpdated: serverTimestamp(),
                });

                tx.executeSql(
                  `UPDATE tickets SET syncStatus = 'synced', imageUrl = ? WHERE id = ?`,
                  [imageUrl, ticket.id],
                  (transaction: SQLite.SQLTransaction, resultSet: SQLite.SQLResultSet) => {
                    // Callback de succès (optionnel, si vous voulez manipuler les résultats)
                  },
                  (transaction: SQLite.SQLTransaction, error: Error) => {
                    // Callback d'erreur (optionnel)
                    return false;
                  }
                );
              }

              await batch.commit();
              resolve();
            } catch (error) {
              console.error('Error synchronizing tickets:', error);
              reject(error);
            }
          },
          (transaction: SQLite.SQLTransaction, error: Error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }

  private async synchronizeExpenses(): Promise<void> {
    return new Promise((resolve, reject) => {
      db.transaction((tx: SQLite.SQLTransaction) => {
        tx.executeSql(
          `SELECT * FROM expenses WHERE syncStatus = 'local'`,
          [],
          async (transaction: SQLite.SQLTransaction, result: SQLite.SQLResultSet) => {
            try {
              const expenses = result.rows._array;
              const batch = writeBatch(firestore);
              
              for (const expense of expenses) {
                let receiptImageUrl = expense.receiptImageUrl;
                if (receiptImageUrl && receiptImageUrl.startsWith('file://')) {
                  receiptImageUrl = await this.uploadImage(receiptImageUrl, `expenses/${expense.id}`);
                }

                const expenseRef = doc(collection(firestore, 'expenses'), expense.id);
                batch.set(expenseRef, {
                  ...expense,
                  receiptImageUrl,
                  syncStatus: 'synced',
                  lastUpdated: serverTimestamp(),
                });

                tx.executeSql(
                  `UPDATE expenses SET syncStatus = 'synced', receiptImageUrl = ? WHERE id = ?`,
                  [receiptImageUrl, expense.id],
                  (transaction: SQLite.SQLTransaction, resultSet: SQLite.SQLResultSet) => {
                    // Callback de succès (optionnel)
                  },
                  (transaction: SQLite.SQLTransaction, error: Error) => {
                    // Callback d'erreur (optionnel)
                    return false;
                  }
                );
              }

              await batch.commit();
              resolve();
            } catch (error) {
              console.error('Error synchronizing expenses:', error);
              reject(error);
            }
          },
          (transaction: SQLite.SQLTransaction, error: Error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }

  private async synchronizeMileage(): Promise<void> {
    return new Promise((resolve, reject) => {
      db.transaction((tx: SQLite.SQLTransaction) => {
        tx.executeSql(
          `SELECT * FROM mileage WHERE syncStatus = 'local'`,
          [],
          async (transaction: SQLite.SQLTransaction, result: SQLite.SQLResultSet) => {
            try {
              const mileageRecords = result.rows._array;
              const batch = writeBatch(firestore);
              
              for (const record of mileageRecords) {
                let imageUrl = record.imageUrl;
                if (imageUrl && imageUrl.startsWith('file://')) {
                  imageUrl = await this.uploadImage(imageUrl, `mileage/${record.id}`);
                }

                const mileageRef = doc(collection(firestore, 'mileage'), record.id);
                batch.set(mileageRef, {
                  ...record,
                  imageUrl,
                  syncStatus: 'synced',
                  lastUpdated: serverTimestamp(),
                });

                tx.executeSql(
                  `UPDATE mileage SET syncStatus = 'synced', imageUrl = ? WHERE id = ?`,
                  [imageUrl, record.id],
                  (transaction: SQLite.SQLTransaction, resultSet: SQLite.SQLResultSet) => {
                    // Callback de succès (optionnel)
                  },
                  (transaction: SQLite.SQLTransaction, error: Error) => {
                    // Callback d'erreur (optionnel)
                    return false;
                  }
                );
              }

              await batch.commit();
              resolve();
            } catch (error) {
              console.error('Error synchronizing mileage records:', error);
              reject(error);
            }
          },
          (transaction: SQLite.SQLTransaction, error: Error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }

  private async uploadImage(localUri: string, storagePath: string): Promise<string> {
    try {
      // Compression de l'image
      const compressedUri = await storageService.compressImage(localUri);
      
      // Téléchargement vers Firebase Storage
      const response = await fetch(compressedUri);
      const blob = await response.blob();
      const storageRef = ref(storage, storagePath);
      await uploadBytes(storageRef, blob);
      
      // Récupération de l'URL de téléchargement
      const downloadUrl = await getDownloadURL(storageRef);
      return downloadUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }
}

export const syncService = new SyncService();
