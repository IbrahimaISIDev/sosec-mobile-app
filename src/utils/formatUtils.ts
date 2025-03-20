// src/utils/formatUtils.ts

/**
 * Interface définissant les utilitaires de formatage
 */
export interface FormatUtils {
  formatDate: (date: Date | string | number | null) => string;
  formatCurrency: (amount: number) => string;
  formatNumber: (num: number) => string;
  formatKilometers: (km: number) => string;
  formatFuelConsumption: (consumption: number) => string;
}

/**
 * Implémentation des utilitaires de formatage
 */
export const formatUtils: FormatUtils = {
  formatDate: (date: Date | string | number | null): string => {
    if (!date) return "N/A";
    const dateObj = typeof date === "string" ? new Date(date) : new Date(date);
    return dateObj.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  },

  formatCurrency: (amount: number): string => {
    return amount.toLocaleString("fr-FR", {
      style: "currency",
      currency: "Franc CFA",
      maximumFractionDigits: 0,
    });
  },

  formatNumber: (num: number): string => {
    return num.toLocaleString("fr-FR");
  },

  formatKilometers: (km: number): string => {
    return `${km.toLocaleString("fr-FR")} km`;
  },

  formatFuelConsumption: (consumption: number): string => {
    return `${consumption.toFixed(1)}L/100km`;
  },
};

// Exportations individuelles pour une utilisation flexible
export const {
  formatDate,
  formatCurrency,
  formatNumber,
  formatKilometers,
  formatFuelConsumption,
} = formatUtils;
