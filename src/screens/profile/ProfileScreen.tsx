import React, { useState } from 'react';
import { 
  View,
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView,
  Image,
  StatusBar
} from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen: React.FC = () => {
//   const { user, logout } = useAuth();
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState(true);

  // Données factices pour la démonstration
  const userInfo = {
    id: 'CHF-2587',
    fullName: 'Ibrahima Diallo',
    phoneNumber: '+221 78 561 91 15',
    address: 'Sacré Coeur 1',
    language: 'Français',
    version: '2.1'
  };

//   const handleLogout = () => {
//     logout();
//     // Rediriger vers la page de connexion après la déconnexion
//     // navigation.navigate('Login');
//   };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0066CC" />
      
      {/* En-tête avec les informations du profil */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>ID</Text>
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>{userInfo.fullName}</Text>
          <Text style={styles.headerSubtitle}>Chauffeur ID: {userInfo.id}</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Section des informations personnelles */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations personnelles</Text>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Téléphone</Text>
            <Text style={styles.infoValue}>{userInfo.phoneNumber}</Text>
          </View>
          
          <View style={styles.separator} />
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Adresse</Text>
            <Text style={styles.infoValue}>{userInfo.address}</Text>
          </View>
        </View>

        {/* Section des paramètres */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Paramètres</Text>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Notifications</Text>
            <Text style={styles.infoValue}>Activées</Text>
          </View>
          
          <View style={styles.separator} />
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Langue</Text>
            <Text style={styles.infoValue}>{userInfo.language}</Text>
          </View>
          
          <View style={styles.separator} />
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Version</Text>
            <Text style={styles.infoValue}>{userInfo.version}</Text>
          </View>
        </View>

        {/* Bouton de déconnexion */}
        {/* <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#0066CC',
    paddingTop: 40,
    paddingBottom: 30,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0066CC',
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.8,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: '#EEEEEE',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 90, // Espace pour la barre de navigation
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;


