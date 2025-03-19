// src/components/common/Header.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface HeaderProps {
  userName: string;
  truckId: string;
  date: string;
}

const Header = ({ userName, truckId, date }: HeaderProps) => {
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