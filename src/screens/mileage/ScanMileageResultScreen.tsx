// src/screens/mileage/ScanMileageScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useNavigation, NavigationProp as NavProp } from "@react-navigation/native";
import { useCamera } from "../../hooks/useCamera";
import { CameraView } from "expo-camera";
import Icon from "react-native-vector-icons/Ionicons";

// Define navigation prop type
type NavigationProp = NavProp<any>;

// Camera ref type
type CameraRef = CameraView | null;

const ScanMileageScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const {
    hasPermission,
    cameraRef,
    setCameraRef,
    flashMode,
    toggleFlash,
    takePicture,
  } = useCamera();
  const [loading, setLoading] = useState(false);

  const handleCapture = async () => {
    setLoading(true);
    try {
      const photo = await takePicture();
      if (photo?.uri) {
        navigation.navigate("ScanMileageResult", { photoUri: photo.uri });
      }
    } catch (error) {
      console.error("Error capturing image:", error);
    } finally {
      setLoading(false);
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.loadingContainer}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scanner Kilométrage</Text>
      </View>

      {/* Camera Component */}
      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          facing="back"
          flash={flashMode === "on" ? "on" : "off"}
          ref={(ref: CameraRef) => setCameraRef(ref)}
        />
        <View style={styles.overlay}>
          <View style={styles.frameBorder}>
            <Text style={styles.guideText}>
              Positionnez le compteur dans le cadre
            </Text>
          </View>
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={styles.captureButton}
          onPress={handleCapture}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="large" />
          ) : (
            <View style={styles.captureButtonInner} />
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.flashButton} onPress={toggleFlash}>
          <Icon
            name={flashMode === "on" ? "flash" : "flash-off"}
            size={24}
            color="#FFD700"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#0066CC",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  cameraContainer: {
    flex: 1,
    position: "relative",
  },
  camera: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  frameBorder: {
    width: "90%",
    height: "60%",
    borderWidth: 2,
    borderColor: "#4CAF50",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  guideText: {
    color: "#4CAF50",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  controlsContainer: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#0066CC",
    borderWidth: 5,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButtonInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#0066CC",
  },
  flashButton: {
    position: "absolute",
    right: 40,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ScanMileageScreen;