import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

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

interface AuthContextType {
  user: User | null;
  truck: Truck | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [truck, setTruck] = useState<Truck | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Simuler un chargement initial pour vérifier si l'utilisateur est déjà connecté
  useEffect(() => {
    // Pour l'exemple, on simule un utilisateur connecté
    const mockUser: User = {
      id: 'user123',
      displayName: 'Ibrahima Diallo',
      email: 'ibrahima.diallo@gmail.com',
    };
    
    const mockTruck: Truck = {
      id: 'truck456',
      licensePlate: 'AB-123-CD',
      model: 'Renault T'
    };
    
    setUser(mockUser);
    setTruck(mockTruck);
    setIsLoggedIn(true);
  }, []);

  const login = async (email: string, password: string) => {
    // Simuler une connexion
    try {
      // Dans une vraie implémentation, on ferait une requête API ici
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: 'user123',
        displayName: 'Ibrahima Diallo',
        email: email
      };
      
      const mockTruck: Truck = {
        id: 'truck456',
        licensePlate: 'AB-123-CD',
        model: 'Renault T'
      };
      
      setUser(mockUser);
      setTruck(mockTruck);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Erreur de connexion:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setTruck(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, truck, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};