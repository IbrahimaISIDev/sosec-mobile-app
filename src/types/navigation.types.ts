import { NavigatorScreenParams } from "@react-navigation/native";
import { NavigationProp as RNNavigationProp } from "@react-navigation/native";
import { ExtractedTicketData } from "./ticket.types";
import { ExpenseType } from './expense.types';

export type RootStackParamList = {
  Home: undefined;
  TruckScreen: undefined;
  // ScanTicket: undefined;
  ExpenseHome: undefined;
  ManualExpense: { expenseType: ExpenseType };
  ScanTicket: { returnScreen: string; expenseType: ExpenseType }; 
  AddExpense: undefined;


  ReportProblem: { truckId?: string };
  ScanResult: {
    ticketData: ExtractedTicketData;
    imageUri: string;
  };
};


export type NavigationProp = RNNavigationProp<RootStackParamList>;
