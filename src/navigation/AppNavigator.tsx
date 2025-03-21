import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";

// Import screens
import HomeScreen from "../screens/home/HomeScreen";
import ScanTicketScreen from "../screens/scan/ScanTicketScreen";
import ScanResultScreen from "../screens/scan/ScanResultScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import HistoryScreen from "../screens/history/HistoryScreen";
import ExpenseHomeScreen from "../screens/expense/ExpenseHomeScreen";
import ManualExpenseScreen from "../screens/expense/ManualExpenseScreen";
// Mileage screens
import ScanMileageScreen from "../screens/mileage/ScanMileageScreen";
import ScanMileageResultScreen from "../screens/mileage/ScanMileageResultScreen";
// import ScanMileageScreen from "../screens/mileage/ScanMileageScreen";
// import ExpenseScreen from "../screens/expense/ExpenseScreen";
// import AddExpenseScreen from "../screens/expense/AddExpenseScreen";
// import AlertsScreen from "../screens/alerts/AlertsScreen";
// import ProfileScreen from "../screens/profile/ProfileScreen";
import TruckScreen from "../screens/truck/TruckScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack navigators for each main section
const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeMain" component={HomeScreen} />
    <Stack.Screen name="ScanTicket" component={ScanTicketScreen} />
    <Stack.Screen name="ScanResult" component={ScanResultScreen} />
    {/* <Stack.Screen name="ScanMileage" component={ScanMileageScreen} />
    <Stack.Screen name="Expense" component={ExpenseScreen} />
    <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
    <Stack.Screen name="Alerts" component={AlertsScreen} /> */}
    <Stack.Screen name="ExpenseHome" component={ExpenseHomeScreen} />
    <Stack.Screen name="ManualExpense" component={ManualExpenseScreen} />
  </Stack.Navigator>
);

const TruckStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="TruckMain" component={TruckScreen} />
  </Stack.Navigator>
);

const HistoryStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HistoryMain" component={HistoryScreen} />
  </Stack.Navigator>
);
const MileageStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ScanMileage" component={ScanMileageScreen} />
    <Stack.Screen
      name="ScanMileageResult"
      component={ScanMileageResultScreen}
    />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ProfileMain" component={ProfileScreen} />
  </Stack.Navigator>
);

// const AlertsStack = () => (
//   <Stack.Navigator screenOptions={{ headerShown: false }}>
//     <Stack.Screen name="Alerts" component={AlertsScreen} />
//   </Stack.Navigator>
// );

// Mapping des icônes pour chaque route
const ICON_MAPPING: Record<string, { active: string; inactive: string }> = {
  Accueil: { active: "home", inactive: "home-outline" },
  Camion: { active: "car", inactive: "car-outline" },
  Historique: { active: "list", inactive: "list-outline" },
  Profil: { active: "person", inactive: "person-outline" },
};

// Main tab navigator
const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          // Récupérer les icônes depuis le mapping ou utiliser une icône par défaut
          const icons = ICON_MAPPING[route.name] || {
            active: "help-circle",
            inactive: "help-circle-outline",
          };
          const iconName = focused ? icons.active : icons.inactive;

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#0066CC",
        tabBarInactiveTintColor: "#999999",
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen name="Accueil" component={HomeStack} />
      <Tab.Screen name="Camion" component={TruckStack} />
      <Tab.Screen name="Historique" component={HistoryStack} />
      <Tab.Screen
        name="MileageTab"
        component={MileageStack}
        options={{ title: "Kilométrage" }}
      />
      {/* <Tab.Screen
        name="AlertsTab"
        component={AlertsStack}
        options={{ title: "Alertes" }}
      /> */}
      <Tab.Screen name="Profil" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default AppNavigator;

// const AppNavigator = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;

//           if (route.name === "ScanTab") {
//             iconName = focused ? "camera" : "camera-outline";
//           } else if (route.name === "MileageTab") {
//             iconName = focused ? "speedometer" : "speedometer-outline";
//           } else if (route.name === "AlertsTab") {
//             iconName = focused ? "notifications" : "notifications-outline";
//           }

//           return <Icon name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: "#0066CC",
//         tabBarInactiveTintColor: "gray",
//         headerShown: false,
//       })}
//     >
//     </Tab.Navigator>
//   );
// };

// export default AppNavigator;
