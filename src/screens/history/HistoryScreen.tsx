// src/screens/history/HistoryScreen.tsx
import React, { useState, useEffect } from "react";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Header from "../../components/common/Header";
import { HistoryFilters } from "../../components/history/HistoryFilters";
import { HistoryList } from "../../components/history/HistoryList";
import { HistoryTabs } from "../../components/history/HistoryTabs";
import { useFirestore } from "../../hooks/useFirestore";
import { useAuth } from "../../hooks/useAuth";
import { HistoryItem } from "../../types/history.types";

// Typage pour la navigation (ajustez selon votre stack)
type RootStackParamList = {
  History: undefined;
  // Ajoutez d'autres écrans si nécessaire
};
type HistoryScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "History"
>;

const HistoryScreen: React.FC = () => {
  const navigation = useNavigation<HistoryScreenNavigationProp>();
  const { user, loading: authLoading } = useAuth();
  const { getHistoryItems } = useFirestore();

  const [activeTab, setActiveTab] = useState<
    "Tous" | "Tickets" | "Dépenses" | "Kilométrage"
  >("Tous");
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<HistoryItem[]>([]);
  const [filters, setFilters] = useState({
    startDate: null as Date | null,
    endDate: null as Date | null,
    types: [] as string[],
    minAmount: null as number | null,
    maxAmount: null as number | null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadHistoryItems();
    }
  }, [user]);

  useEffect(() => {
    applyFilters();
  }, [historyItems, filters, activeTab]);

  const loadHistoryItems = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const items = await getHistoryItems(user.id);
    } catch (error) {
      console.error(
        "Erreur lors du chargement des éléments d’historique:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...historyItems];

    // Filtre par type d'onglet
    if (activeTab !== "Tous") {
      filtered = filtered.filter((item) => {
        if (activeTab === "Tickets") return item.category === "ticket";
        if (activeTab === "Dépenses") return item.category === "expense";
        if (activeTab === "Kilométrage") return item.category === "mileage";
        return true;
      });
    }

    // Filtre par date
    filtered = filtered.filter((item) => {
      const itemDate = new Date(item.date);
      if (filters.startDate && itemDate < filters.startDate) return false;
      if (filters.endDate && itemDate > filters.endDate) return false;
      return true;
    });

    // Filtre par types spécifiques
    if (filters.types.length > 0) {
      filtered = filtered.filter((item) => filters.types.includes(item.type));
    }

    // Filtre par montant
    filtered = filtered.filter((item) => {
      if (
        filters.minAmount !== null &&
        (item.amount === undefined || item.amount < filters.minAmount)
      )
        return false;
      if (
        filters.maxAmount !== null &&
        (item.amount === undefined || item.amount > filters.maxAmount)
      )
        return false;
      return true;
    });

    setFilteredItems(filtered);
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab);
  };

  if (authLoading || loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Chargement...</Text>
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Veuillez vous connecter pour voir l’historique</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Historique" showBackButton />
      <HistoryTabs activeTab={activeTab} onTabChange={handleTabChange} />
      <HistoryFilters
        onFilterChange={handleFilterChange}
        currentFilters={filters}
      />
      <HistoryList items={filteredItems} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});

export default HistoryScreen;
