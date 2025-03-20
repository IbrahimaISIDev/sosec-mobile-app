import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { ExpenseType, InputType } from "../../types/expense.types";
import { RootStackParamList } from "../../types/navigation.types"; // Importez le type
import ExpenseTypeCard from "../../components/expense/ExpenseTypeCard";
import InputTypeOption from "../../components/expense/InputTypeOption";

const ExpenseHomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // Typage explicite
  const [selectedType, setSelectedType] = useState<ExpenseType | null>(null);

  const handleExpenseTypeSelect = (type: ExpenseType) => {
    setSelectedType(type);
  };

  const handleInputTypeSelect = (inputType: InputType) => {
    if (!selectedType) return;

    if (inputType === InputType.MANUAL) {
      navigation.navigate("ManualExpense", { expenseType: selectedType });
    } else {
      navigation.navigate("ScanTicket", {
        returnScreen: "AddExpense",
        expenseType: selectedType,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="wallet-outline" size={24} color="white" />
        <Text style={styles.headerTitle}>Nouvelle Dépense</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>TYPE DE DÉPENSE</Text>

        <View style={styles.expenseTypesContainer}>
          <View style={styles.row}>
            <ExpenseTypeCard
              type={ExpenseType.FUEL}
              title="Carburant"
              icon="flame"
              color="#3498db"
              isSelected={selectedType === ExpenseType.FUEL}
              onSelect={handleExpenseTypeSelect}
            />
            <ExpenseTypeCard
              type={ExpenseType.OIL}
              title="Huile"
              icon="water"
              color="#4CAF50"
              isSelected={selectedType === ExpenseType.OIL}
              onSelect={handleExpenseTypeSelect}
            />
          </View>

          <View style={styles.row}>
            <ExpenseTypeCard
              type={ExpenseType.REPAIRS}
              title="Réparations"
              icon="construct"
              color="#FF9800"
              isSelected={selectedType === ExpenseType.REPAIRS}
              onSelect={handleExpenseTypeSelect}
            />
            <ExpenseTypeCard
              type={ExpenseType.OTHER}
              title="Autres"
              icon="ellipsis-horizontal"
              color="#607D8B"
              isSelected={selectedType === ExpenseType.OTHER}
              onSelect={handleExpenseTypeSelect}
            />
          </View>
        </View>

        {selectedType && (
          <>
            <Text style={styles.sectionTitle}>
              TYPE DE SAISIE DE LA DÉPENSE
            </Text>
            <View style={styles.inputTypeContainer}>
              <InputTypeOption
                type={InputType.MANUAL}
                title="Saisie Manuelle"
                icon="pencil"
                onSelect={handleInputTypeSelect}
              />
              <InputTypeOption
                type={InputType.SCAN}
                title="Scanner reçu"
                icon="camera"
                onSelect={handleInputTypeSelect}
              />
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#0066cc",
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#666",
  },
  expenseTypesContainer: {
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  inputTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ExpenseHomeScreen;
