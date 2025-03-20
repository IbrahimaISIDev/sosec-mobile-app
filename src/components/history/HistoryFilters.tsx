import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal } from 'react-native';
import DatePicker from '@react-native-community/datetimepicker';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Ionicons } from '@expo/vector-icons';

interface FilterOptions {
  startDate: Date | null;
  endDate: Date | null;
  types: string[];
  minAmount: number | null;
  maxAmount: number | null;
}

interface FilterProps {
  onFilterChange: (filters: FilterOptions) => void;
  currentFilters: FilterOptions;
}

interface TypeOption {
  label: string;
  value: string;
}

export const HistoryFilters: React.FC<FilterProps> = ({ onFilterChange, currentFilters }) => {
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [tempFilters, setTempFilters] = useState<FilterOptions>({ ...currentFilters });
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const typeOptions: TypeOption[] = [
    { label: 'Bon de prélèvement', value: 'prelevement' },
    { label: 'Reçu de décharge', value: 'decharge' },
    { label: 'Maintenance', value: 'maintenance' },
    { label: 'Plein de carburant', value: 'carburant' },
    { label: 'Ticket de péage', value: 'peage' },
    { label: 'Tableau de bord', value: 'tableau_bord' },
  ];

  const toggleTypeFilter = (type: string): void => {
    if (tempFilters.types.includes(type)) {
      setTempFilters({
        ...tempFilters,
        types: tempFilters.types.filter(t => t !== type)
      });
    } else {
      setTempFilters({
        ...tempFilters,
        types: [...tempFilters.types, type]
      });
    }
  };

  const applyFilters = (): void => {
    onFilterChange(tempFilters);
    setFilterModalVisible(false);
  };

  const resetFilters = (): void => {
    const resetFilters: FilterOptions = {
      startDate: null,
      endDate: null,
      types: [],
      minAmount: null,
      maxAmount: null,
    };
    setTempFilters(resetFilters);
    onFilterChange(resetFilters);
    setFilterModalVisible(false);
  };

  // Type definition for DatePicker onChange event
  type DateTimePickerEvent = {
    type: string;
    nativeEvent: {
      timestamp?: number;
    };
  };

  const handleStartDateChange = (_event: DateTimePickerEvent | any, selectedDate?: Date): void => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setTempFilters({ ...tempFilters, startDate: selectedDate });
    }
  };

  const handleEndDateChange = (_event: DateTimePickerEvent | any, selectedDate?: Date): void => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      setTempFilters({ ...tempFilters, endDate: selectedDate });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.filterButton} 
        onPress={() => setFilterModalVisible(true)}
      >
        <Ionicons name="filter" size={20} color="#1E88E5" />
        <Text style={styles.filterButtonText}>Filtrer</Text>
      </TouchableOpacity>
      
      {(currentFilters.startDate || 
       currentFilters.endDate || 
       currentFilters.types.length > 0 || 
       currentFilters.minAmount || 
       currentFilters.maxAmount) && (
        <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
          <Text style={styles.resetButtonText}>Réinitialiser</Text>
        </TouchableOpacity>
      )}

      <Modal
        visible={isFilterModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filtres</Text>
            
            <Text style={styles.sectionTitle}>Période</Text>
            <View style={styles.dateContainer}>
              <TouchableOpacity 
                style={styles.dateButton} 
                onPress={() => setShowStartDatePicker(true)}
              >
                <Text>
                  {tempFilters.startDate 
                    ? tempFilters.startDate.toLocaleDateString('fr-FR') 
                    : 'Date de début'}
                </Text>
              </TouchableOpacity>
              
              <Text style={styles.dateSeperator}>au</Text>
              
              <TouchableOpacity 
                style={styles.dateButton} 
                onPress={() => setShowEndDatePicker(true)}
              >
                <Text>
                  {tempFilters.endDate 
                    ? tempFilters.endDate.toLocaleDateString('fr-FR') 
                    : 'Date de fin'}
                </Text>
              </TouchableOpacity>
            </View>

            {showStartDatePicker && (
              <DatePicker
                value={tempFilters.startDate || new Date()}
                mode="date"
                onChange={handleStartDateChange}
              />
            )}

            {showEndDatePicker && (
              <DatePicker
                value={tempFilters.endDate || new Date()}
                mode="date"
                onChange={handleEndDateChange}
              />
            )}
            
            <Text style={styles.sectionTitle}>Types</Text>
            <View style={styles.typeContainer}>
              {typeOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.typeButton,
                    tempFilters.types.includes(option.value) && styles.selectedTypeButton
                  ]}
                  onPress={() => toggleTypeFilter(option.value)}
                >
                  <Text style={[
                    styles.typeButtonText,
                    tempFilters.types.includes(option.value) && styles.selectedTypeButtonText
                  ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <Text style={styles.sectionTitle}>Montant (FCFA)</Text>
            <View style={styles.amountContainer}>
              <Input
                style={styles.amountInput}
                placeholder="Minimum"
                keyboardType="numeric"
                value={tempFilters.minAmount?.toString() || ''}
                onChangeText={(text: string) => 
                  setTempFilters({
                    ...tempFilters, 
                    minAmount: text ? parseInt(text) : null
                  })
                }
              />
              
              <Text style={styles.amountSeparator}>à</Text>
              
              <Input
                style={styles.amountInput}
                placeholder="Maximum"
                keyboardType="numeric"
                value={tempFilters.maxAmount?.toString() || ''}
                onChangeText={(text: string) => 
                  setTempFilters({
                    ...tempFilters, 
                    maxAmount: text ? parseInt(text) : null
                  })
                }
              />
            </View>
            
            <View style={styles.buttonContainer}>
              <Button
                title="Annuler"
                onPress={() => setFilterModalVisible(false)}
                type="secondary"
                style={styles.modalButton}
              />
              <Button
                title="Appliquer"
                onPress={applyFilters}
                type="primary"
                style={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButtonText: {
    marginLeft: 8,
    color: '#1E88E5',
    fontWeight: '500',
  },
  resetButton: {
    marginLeft: 'auto',
  },
  resetButtonText: {
    color: '#F44336',
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
  },
  dateSeperator: {
    marginHorizontal: 10,
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  typeButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    marginRight: 8,
    marginBottom: 8,
  },
  selectedTypeButton: {
    backgroundColor: '#1E88E5',
  },
  typeButtonText: {
    color: '#707070',
  },
  selectedTypeButtonText: {
    color: '#FFFFFF',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountInput: {
    flex: 1,
  },
  amountSeparator: {
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
  },
});