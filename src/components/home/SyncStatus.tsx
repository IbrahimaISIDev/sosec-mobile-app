// src/components/home/SyncStatus.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface SyncStatusProps {
  status: 'synced' | 'syncing' | 'offline';
  lastSync?: string;
}

const SyncStatus = ({ status, lastSync }: SyncStatusProps) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'synced':
        return {
          icon: 'checkmark-done-circle',
          color: '#4CAF50',
          text: 'Synchronisé'
        };
      case 'syncing':
        return {
          icon: 'sync',
          color: '#FFC107',
          text: 'Synchronisation...'
        };
      case 'offline':
        return {
          icon: 'cloud-offline',
          color: '#F44336',
          text: 'Hors ligne'
        };
      default:
        return {
          icon: 'help-circle',
          color: '#9E9E9E',
          text: 'Statut inconnu'
        };
    }
  };

  const { icon, color, text } = getStatusConfig();

  return (
    <View style={styles.container}>
      <Icon name={icon} size={20} color={color} style={styles.icon} />
      <Text style={[styles.text, { color }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F5F5F5',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default SyncStatus;