// src/services/ocrService.ts
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "votre-clé-api", // À remplacer par votre clé API
});

export const extractDataFromImage = async (imageUri: string): Promise<any> => {
  try {
    // Convertir l'image en base64
    const base64Image = await convertImageToBase64(imageUri);

    // Appel à l'API OpenAI Vision
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Extrais les informations suivantes de ce ticket : numéro de ticket, date, immatriculation du véhicule, produit, poids net, transporteur, chauffeur. Retourne un objet JSON structuré.",
            },
            {
              type: "image_url",
              image_url: { url: `data:image/jpeg;base64,${base64Image}` },
            },
          ],
        },
      ],
      max_tokens: 1000,
    });

    // Extraire la réponse JSON
    const content = response.choices[0].message.content;
    try {
      return JSON.parse(content);
    } catch (error) {
      console.error("Erreur de parsing JSON:", error);
      return { error: "Format non reconnu", rawContent: content };
    }
  } catch (error) {
    console.error("Erreur OpenAI:", error);
    return { error: "Échec de l'extraction" };
  }
};

// Fonction pour convertir une image en base64
const convertImageToBase64 = async (uri: string): Promise<string> => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // Enlever le préfixe 'data:image/jpeg;base64,'
        resolve(base64String.split(",")[1]);
        resolve(base64String.replace(/^data:image\/\w+;base64,/, ""));
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Erreur de conversion en base64:", error);
    throw error;
  }
};
