// src/screens/truck/TruckScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFirestore } from "../../hooks/useFirestore";
import { useAuth } from "../../hooks/useAuth";
import Header from "../../components/common/Header";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/common/Button";
import { ServiceAlert } from "../../components/mileage/ServiceAlert";
import { TruckData } from "../../types/truck.types";
import { formatDate, formatCurrency } from "../../utils/formatUtils";
import { NavigationProp } from '../../types/navigation.types';

const TruckScreen: React.FC = () => {
  const [truckData, setTruckData] = useState<TruckData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { getTruckById, getLastFuelingForTruck } = useFirestore();
  const { user } = useAuth();
//   const navigation = useNavigation();
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const fetchTruckData = async () => {
      if (user?.truckAssigned) {
        try {
          const truck = await getTruckById(user.truckAssigned);
          const lastFueling = await getLastFuelingForTruck(user.truckAssigned);
          if (truck) {
            setTruckData({
              ...truck,
              lastFueling: lastFueling
                ? {
                    date: lastFueling.date,
                    amount: lastFueling.amount,
                    liters: lastFueling.liters,
                  }
                : undefined,
            });
          }
        } catch (error) {
          console.error(
            "Erreur lors du chargement des données du camion:",
            error
          );
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTruckData();
  }, [user]);

  const handleReportProblem = () => {
    navigation.navigate("ReportProblem", { truckId: user?.truckAssigned });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  if (!truckData) {
    return (
      <View style={styles.container}>
        <Text>Aucun camion assigné</Text>
      </View>
    );
  }

  const nextServiceKm = truckData.nextServiceKm - truckData.currentKm;
  const isServiceSoon = nextServiceKm <= 1000;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Camion" />
      <ScrollView style={styles.container}>
        <View style={styles.contentContainer}>
          <Card>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Informations du camion</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>À jour</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Kilométrage actuel</Text>
              <Text style={styles.infoValue}>
                {truckData.currentKm.toLocaleString()} km
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Prochaine vidange</Text>
              <Text
                style={[
                  styles.infoValue,
                  isServiceSoon ? styles.warningText : {},
                ]}
              >
                Dans {nextServiceKm.toLocaleString()} km
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Dernière maintenance</Text>
              <Text style={styles.infoValue}>
                {formatDate(truckData.lastServiceDate)}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Immatriculation</Text>
              <Text style={styles.infoValue}>{truckData.licensePlate}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Type</Text>
              <Text style={styles.infoValue}>{truckData.model}</Text>
            </View>
          </Card>

          <Card>
            <Text style={styles.cardTitle}>Consommation de carburant</Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Consommation moyenne</Text>
              <Text style={styles.infoValue}>
                {truckData.fuelEfficiency}L/100km
              </Text>
            </View>

            {truckData.lastFueling && (
              <>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Dernier plein</Text>
                  <Text style={styles.infoValue}>
                    {formatDate(truckData.lastFueling.date)}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Montant</Text>
                  <Text style={styles.infoValue}>
                    {formatCurrency(truckData.lastFueling.amount)}
                  </Text>
                </View>
              </>
            )}
          </Card>

          {isServiceSoon && <ServiceAlert remainingKm={nextServiceKm} />}

          <Button
            title="Signaler un problème"
            onPress={handleReportProblem}
            style={styles.reportButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  statusBadge: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  infoLabel: {
    fontSize: 16,
    color: "#757575",
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "600",
  },
  warningText: {
    color: "#FF9800",
  },
  reportButton: {
    marginTop: 24,
    backgroundColor: "#1976D2",
  },
});

export default TruckScreen;
