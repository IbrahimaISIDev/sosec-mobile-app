// src/App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { SyncProvider } from './src/contexts/SyncContext';
import { AuthProvider } from './src/contexts/AuthContext';

// Initialize Firebase (mocked for this implementation)
// import { initializeApp } from 'firebase/app';
// import { firebaseConfig } from './config/firebaseConfig';
// initializeApp(firebaseConfig);

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor="#0066CC" barStyle="light-content" />
      <AuthProvider>
        <SyncProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </SyncProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;