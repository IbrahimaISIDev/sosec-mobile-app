// types/sqlite.d.ts
declare module 'expo-sqlite' {
    export interface SQLTransaction {
      executeSql: (
        sql: string,
        params: any[],
        successCallback: (transaction: SQLTransaction, resultSet: SQLResultSet) => void,
        errorCallback: (transaction: SQLTransaction, error: Error) => boolean
      ) => void;
    }
  
    export interface SQLResultSet {
      rows: {
        length: number;
        item: (index: number) => any;
        _array: any[];
      };
    }
  
    export interface SQLiteDatabase {
      transaction: (callback: (tx: SQLTransaction) => void) => void;
    }
  
    // Mise à jour pour exposer openDatabase
    export interface SQLite {
      openDatabase: (name: string) => SQLiteDatabase;
    }
  }
  
  