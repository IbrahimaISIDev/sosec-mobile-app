import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { useSyncContext } from "../../contexts/SyncContext";
import { useAuth } from "../../hooks/useAuth";
import Header from "../../components/common/Header";
import MenuCard from "../../components/home/MenuCard";
import TaskItem from "../../components/home/TaskItem";
import SyncStatus from "../../components/home/SyncStatus";
import { formatDate } from "../../utils/dateUtils";

type TaskStatus = "todo" | "inprogress" | "completed";

interface Task {
  id: string;
  icon: string; // Nom de l'icône pour react-native-vector-icons
  title: string;
  description: string;
  status: TaskStatus;
}

const HomeScreen = () => {
  const { user, truck } = useAuth();
  const { syncStatus, lastSyncTime } = useSyncContext();
  const navigation = useNavigation();
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    const today = new Date();
    setCurrentDate(formatDate(today));
  }, []);

  const handleNavigate = (screen: string) => {
    alert(
      `Navigation vers l'écran ${screen} - Cette fonctionnalité sera disponible prochainement.`
    );

    navigation.navigate(screen as never);
  };

  const tasks: Task[] = [
    {
      id: "1",
      icon: "camera-outline",
      title: "Scanner le compteur",
      description: "À faire avant départ",
      status: "todo",
    },
    {
      id: "2",
      icon: "document-outline",
      title: "Scanner tickets",
      description: "À faire après chaque course",
      status: "todo",
    },
    {
      id: "3",
      icon: "cash-outline",
      title: "Enregistrer les dépenses",
      description: "Carburant, péages et maintenance",
      status: "completed",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header
        userName={user?.displayName || "Utilisateur"}
        truckId={truck?.licensePlate || "Non assigné"}
        date={currentDate}
      />

      <ScrollView style={styles.content}>
        <View style={styles.menuContainer}>
          <MenuCard
            title="Scanner ticket"
            icon="camera"
            backgroundColor="#003366"
            onPress={() => handleNavigate("ScanTicket")}
          />
          <MenuCard
            title="Kilométrage"
            icon="speedometer"
            backgroundColor="#4682B4"
            onPress={() => handleNavigate("ScanMileage")}
          />
          <MenuCard
            title="Dépenses"
            icon="wallet"
            backgroundColor="#EAEAEA"
            textColor="#0066CC"
            onPress={() => handleNavigate("Expense")}
          />
          <MenuCard
            title="Alertes"
            icon="warning"
            backgroundColor="#FF8C00"
            onPress={() => handleNavigate("Alerts")}
          />
        </View>

        <View style={styles.taskSection}>
          <Text style={styles.sectionTitle}>Tâches d'aujourd'hui</Text>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              icon={task.icon}
              title={task.title}
              description={task.description}
              status={task.status}
              onPress={() => {
                if (task.id === "1") handleNavigate("ScanMileage");
                if (task.id === "2") handleNavigate("ScanTicket");
                if (task.id === "3") handleNavigate("Expense");
                if (task.id === "4") handleNavigate("Alerts");
              }}
            />
          ))}
        </View>
      </ScrollView>

      <SyncStatus
        status={syncStatus}
        lastSync={lastSyncTime ?? "Aucune synchronisation"}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  menuContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  taskSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333333",
  },
});

export default HomeScreen;
