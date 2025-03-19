// src/services/ocrService.ts
import OpenAI from 'openai';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

// Initialisation de l'API OpenAI
const openai = new OpenAI({
  apiKey: 'VOTRE_CLE_API', // À remplacer par votre clé API ou utiliser une variable d'environnement
});

// Fonction pour compresser l'image avant envoi
const compressImage = async (uri: string): Promise<string> => {
  const manipResult = await manipulateAsync(
    uri,
    [{ resize: { width: 1080 } }],
    { compress: 0.7, format: SaveFormat.JPEG }
  );
  return manipResult.uri;
};

export const extractTextFromTicket = async (imageUri: string) => {
  try {
    const compressedUri = await compressImage(imageUri);
    const base64Image = await convertImageToBase64(compressedUri);
    
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Extrais ces informations du ticket: numéro de ticket, date, heure, camion, produit, poids, transporteur, preneur. Retourne les données en format JSON." },
            { type: "image_url", image_url: { url: `data:image/jpeg;base64,${base64Image}` } },
          ],
        },
      ],
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('Erreur lors de l\'extraction du texte:', error);
    throw error;
  }
};

// Fonction pour extraire le kilométrage d'une image de compteur
export const extractKilometerFromImage = async (imageUri: string) => {
  try {
    const compressedUri = await compressImage(imageUri);
    const base64Image = await convertImageToBase64(compressedUri);
    
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Extrais uniquement le kilométrage (nombre) visible sur ce compteur. Retourne seulement le nombre sans texte ni explication." },
            { type: "image_url", image_url: { url: `data:image/jpeg;base64,${base64Image}` } },
          ],
        },
      ],
    });

    const kilometrage = parseFloat(response.choices[0].message.content.trim());
    return isNaN(kilometrage) ? null : kilometrage;
  } catch (error) {
    console.error('Erreur lors de l\'extraction du kilométrage:', error);
    throw error;
  }
};

// Fonction utilitaire pour convertir une image en base64
const convertImageToBase64 = async (imageUri: string): Promise<string> => {
  const response = await fetch(imageUri);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Supprimer le préfixe data:image/jpeg;base64,
      resolve(base64String.replace(/^data:image\/\w+;base64,/, ''));
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};