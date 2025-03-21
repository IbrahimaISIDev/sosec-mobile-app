// src/hooks/useOCR.ts
import { useState } from 'react';
import { processWithOpenAI } from '../api/openaiService';
import { processWithFirebaseML } from '../api/firebase';
import { useNetworkStatus } from './useNetworkStatus';

export const useOCR = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { isConnected } = useNetworkStatus();

  const processImage = async (imageUri: string) => {
    setIsProcessing(true);
    try {
      // First try to use OpenAI for better extraction if online
      if (isConnected) {
        const result = await processWithOpenAI(imageUri);
        setIsProcessing(false);
        return result;
      } else {
        // Fallback to Firebase ML for offline processing
        const result = await processWithFirebaseML(imageUri);
        setIsProcessing(false);
        return result;
      }
    } catch (error) {
      setIsProcessing(false);
      console.error('OCR processing error:', error);
      throw error;
    }
  };

  const extractData = async (ocrResult: any, documentType: 'mileage' | 'ticket') => {
    try {
      // Process different types of documents
      if (documentType === 'mileage') {
        // Extract kilometer reading, license plate etc.
        const kilometer = extractKilometer(ocrResult);
        const licensePlate = extractLicensePlate(ocrResult);
        
        return {
          kilometer,
          licensePlate,
          date: new Date().toISOString(),
        };
      } else if (documentType === 'ticket') {
        // Extract ticket data
        // This would be implemented for ticket processing
        return {};
      }
    } catch (error) {
      console.error('Data extraction error:', error);
      throw error;
    }
  };

  // Helper function to extract kilometer reading using regex
  const extractKilometer = (ocrText: string) => {
    // Looking for number patterns that might represent a meter reading
    const kmRegex = /(\d{1,3}[ .,]?){1,3}\d{1,3}\s*(?:km|KM)?/gi;
    const matches = ocrText.match(kmRegex);
    
    if (matches && matches.length > 0) {
      // Clean up the extracted value
      return matches[0].replace(/[^\d]/g, '');
    }
    
    return '';
  };

  // Helper function to extract license plate
  const extractLicensePlate = (ocrText: string) => {
    // This pattern should be adapted to the license plate format in your country
    const plateRegex = /([A-Z]{2}\s?[0-9]{3,4}\s?[A-Z]{2})|([0-9]{1,4}\s?[A-Z]{1,3}\s?[0-9]{1,2})/g;
    const matches = ocrText.match(plateRegex);
    
    if (matches && matches.length > 0) {
      return matches[0].replace(/\s/g, ' ');
    }
    
    return '';
  };

  return {
    isProcessing,
    processImage,
    extractData,
  };
};