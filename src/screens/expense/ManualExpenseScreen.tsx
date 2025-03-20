import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import ExpenseForm from '../../components/expense/ExpenseForm';
import { ExpenseType, ExpenseFormData } from '../../types/expense.types';
import { useDispatch } from 'react-redux';
// Importez vos actions Redux ici
// import { addExpense } from '../../store/slices/expenseSlice';

const ManualExpenseScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  
  const { expenseType } = route.params as { expenseType: ExpenseType };
  
  const getExpenseTypeTitle = (type: ExpenseType): string => {
    switch (type) {
      case ExpenseType.FUEL:
        return 'Carburant';
      case ExpenseType.OIL:
        return 'Huile';
      case ExpenseType.REPAIRS:
        return 'Réparations';
      case ExpenseType.OTHER:
        return 'Autres';
      default:
        return 'Dépense';
    }
  };

  const handleSubmit = (formData: ExpenseFormData) => {
    // Ici, vous pouvez dispatcher l'action pour enregistrer la dépense
    // dispatch(addExpense({
    //   ...formData,
    //   id: Date.now().toString(),
    //   truckId: 'TRUCK_ID', // À récupérer du contexte ou du store
    //   driverId: 'DRIVER_ID', // À récupérer du contexte ou du store
    //   syncStatus: 'local'
    // }));
    
    console.log('Expense submitted:', formData);
    
    // Retour à l'écran précédent ou au dashboard
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          Nouvelle Dépense - {getExpenseTypeTitle(expenseType)}
        </Text>
      </View>
      
      <ExpenseForm 
        expenseType={expenseType}
        onSubmit={handleSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#0066cc',
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ManualExpenseScreen;