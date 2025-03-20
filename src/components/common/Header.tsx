import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  userName?: string;
  truckId?: string;
  date?: string;
  title?: string;
  showBackButton?: boolean;
}

const Header = ({ userName, truckId, date, title, showBackButton }: HeaderProps) => {
  const navigation = useNavigation();
  
  // Si un titre est fourni, afficher l'en-tête simple avec titre
  if (title) {
    return (
      <View style={styles.simpleHeader}>
        {showBackButton && (
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.titleText}>{title}</Text>
      </View>
    );
  }
  
  // Sinon, afficher l'en-tête complet avec informations utilisateur
  return (
    <View style={styles.header}>
      <View style={styles.headerInfo}>
        <Text style={styles.companyName}>SOSEC</Text>
        <Text style={styles.greeting}>Bonjour, {userName}</Text>
        <Text style={styles.truckInfo}>Camion: {truckId}</Text>
        <Text style={styles.dateInfo}>{date}</Text>
      </View>
      <View style={styles.profileIcon}>
        <Text style={styles.profileText}>ID</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#0066CC',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  simpleHeader: {
    backgroundColor: '#0066CC',
    padding: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 10,
    padding: 5,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  truckInfo: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  dateInfo: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  profileIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0066CC',
  },
});

export default Header;