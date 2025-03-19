import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ExtractedTicketData } from '../../types/ticket.types';

interface TicketFormProps {
  ticketData: ExtractedTicketData;
  imageUri: string;
  onEdit: (field: keyof ExtractedTicketData) => void;
  onValidate: () => void;
}

const TicketForm: React.FC<TicketFormProps> = ({ 
  ticketData, 
  imageUri, 
  onEdit, 
  onValidate 
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Résultat du scan ticket</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.successBanner}>
          <View style={styles.checkmarkContainer}>
            <Ionicons name="checkmark" size={24} color="#4CAF50" />
          </View>
          <View>
            <Text style={styles.successTitle}>Informations extraites</Text>
            <Text style={styles.successSubtitle}>Ticket de décharge reconnu</Text>
          </View>
        </View>
        
        <Image source={{ uri: imageUri }} style={styles.ticketImage} />
        
        <View style={styles.formContainer}>
          <View style={styles.formRow}>
            <Text style={styles.label}>Numéro Ticket :</Text>
            <Text style={styles.value}>{ticketData.ticket_num}</Text>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => onEdit('ticket_num')}
            >
              <Ionicons name="pencil" size={20} color="#0066cc" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.formRow}>
            <Text style={styles.label}>Date d'entrée :</Text>
            <Text style={styles.value}>{ticketData.date_entree}</Text>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => onEdit('date_entree')}
            >
              <Ionicons name="pencil" size={20} color="#0066cc" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.formRow}>
            <Text style={styles.label}>Date de sortie :</Text>
            <Text style={styles.value}>{ticketData.date_sortie}</Text>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => onEdit('date_sortie')}
            >
              <Ionicons name="pencil" size={20} color="#0066cc" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.formRow}>
            <Text style={styles.label}>Immatriculation :</Text>
            <Text style={styles.value}>{ticketData.camion_id}</Text>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => onEdit('camion_id')}
            >
              <Ionicons name="pencil" size={20} color="#0066cc" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.formRow}>
            <Text style={styles.label}>Produit :</Text>
            <Text style={styles.value}>{ticketData.produit}</Text>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => onEdit('produit')}
            >
              <Ionicons name="pencil" size={20} color="#0066cc" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.formRow}>
            <Text style={styles.label}>Poids :</Text>
            <Text style={styles.value}>{ticketData.poids_net} kg</Text>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => onEdit('poids_net')}
            >
              <Ionicons name="pencil" size={20} color="#0066cc" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.formRow}>
            <Text style={styles.label}>Chauffeur :</Text>
            <Text style={styles.value}>{ticketData.chauffeur}</Text>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => onEdit('chauffeur')}
            >
              <Ionicons name="pencil" size={20} color="#0066cc" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      
      <TouchableOpacity style={styles.validateButton} onPress={onValidate}>
        <Text style={styles.validateButtonText}>VALIDER</Text>
      </TouchableOpacity>
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
    marginRight: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  successBanner: {
    backgroundColor: '#e8f5e9',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkmarkContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderColor: '#4CAF50',
    borderWidth: 2,
    borderStyle: 'dotted',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  successTitle: {
    color: '#4CAF50',
    fontSize: 18,
    fontWeight: 'bold',
  },
  successSubtitle: {
    color: '#666',
    fontSize: 14,
  },
  ticketImage: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    flex: 2,
    fontSize: 16,
    color: '#666',
  },
  value: {
    flex: 3,
    fontSize: 16,
    textAlign: 'right',
    marginRight: 10,
    color: '#333',
  },
  editButton: {
    padding: 8,
  },
  validateButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  validateButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TicketForm;