import { NavigatorScreenParams } from "@react-navigation/native";
import { NavigationProp as RNNavigationProp } from "@react-navigation/native";
import { ExtractedTicketData } from "./ticket.types";

export type RootStackParamList = {
  Home: undefined;
  TruckScreen: undefined;
  ScanTicket: undefined;
  ReportProblem: { truckId?: string };
  ScanResult: {
    ticketData: ExtractedTicketData;
    imageUri: string;
  };
};


export type NavigationProp = RNNavigationProp<RootStackParamList>;
