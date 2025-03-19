// services/ticketService.ts
import { ExtractedTicketData, Ticket } from '../types/ticket.types';
import { v4 as uuidv4 } from 'uuid';

// Fonction pour extraire les données d'un ticket à partir d'une image
// Dans un cas réel, cette fonction enverrait l'image à l'API OpenAI
export const extractTicketData = async (imageUri: string): Promise<ExtractedTicketData> => {
  // Simuler un délai d'appel API
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Données factices pour l'exemple
  return {
    ticket_num: '250395',
    date_entree: '13/01/2025 - 16:44',
    date_sortie: '13/01/2025 - 17:44',
    camion_id: 'AA 883 TQ',
    produit: 'Acide Phosphorique',
    poids_net: 40300,
    chauffeur: 'Assane Fall'
  };
};

// Fonction pour enregistrer un ticket dans la base de données locale
// et le synchroniser avec Firebase quand une connexion est disponible
export const saveTicket = async (ticketData: ExtractedTicketData & { image_url: string }): Promise<void> => {
  // Simuler un délai de sauvegarde
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const ticket: Ticket = {
    id: uuidv4(),
    ticket_num: ticketData.ticket_num,
    date_entree: ticketData.date_entree,
    date_sortie: ticketData.date_sortie,
    camion_id: ticketData.camion_id,
    produit: ticketData.produit,
    poids_net: ticketData.poids_net,
    transporteur: 'SOSEC', // Valeur par défaut ou à extraire
    chauffeur: ticketData.chauffeur,
    image_url: ticketData.image_url
  };
  
  // Dans une implémentation réelle, ici on enregistrerait le ticket dans SQLite
  console.log('Ticket saved:', ticket);
  
  // Et on vérifierait si une connexion est disponible pour synchroniser avec Firebase
  // ...
  
  return;
};