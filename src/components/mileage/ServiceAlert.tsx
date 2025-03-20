// src/components/mileage/ServiceAlert.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../common/Card';

interface ServiceAlertProps {
  remainingKm: number;
}

export const ServiceAlert: React.FC<ServiceAlertProps> = ({ remainingKm }) => {
  const getAlertLevel = () => {
    if (remainingKm <= 300) return 'critical';
    if (remainingKm <= 500) return 'warning';
    return 'info';
  };

  const alertLevel = getAlertLevel();
  
  const getBgColor = () => {
    switch (alertLevel) {
      case 'critical': return '#ffebee';
      case 'warning': return '#fff8e1';
      case 'info': return '#e3f2fd';
      default: return '#e3f2fd';
    }
  };
  
  const getTextColor = () => {
    switch (alertLevel) {
      case 'critical': return '#c62828';
      case 'warning': return '#ff8f00';
      case 'info': return '#1565c0';
      default: return '#1565c0';
    }
  };

  const getMessage = () => {
    if (remainingKm <= 300) {
      return 'Service urgent ! Vidange nécessaire très bientôt.';
    } else if (remainingKm <= 500) {
      return 'Service nécessaire bientôt. Planifiez votre prochaine vidange.';
    } else {
      return 'Service à prévoir prochainement.';
    }
  };

  return (
        <Card style={StyleSheet.flatten([styles.container, { backgroundColor: getBgColor() }])}>
        <View style={styles.content}>
        <Text style={[styles.title, { color: getTextColor() }]}>
          {alertLevel === 'critical' ? 'Alerte de maintenance' : 'Maintenance planifiée'}
        </Text>
        <Text style={[styles.message, { color: getTextColor() }]}>
          {getMessage()}
        </Text>
        <Text style={[styles.kmInfo, { color: getTextColor() }]}>
          {remainingKm.toLocaleString()} km restants avant vidange
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  content: {
    padding: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    marginBottom: 4,
  },
  kmInfo: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});