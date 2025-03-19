import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation.types';
import Camera from '../../components/scan/Camera';
import ScanPreview from '../../components/scan/ScanPreview';
import { extractTicketData } from '../../services/ticketService';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ScanTicketScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCapture = (uri: string) => {
    setImageUri(uri);
  };

  const handleRetake = () => {
    setImageUri(null);
  };

  const handleConfirm = async () => {
    if (!imageUri) return;
    
    try {
      setIsProcessing(true);
      
      // Normalement, ici on enverrait l'image à l'API OpenAI pour extraction
      // Pour l'exemple, on simule une extraction avec des données fictives
      const extractedData = await extractTicketData(imageUri);
      
      navigation.navigate('ScanResult', {
        ticketData: extractedData,
        imageUri: imageUri
      });
    } catch (error) {
      console.error('Error processing ticket:', error);
      Alert.alert(
        'Erreur',
        'Impossible d\'extraire les informations du ticket. Veuillez réessayer.',
        [{ text: 'OK', onPress: () => setImageUri(null) }]
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {imageUri ? (
        <ScanPreview
          imageUri={imageUri}
          onRetake={handleRetake}
          onConfirm={handleConfirm}
        />
      ) : (
        <Camera
          onCapture={handleCapture}
          onBack={handleBack}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScanTicketScreen;