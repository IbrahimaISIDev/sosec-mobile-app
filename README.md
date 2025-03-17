# sosec-mobile-app

## Description et aperçu du projet
`sosec-mobile-app` est une application mobile développée en React Native permettant de gérer et synchroniser des données issues de photos scannées. Elle inclut des fonctionnalités telles que la capture de photos via OCR, la gestion des données (stockage local avec SQLite, et synchronisation avec Firebase), ainsi qu'un tableau de bord d'administration.

L'application mobile SOSEC est conçue pour la gestion de flotte de camions, permettant aux chauffeurs de scanner des tickets, enregistrer le kilométrage, suivre les dépenses, et recevoir des alertes sur l'entretien des véhicules. L'application doit fonctionner même sans connexion internet et se synchroniser lorsque la connectivité est rétablie.

### Utilisateurs cibles
- Chauffeurs de camion
- Dispatchers
- Administrateurs
- 
## Fonctionnalités
- **Capture de photos** : Utilisation de l'appareil pour prendre des photos.
- Exemple : **Scan de tickets** : Les chauffeurs peuvent scanner des tickets (par exemple, pour des achats de carburant, des frais d'entretien) et extraire les informations via l'OCR.
- **OCR** : Extraction de texte à partir des images scannées.
- **Suivi du kilométrage** : Enregistrer le kilométrage des camions pour un suivi précis de l'utilisation du véhicule.
- **Gestion des dépenses** : Suivi des dépenses associées à chaque camion (carburant, entretien, etc.).
- **Alertes d'entretien** : Notifications pour les alertes d'entretien ou de service des camions.
- **Fonctionnement hors ligne** : L'application fonctionne sans connexion Internet. Elle stocke les données localement avec SQLite, puis les synchronise avec Firebase lorsque la connexion est rétablie.
- **Stockage local** : SQLite pour enregistrer les données localement.
- **Synchronisation en temps réel** : Une fois la connexion Internet rétablie, les données sont automatiquement synchronisées avec Firebase, garantissant la mise à jour des informations pour les administrateurs.
- **Synchronisation** : Synchronisation des données avec Firebase en temps réel.
- **Tableau de bord** : Les administrateurs peuvent visualiser les données sur une interface web ou mobile, offrant un aperçu des informations de la flotte (par exemple, état des camions, dépenses, alertes, etc.).
- **Authentification** : Connexion via email et gestion des profils utilisateurs.
  
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
- 

## Architecture technique
### Pile technologique
- **Framework mobile**: React Native avec Expo, TypeScript
- **Gestion d'état**: Redux Toolkit
- **Backend**: Firebase (Firebase Authentication, Firestore, Storage, Functions)
- **Base de données locale**: WatermelonDB (SQLite)
- **API** : Firebase, OpenAI (pour l'OCR)
- **OCR/Extraction de données**: OpenAI API
- **Offline/Online Sync**: Queue personnalisée

## Configuration initiale

### Initialisation du projet

```bash
# Créer un nouveau projet avec Expo et TypeScript
npx create-expo-app -t expo-template-blank-typescript sosec-mobile-app

# Naviguer vers le projet
cd sosec-mobile-app

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
