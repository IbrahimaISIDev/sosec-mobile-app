/**
 * Formate une date en chaîne de caractères au format "jour mois année"
 * @param date - L'objet Date à formater
 * @returns La date formatée en français
 */
export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  // Formatter la date en français
  return date.toLocaleDateString('fr-FR', options);
};

/**
 * Formate une heure en chaîne de caractères au format "heure:minute"
 * @param date - L'objet Date à formater
 * @returns L'heure formatée
 */
export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('fr-FR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

/**
 * Formate une date et une heure en chaîne de caractères
 * @param date - L'objet Date à formater
 * @returns La date et l'heure formatées
 */
export const formatDateTime = (date: Date): string => {
  return `${formatDate(date)} à ${formatTime(date)}`;
};