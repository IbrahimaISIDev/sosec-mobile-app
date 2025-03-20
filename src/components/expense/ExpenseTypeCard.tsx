import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ExpenseType } from '../../types/expense.types';

// Type pour les noms d’icônes Ionicons
type IoniconsIconName = keyof typeof Ionicons.glyphMap;

interface ExpenseTypeCardProps {
  type: ExpenseType;
  title: string;
  icon: IoniconsIconName;
  color: string;
  isSelected: boolean;
  onSelect: (type: ExpenseType) => void;
}

const ExpenseTypeCard: React.FC<ExpenseTypeCardProps> = ({
  type,
  title,
  icon,
  color,
  isSelected,
  onSelect,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: color },
        isSelected && styles.selectedCard,
      ]}
      onPress={() => onSelect(type)}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={24} color="white" />
      </View>
      <Text style={styles.cardText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 80,
    margin: 6,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#0066cc',
  },
  iconContainer: {
    marginBottom: 8,
  },
  cardText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default ExpenseTypeCard;