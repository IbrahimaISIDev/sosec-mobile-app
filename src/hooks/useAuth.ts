// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';

interface User {
  id: string;
  displayName: string;
  email: string;
}

interface Truck {
  id: string;
  licensePlate: string;
  model: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [truck, setTruck] = useState<Truck | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement des données d'authentification
    const timeout = setTimeout(() => {
      setUser({
        id: '123',
        displayName: 'Jean Dupont',
        email: 'jean.dupont@example.com'
      });
      
      setTruck({
        id: '456',
        licensePlate: 'AB-123-CD',
        model: 'Volvo FH16'
      });
      
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return {
    user,
    truck,
    loading,
    isAuthenticated: !!user
  };
};

// // src/hooks/useAuth.ts
// import { useState, useEffect } from 'react';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { getFirestore, doc, getDoc } from 'firebase/firestore';

// interface User {
//   uid: string;
//   displayName: string;
//   photoURL?: string;
//   role: string;
//   truckAssigned?: string;
// }

// interface Truck {
//   id: string;
//   model: string;
//   licensePlate: string;
//   currentKm: number;
//   lastServiceKm: number;
//   nextServiceKm: number;
// }

// export const useAuth = () => {
//   const [user, setUser] = useState<User | null>(null);
//   const [truck, setTruck] = useState<Truck | null>(null);
//   const [loading, setLoading] = useState(true);
  
//   useEffect(() => {
//     const auth = getAuth();
//     const db = getFirestore();
    
//     const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
//       if (firebaseUser) {
//         // Get additional user data from Firestore
//         try {
//           const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          
//           if (userDoc.exists()) {
//             const userData = userDoc.data();
//             setUser({
//               uid: firebaseUser.uid,
//               displayName: userData.displayName || firebaseUser.displayName || '',
//               photoURL: userData.photoURL || firebaseUser.photoURL,
//               role: userData.role || 'driver',
//               truckAssigned: userData.truckAssigned
//             });
            
//             // If user has an assigned truck, get truck details
//             if (userData.truckAssigned) {
//               const truckDoc = await getDoc(doc(db, 'trucks', userData.truckAssigned));
              
//               if (truckDoc.exists()) {
//                 const truckData = truckDoc.data();
//                 setTruck({
//                   id: userData.truckAssigned,
//                   model: truckData.model || '',
//                   licensePlate: truckData.licensePlate || '',
//                   currentKm: truckData.currentKm || 0,
//                   lastServiceKm: truckData.lastServiceKm || 0,
//                   nextServiceKm: truckData.nextServiceKm || 0
//                 });
//               }
//             }
//           }
//         } catch (error) {
//           console.error('Error fetching user data:', error);
//         }
//       } else {
//         setUser(null);
//         setTruck(null);
//       }
      
//       setLoading(false);
//     });
    
//     return () => unsubscribe();
//   }, []);
  
//   // For demo purpose, we'll provide a mock user and truck 
//   // when running in development mode without Firebase
//   useEffect(() => {
//     if (process.env.NODE_ENV === 'development' && !user) {
//       // Mock user for development
//       setUser({
//         uid: 'mock-uid',
//         displayName: 'Ibrahima',
//         role: 'driver',
//         truckAssigned: 'truck-1'
//       });
      
//       setTruck({
//         id: 'truck-1',
//         model: 'Mercedes Actros',
//         licensePlate: 'AA 883 TQ',
//         currentKm: 45000,
//         lastServiceKm: 40000,
//         nextServiceKm: 50000
//       });
      
//       setLoading(false);
//     }
//   }, [user]);
  
//   return { user, truck, loading };
// };


// // src/hooks/useAuth.ts
// import { useState, useEffect, useContext } from 'react';
// import { AuthContext } from '../contexts/AuthContext';
// import { User } from '../types/auth.types';
// import { Truck } from '../types/truck.types';
// import { getTruckById } from '../services/truckService';

// export const useAuth = () => {
//   const { currentUser } = useContext(AuthContext);
//   const [user, setUser] = useState<User | null>(null);
//   const [truck, setTruck] = useState<Truck | null>(null);

//   useEffect(() => {
//     if (currentUser) {
//       setUser(currentUser);
      
//       // Fetch assigned truck
//       const loadTruck = async () => {
//         if (currentUser.truckAssigned) {
//           const truckData = await getTruckById(currentUser.truckAssigned);
//           setTruck(truckData);
//         }
//       };
      
//       loadTruck();
//     }
//   }, [currentUser]);

//   return { user, truck };
// };