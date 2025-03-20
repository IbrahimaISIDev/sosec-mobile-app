// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

interface User {
  id: string;
  email: string;
  displayName: string;
  role: string;
  truckAssigned?: string;
  photoURL?: string;
  phoneNumber?: string;
}

interface Truck {
  id: string;
  model: string;
  licensePlate: string;
  currentKm: number;
  lastServiceKm: number;
  nextServiceKm: number;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [truck, setTruck] = useState<Truck | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = auth().onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await firestore().collection('users').doc(firebaseUser.uid).get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            const newUser: User = {
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              displayName: userData?.displayName || firebaseUser.displayName || '',
              role: userData?.role || 'driver',
              truckAssigned: userData?.truckAssigned,
              photoURL: userData?.photoURL || firebaseUser.photoURL,
              phoneNumber: userData?.phoneNumber || firebaseUser.phoneNumber || '',
            };
            setUser(newUser);

            // Charger les données du camion si assigné
            if (newUser.truckAssigned) {
              const truckDoc = await firestore().collection('trucks').doc(newUser.truckAssigned).get();
              if (truckDoc.exists) {
                const truckData = truckDoc.data();
                setTruck({
                  id: newUser.truckAssigned,
                  model: truckData?.model || '',
                  licensePlate: truckData?.licensePlate || '',
                  currentKm: truckData?.currentKm || 0,
                  lastServiceKm: truckData?.lastServiceKm || 0,
                  nextServiceKm: truckData?.nextServiceKm || 0,
                });
              }
            }
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des données:', error);
        }
      } else {
        setUser(null);
        setTruck(null);
      }
      setLoading(false);
    });

    return () => unsubscribeAuth();
  }, []);

  // Mode développement avec données simulées
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && !user && !auth().currentUser) {
      setUser({
        id: 'mock-uid',
        email: 'ibrahima@example.com',
        displayName: 'Ibrahima',
        role: 'driver',
        truckAssigned: 'truck-1',
      });
      setTruck({
        id: 'truck-1',
        model: 'Mercedes Actros',
        licensePlate: 'AA 883 TQ',
        currentKm: 45000,
        lastServiceKm: 40000,
        nextServiceKm: 50000,
      });
      setLoading(false);
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      return true;
    } catch (error) {
      console.error('Erreur de connexion:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await auth().signOut();
      setTruck(null); // Réinitialiser le camion lors de la déconnexion
      return true;
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
      throw error;
    }
  };

  return {
    user,
    truck,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
  };
};