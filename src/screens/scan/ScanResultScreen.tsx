import React, { useState } from 'react';
import { StyleSheet, View, Alert, TextInput, Modal, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation.types';
import TicketForm from '../../components/scan/TicketForm';
import { ExtractedTicketData } from '../../types/ticket.types';
import { saveTicket } from '../../services/ticketService';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteProps = RouteProp<RootStackParamList, 'ScanResult'>;

const ScanResultScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const { ticketData: initialTicketData, imageUri } = route.params;
  
  const [ticketData, setTicketData] = useState<ExtractedTicketData>(initialTicketData);
  const [editField, setEditField] = useState<keyof ExtractedTicketData | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);

  const handleEdit = (field: keyof ExtractedTicketData) => {
    setEditField(field);
    setEditValue(String(ticketData[field]));
  };

  const handleSaveEdit = () => {
    if (editField) {
      let value: any = editValue;
      
      // Handle numeric fields
      if (editField === 'poids_net') {
        value = parseFloat(editValue);
        if (isNaN(value)) {
          Alert.alert('Erreur', 'Veuillez entrer une valeur numérique valide.');
          return;
        }
      }
      
      setTicketData({
        ...ticketData,
        [editField]: value
      });
      setEditField(null);
    }
  };

  const handleValidate = async () => {
    try {
      setIsSaving(true);
      
      // Save ticket to local database and sync with Firebase when online
      await saveTicket({
        ...ticketData,
        image_url: imageUri
      });
      
      Alert.alert(
        'Succès',
        'Ticket enregistré avec succès',
        [{ text: 'OK', onPress: () => navigation.navigate('Home') }]
      );
    } catch (error) {
      console.error('Error saving ticket:', error);
      Alert.alert('Erreur', 'Impossible d\'enregistrer le ticket. Veuillez réessayer.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <TicketForm
        ticketData={ticketData}
        imageUri={imageUri}
        onEdit={handleEdit}
        onValidate={handleValidate}
      />
      
      <Modal
        visible={editField !== null}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Modifier {editField === 'ticket_num' ? 'numéro ticket' :
                        editField === 'date_entree' ? 'date d\'entrée' :
                        editField === 'date_sortie' ? 'date de sortie' :
                        editField === 'camion_id' ? 'immatriculation' :
                        editField === 'produit' ? 'produit' :
                        editField === 'poids_net' ? 'poids' :
                        editField === 'chauffeur' ? 'chauffeur' : ''}
            </Text>
            
            <TextInput
              style={styles.input}
              value={editValue}
              onChangeText={setEditValue}
              autoFocus
              keyboardType={editField === 'poids_net' ? 'numeric' : 'default'}
            />
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.button, styles.cancelButton]} 
                onPress={() => setEditField(null)}
              >
                <Text style={styles.buttonText}>Annuler</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.button, styles.saveButton]} 
                onPress={handleSaveEdit}
              >
                <Text style={styles.buttonText}>Enregistrer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginLeft: 8,
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ScanResultScreen;