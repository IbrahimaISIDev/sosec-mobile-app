import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { InputType } from '../../types/expense.types';


// Type pour les noms d’icônes Ionicons
type IoniconsIconName = keyof typeof Ionicons.glyphMap;

interface InputTypeOptionProps {
  type: InputType;
  title: string;
  icon: IoniconsIconName;
  onSelect: (type: InputType) => void;
}

const InputTypeOption: React.FC<InputTypeOptionProps> = ({
  type,
  title,
  icon,
  onSelect
}) => {
  return (
    <TouchableOpacity
      style={styles.option}
      onPress={() => onSelect(type)}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={24} color="#0066cc" />
      </View>
      <Text style={styles.optionText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  option: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
});

export default InputTypeOption;