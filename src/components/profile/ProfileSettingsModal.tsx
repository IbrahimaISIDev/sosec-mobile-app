import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  Switch,
  TextInput,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { User } from '../../types/user.types';

interface ProfileSettingsModalProps {
  visible: boolean;
  onClose: () => void;
  user: User | null;
  onSave: (preferences: Partial<User>) => Promise<boolean>;
}

const ProfileSettingsModal: React.FC<ProfileSettingsModalProps> = ({
  visible,
  onClose,
  user,
  onSave
}) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(user?.notifications || false);
  const [language, setLanguage] = useState(user?.language || 'Français');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [address, setAddress] = useState(user?.address || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    
    const preferences: Partial<User> = {
      notifications: notificationsEnabled,
      language,
      phoneNumber,
      address
    };
    
    const success = await onSave(preferences);
    setSaving(false);
    
    if (success) {
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Paramètres du profil</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalBody}>
            <Text style={styles.sectionTitle}>Informations personnelles</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Téléphone</Text>
              <TextInput
                style={styles.input}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Numéro de téléphone"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Adresse</Text>
              <TextInput
                style={styles.input}
                value={address}
                onChangeText={setAddress}
                placeholder="Adresse"
              />
            </View>
            
            <Text style={[styles.sectionTitle, styles.marginTop]}>Préférences</Text>
            
            <View style={styles.settingItem}>
              <Text style={styles.label}>Notifications</Text>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={notificationsEnabled ? '#0066CC' : '#f4f3f4'}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Langue</Text>
              <View style={styles.languageSelector}>
                <TouchableOpacity
                  style={[
                    styles.languageOption,
                    language === 'Français' && styles.languageOptionSelected
                  ]}
                  onPress={() => setLanguage('Français')}
                >
                  <Text style={language === 'Français' ? styles.languageTextSelected : styles.languageText}>
                    Français
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[
                    styles.languageOption,
                    language === 'English' && styles.languageOptionSelected
                  ]}
                  onPress={() => setLanguage('English')}
                >
                  <Text style={language === 'English' ? styles.languageTextSelected : styles.languageText}>
                    English
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[
                    styles.languageOption,
                    language === 'Wolof' && styles.languageOptionSelected
                  ]}
                  onPress={() => setLanguage('Wolof')}
                >
                  <Text style={language === 'Wolof' ? styles.languageTextSelected : styles.languageText}>
                    Wolof
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          
          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Annuler</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
              disabled={saving}
            >
              <Text style={styles.saveButtonText}>
                {saving ? 'Enregistrement...' : 'Enregistrer'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    padding: 16,
    maxHeight: 400,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  marginTop: {
    marginTop: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  languageSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  languageOption: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    marginHorizontal: 4,
    borderRadius: 8,
  },
  languageOptionSelected: {
    backgroundColor: '#0066CC',
    borderColor: '#0066CC',
  },
  languageText: {
    color: '#333',
  },
  languageTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    padding: 12,
    backgroundColor: '#EEEEEE',
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: 'bold',
  },
  saveButton: {
    padding: 12,
    backgroundColor: '#0066CC',
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProfileSettingsModal;