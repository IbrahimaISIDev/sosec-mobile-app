import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity,
  ScrollView,
  Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { ExpenseType, ExpenseFormData } from '../../types/expense.types';

interface ExpenseFormProps {
  expenseType: ExpenseType;
  onSubmit: (formData: ExpenseFormData) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ expenseType, onSubmit }) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const handleSubmit = () => {
    if (!amount || parseFloat(amount) <= 0) {
      // Gestion d'erreur
      return;
    }

    const formData: ExpenseFormData = {
      type: expenseType,
      date: date,
      amount: parseFloat(amount),
      notes: notes
    };

    if (quantity && parseFloat(quantity) > 0) {
      formData.quantity = parseFloat(quantity);
    }

    onSubmit(formData);
  };

  const needsQuantityField = 
    expenseType === ExpenseType.FUEL || 
    expenseType === ExpenseType.OIL;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formRow}>
        <Text style={styles.label}>Date</Text>
        <TouchableOpacity 
          style={styles.dateInput}
          onPress={() => setShowDatePicker(true)}
        >
          <Text>{date.toLocaleDateString()}</Text>
          <Ionicons name="calendar" size={20} color="#0066cc" />
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      {needsQuantityField && (
        <View style={styles.formRow}>
          <Text style={styles.label}>Quantité (Litres)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={quantity}
            onChangeText={setQuantity}
            placeholder="Saisir la quantité"
          />
        </View>
      )}

      <View style={styles.formRow}>
        <Text style={styles.label}>Montant (FCFA)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          placeholder="Saisir le montant"
        />
      </View>

      <View style={styles.formRow}>
        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={[styles.input, styles.notesInput]}
          multiline
          numberOfLines={3}
          value={notes}
          onChangeText={setNotes}
          placeholder="Ajouter des notes (optionnel)"
        />
      </View>

      <TouchableOpacity 
        style={styles.submitButton} 
        onPress={handleSubmit}
      >
        <Text style={styles.submitButtonText}>Enregistrer la dépense</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  formRow: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  dateInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default ExpenseForm;