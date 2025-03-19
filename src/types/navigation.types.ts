import { NavigatorScreenParams } from '@react-navigation/native';
import { ExtractedTicketData } from './ticket.types';

export type RootStackParamList = {
  Home: undefined;
  ScanTicket: undefined;
  ScanResult: { 
    ticketData: ExtractedTicketData;
    imageUri: string;
  };
};