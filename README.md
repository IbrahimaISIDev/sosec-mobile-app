# sosec-mobile-app

## Description
`sosec-mobile-app` est une application mobile développée en React Native permettant de gérer et synchroniser des données issues de photos scannées. Elle inclut des fonctionnalités telles que la capture de photos via OCR, la gestion des données (stockage local avec SQLite, et synchronisation avec Firebase), ainsi qu'un tableau de bord d'administration.

## Fonctionnalités
- **Capture de photos** : Utilisation de l'appareil pour prendre des photos.
- **OCR** : Extraction de texte à partir des images scannées.
- **Stockage local** : SQLite pour enregistrer les données localement.
- **Synchronisation** : Synchronisation des données avec Firebase en temps réel.
- **Tableau de bord** : Interface d'administration pour superviser les données et la synchronisation.
- **Authentification** : Connexion via email et gestion des profils utilisateurs.

## Technologies
- **Frontend** : React Native, TypeScript
- **Backend** : Firebase (Firestore, Firebase Authentication)
- **Stockage local** : SQLite
- **API** : Firebase, OpenAI (pour l'OCR)

## Installation

### Prérequis
- Node.js installé
- Expo CLI (si tu utilises Expo)
- Android Studio ou Xcode pour émuler ou tester sur un appareil

### Installation des dépendances
Clone ce dépôt et installe les dépendances nécessaires avec la commande suivante :
```bash
git clone https://github.com/IbrahimaISIDev/sosec-mobile-app.git
cd sosec-mobile-app
npm install


# Documentation de l'Application Mobile SOSEC

## Table des matières
1. [Aperçu du projet](#aperçu-du-projet)
2. [Architecture technique](#architecture-technique)
3. [Structure des fichiers](#structure-des-fichiers)
4. [Configuration initiale](#configuration-initiale)
5. [Fonctionnalités principales](#fonctionnalités-principales)
6. [Composants clés](#composants-clés)
7. [Services](#services)
8. [Gestion de l'état](#gestion-de-létat)
9. [Base de données](#base-de-données)
10. [Synchronisation offline/online](#synchronisation-offlineonline)
11. [Sécurité](#sécurité)
12. [Déploiement](#déploiement)
13. [Tests](#tests)
14. [Maintenance](#maintenance)
15. [Feuille de route](#feuille-de-route)

## Aperçu du projet

L'application mobile SOSEC est conçue pour la gestion de flotte de camions, permettant aux chauffeurs de scanner des tickets, enregistrer le kilométrage, suivre les dépenses, et recevoir des alertes sur l'entretien des véhicules. L'application doit fonctionner même sans connexion internet et se synchroniser lorsque la connectivité est rétablie.

### Utilisateurs cibles
- Chauffeurs de camion
- Dispatchers
- Administrateurs

### Fonctionnalités principales
- Scan et extraction des données des tickets
- Suivi du kilométrage des camions
- Enregistrement et gestion des dépenses
- Système d'alertes pour l'entretien
- Synchronisation online/offline

## Architecture technique

### Pile technologique
- **Framework mobile**: React Native avec Expo
- **Gestion d'état**: Redux Toolkit
- **Backend**: Firebase (Auth, Firestore, Storage, Functions)
- **Base de données locale**: WatermelonDB (SQLite)
- **OCR/Extraction de données**: OpenAI API
- **Offline/Online Sync**: Queue personnalisée

### Diagramme d'architecture

```
┌─────────────────────────────────────────┐
│             Application Mobile           │
│           (React Native + Expo)          │
└───────────────┬─────────────┬───────────┘
                │             │
                ▼             ▼
┌─────────────────────┐ ┌────────────────┐
│    WatermelonDB     │ │   OpenAI API   │
│  (Stockage local)   │ │  (Extraction)  │
└─────────────┬───────┘ └────────┬───────┘
              │                   │
              ▼                   ▼
┌─────────────────────────────────────────┐
│             Firebase Backend            │
│    (Auth, Firestore, Storage, Functions) │
└─────────────────────────────────────────┘
```

## Structure des fichiers

```
sosec-mobile/
├── .expo/
├── assets/
│   ├── fonts/
│   ├── icons/
│   └── images/
├── src/
│   ├── api/
│   │   ├── firebase.ts
│   │   ├── openai.ts
│   │   └── index.ts
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Header.tsx
│   │   │   └── ...
│   │   ├── home/
│   │   ├── scan/
│   │   ├── kilometrage/
│   │   ├── depenses/
│   │   └── alertes/
│   ├── contexts/
│   │   ├── AuthContext.tsx
│   │   └── NetworkContext.tsx
│   ├── database/
│   │   ├── schema.ts
│   │   ├── models/
│   │   └── adapters/
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useCamera.ts
│   │   ├── useOCR.ts
│   │   └── useSyncQueue.ts
│   ├── navigation/
│   │   ├── AppNavigator.tsx
│   │   ├── AuthNavigator.tsx
│   │   └── RootNavigator.tsx
│   ├── screens/
│   │   ├── auth/
│   │   │   ├── LoginScreen.tsx
│   │   │   └── ...
│   │   ├── home/
│   │   │   └── HomeScreen.tsx
│   │   ├── scan/
│   │   │   ├── ScanTicketScreen.tsx
│   │   │   └── ReviewTicketScreen.tsx
│   │   ├── kilometrage/
│   │   │   └── KilometrageScreen.tsx
│   │   ├── depenses/
│   │   │   └── DepensesScreen.tsx
│   │   └── alertes/
│   │       └── AlertesScreen.tsx
│   ├── services/
│   │   ├── auth.ts
│   │   ├── camera.ts
│   │   ├── ocr.ts
│   │   ├── sync.ts
│   │   └── notifications.ts
│   ├── store/
│   │   ├── slices/
│   │   │   ├── authSlice.ts
│   │   │   ├── ticketSlice.ts
│   │   │   ├── kilometrageSlice.ts
│   │   │   └── depensesSlice.ts
│   │   ├── middleware/
│   │   │   └── syncMiddleware.ts
│   │   └── index.ts
│   ├── types/
│   │   ├── auth.ts
│   │   ├── ticket.ts
│   │   ├── kilometrage.ts
│   │   └── depenses.ts
│   ├── utils/
│   │   ├── formatter.ts
│   │   ├── validators.ts
│   │   └── networkStatus.ts
│   ├── App.tsx
│   └── index.ts
├── app.json
├── babel.config.js
├── eas.json
├── package.json
├── tsconfig.json
└── README.md
```

## Configuration initiale

### Initialisation du projet

```bash
# Créer un nouveau projet avec Expo et TypeScript
npx create-expo-app -t expo-template-blank-typescript sosec-mobile

# Naviguer vers le projet
cd sosec-mobile

# Installer les dépendances de base
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context
npm install @reduxjs/toolkit react-redux
npm install firebase
npm install @nozbe/watermelondb
npm install openai
npm install axios

# Installer les dépendances Expo
npx expo install expo-camera expo-image-manipulator expo-file-system expo-updates
npx expo install expo-image-picker expo-network expo-sqlite expo-status-bar
```

### Configuration Firebase

1. Créez un projet Firebase dans la console Firebase
2. Configurez Authentication, Firestore et Storage
3. Créez le fichier de configuration:

```typescript
// src/api/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);

// Services Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

### Configuration OpenAI

```typescript
// src/api/openai.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: 'YOUR_OPENAI_API_KEY',
});

export default openai;
```

### Configuration WatermelonDB

```typescript
// src/database/schema.ts
import { appSchema, tableSchema } from '@nozbe/watermelondb';

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'tickets',
      columns: [
        { name: 'remote_id', type: 'string', isOptional: true },
        { name: 'ticket_num', type: 'string' },
        { name: 'date_entree', type: 'number' },
        { name: 'date_sortie', type: 'number' },
        { name: 'camion_id', type: 'string' },
        { name: 'produit', type: 'string' },
        { name: 'poids_net', type: 'number' },
        { name: 'transporteur', type: 'string' },
        { name: 'preneur', type: 'string' },
        { name: 'commande_id', type: 'string', isOptional: true },
        { name: 'fournisseur', type: 'string', isOptional: true },
        { name: 'image_url', type: 'string', isOptional: true },
        { name: 'sync_status', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ]
    }),
    tableSchema({
      name: 'carburants',
      columns: [
        { name: 'remote_id', type: 'string', isOptional: true },
        { name: 'date', type: 'number' },
        { name: 'chauffeur', type: 'string' },
        { name: 'telephone', type: 'string', isOptional: true },
        { name: 'camion_id', type: 'string' },
        { name: 'designation', type: 'string' },
        { name: 'quantite', type: 'number' },
        { name: 'montant', type: 'number' },
        { name: 'image_url', type: 'string', isOptional: true },
        { name: 'sync_status', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ]
    }),
    tableSchema({
      name: 'kilometrages',
      columns: [
        { name: 'remote_id', type: 'string', isOptional: true },
        { name: 'date', type: 'number' },
        { name: 'camion_id', type: 'string' },
        { name: 'chauffeur_id', type: 'string' },
        { name: 'valeur', type: 'number' },
        { name: 'image_url', type: 'string', isOptional: true },
        { name: 'sync_status', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ]
    }),
    tableSchema({
      name: 'depenses',
      columns: [
        { name: 'remote_id', type: 'string', isOptional: true },
        { name: 'type', type: 'string' },
        { name: 'date', type: 'number' },
        { name: 'camion_id', type: 'string' },
        { name: 'chauffeur_id', type: 'string' },
        { name: 'montant', type: 'number' },
        { name: 'notes', type: 'string', isOptional: true },
        { name: 'image_url', type: 'string', isOptional: true },
        { name: 'sync_status', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ]
    }),
  ]
});
```

## Fonctionnalités principales

### 1. Extraction de données à partir des tickets (Image)

#### Processus
1. Le chauffeur ouvre l'application et clique sur "Scanner ticket"
2. L'application active la caméra
3. Le chauffeur prend une photo du ticket
4. L'application traite l'image localement
5. Si une connexion internet est disponible, l'image est envoyée à l'API OpenAI pour extraction
6. Si hors-ligne, une extraction basique est effectuée avec Firebase ML Kit en local
7. Les données extraites sont affichées pour vérification
8. Après validation, les données sont enregistrées dans la base SQLite locale
9. Les données sont ajoutées à la file d'attente de synchronisation

#### Implémentation

```typescript
// src/services/ocr.ts
import OpenAI from '../api/openai';
import { processImageLocally } from './imageProcessing';

export const extractTicketData = async (imageUri: string, isOnline: boolean) => {
  try {
    // Prétraiter l'image pour réduire sa taille
    const processedImage = await processImageLocally(imageUri);
    
    if (isOnline) {
      // Utiliser OpenAI pour l'extraction
      const response = await OpenAI.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: "Extraire les informations suivantes de ce ticket : numéro de ticket, dates d'entrée et sortie, immatriculation du camion, produit, poids net, transporteur, chauffeur, numéro de commande, fournisseur. Retourne le résultat au format JSON." },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${processedImage}`,
                },
              },
            ],
          },
        ],
      });
      
      const result = JSON.parse(response.choices[0].message.content);
      return result;
    } else {
      // Fallback avec traitement local (à implémenter)
      // Pour MVP, on peut retourner un objet avec des champs vides à remplir manuellement
      return {
        ticket_num: "",
        date_entree: "",
        date_sortie: "",
        camion_id: "",
        produit: "",
        poids_net: 0,
        transporteur: "",
        preneur: "",
        commande_id: "",
        fournisseur: "",
      };
    }
  } catch (error) {
    console.error("Erreur d'extraction OCR:", error);
    throw error;
  }
};
```

### 2. Extraction du kilométrage et prédiction de l'entretien

####