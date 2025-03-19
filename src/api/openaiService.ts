// src/api/openaiService.ts

import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import Constants from 'expo-constants';
import { TicketData } from '../types/ticket.types';
import { FuelData } from '../types/ticket.types';
import { MileageData } from '../types/ticket.types';

// Type pour les résultats génériques
type ExtractionResult = TicketData | FuelData | MileageData;

// Configuration de l'API
const API_KEY = Constants.expoConfig?.extra?.openaiApiKey || '';
const API_URL = 'https://api.openai.com/v1/chat/completions';

/**
 * Prétraitement de l'image pour optimiser l'extraction OCR
 * @param imageUri URI de l'image capturée
 * @returns URI de l'image optimisée
 */
const preprocessImage = async (imageUri: string): Promise<string> => {
  try {
    // Redimensionnement et optimisation de l'image
    const manipResult = await manipulateAsync(
      imageUri,
      [
        { resize: { width: 1200 } },
        { crop: { originX: 0, originY: 0, width: 1200, height: 1600 } },
      ],
      { compress: 0.8, format: SaveFormat.JPEG }
    );

    return manipResult.uri;
  } catch (error) {
    console.error('Error preprocessing image:', error);
    return imageUri; // Retourne l'image originale en cas d'erreur
  }
};

/**
 * Convertit l'image en base64 pour l'envoyer à l'API
 * @param imageUri URI de l'image
 * @returns Chaîne base64 de l'image
 */
const imageToBase64 = async (imageUri: string): Promise<string> => {
  try {
    const base64 = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return base64;
  } catch (error) {
    console.error('Error converting image to base64:', error);
    throw new Error('Failed to convert image to base64');
  }
};

/**
 * Fonction principale pour extraire les données d'un ticket via l'API OpenAI
 * @param imageUri URI de l'image du ticket
 * @param type Type de document ("ticket" | "fuel" | "mileage")
 * @returns Données extraites du ticket
 */
export const extractDataFromImage = async (
  imageUri: string,
  type: 'ticket' | 'fuel' | 'mileage'
): Promise<ExtractionResult> => {
  try {
    // Prétraitement de l'image
    const processedImageUri = await preprocessImage(imageUri);
    
    // Conversion en base64
    const base64Image = await imageToBase64(processedImageUri);
    
    // Préparation des instructions selon le type de document
    const instructions = getInstructionsForType(type);
    
    // Appel à l'API OpenAI
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4-vision-preview',
        messages: [
          {
            role: 'system',
            content: 'Vous êtes un assistant spécialisé dans l\'extraction de données à partir d\'images de documents. Extrayez uniquement les informations demandées au format JSON.'
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: instructions
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`
                }
              }
            ]
          }
        ],
        max_tokens: 1000,
        temperature: 0.3,
        response_format: { type: 'json_object' }
      }),
    });

    const data = await response.json();
    
    if (data.error) {
      console.error('OpenAI API error:', data.error);
      throw new Error(data.error.message);
    }
    
    // Extraction et parsing de la réponse JSON
    const content = data.choices[0].message.content;
    const extractedData = JSON.parse(content);
    
    // Validation et nettoyage des données extraites
    return validateAndCleanData(extractedData, type);
    
  } catch (error: any) {
    console.error('Error extracting data from image:', error);
    throw new Error(`Failed to extract data: ${error.message}`);
  }
};

/**
 * Obtient les instructions spécifiques selon le type de document
 * @param type Type de document
 * @returns Instructions pour l'API
 */
const getInstructionsForType = (type: 'ticket' | 'fuel' | 'mileage'): string => {
  switch (type) {
    case 'ticket':
      return `Extrayez les informations suivantes du ticket de pesée et renvoyez-les au format JSON:
      - ticket_num: numéro du ticket
      - date_entree: date et heure d'entrée
      - date_sortie: date et heure de sortie
      - camion_id: immatriculation du véhicule
      - produit: produit transporté
      - poids_net: poids net en kg (nombre)
      - transporteur: nom de l'entreprise de transport
      - preneur: nom du chauffeur
      - commande_id: numéro de commande
      - fournisseur: nom du fournisseur`;
      
    case 'fuel':
      return `Extrayez les informations suivantes du bon de carburant et renvoyez-les au format JSON:
      - date: date du bon
      - chauffeur: nom du chauffeur
      - telephone: numéro de téléphone s'il est présent
      - camion_id: immatriculation du camion
      - designation: type de carburant (ex: Gasoil)
      - quantite: quantité en litres (nombre)
      - montant: montant en FCFA (nombre)`;
      
    case 'mileage':
      return `Extrayez le kilométrage affiché sur ce compteur de véhicule et renvoyez-le au format JSON:
      - kilometer: nombre de kilomètres affiché (nombre entier)`;
      
    default:
      return 'Extrayez toutes les informations importantes visibles sur cette image et renvoyez-les au format JSON';
  }
};

/**
 * Valide et nettoie les données extraites
 * @param data Données extraites
 * @param type Type de document
 * @returns Données validées et nettoyées
 */
const validateAndCleanData = (data: any, type: 'ticket' | 'fuel' | 'mileage' | 'other'): ExtractionResult => {
  // Conversion des valeurs numériques pour les champs spécifiques
  if (type === 'ticket' && data.poids_net) {
    data.poids_net = parseFloat(String(data.poids_net).replace(/[^\d.-]/g, ''));
  }
  
  if (type === 'fuel') {
    if (data.quantite) {
      data.quantite = parseFloat(String(data.quantite).replace(/[^\d.-]/g, ''));
    }
    if (data.montant) {
      data.montant = parseFloat(String(data.montant).replace(/[^\d.-]/g, ''));
    }
  }
  
  if (type === 'mileage' && data.kilometer) {
    data.kilometer = parseInt(String(data.kilometer).replace(/[^\d]/g, ''));
  }
  
  return data;
};

/**
 * Fonction de fallback pour l'extraction hors ligne
 * @param imageUri URI de l'image
 * @param type Type de document
 * @returns Données extraites partielles
 */
export const extractDataOffline = async (
  imageUri: string,
  type: 'ticket' | 'fuel' | 'mileage'
): Promise<ExtractionResult> => {
  // TODO: Ajouter votre code pour l'extraction des données hors ligne ici
  // Par exemple, vous pourriez utiliser un service de transcription automatique d'images
  // ou une bibliothèque pour le traitement d'images (ex: OpenCV) pour extraire les informations
  // sur le ticket de pesée, le bon de carburant ou le compteur de kilométrage.

  // return ticketData;
  // Implémentation simple pour le mode hors ligne
  // Cette fonction pourrait utiliser des bibliothèques OCR locales
  // pour le moment, elle retourne un objet vide qui sera rempli manuellement
  return {};
};

export default {
  extractDataFromImage,
  extractDataOffline
};