import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";

interface CameraProps {
  onCapture: (uri: string) => void;
  onBack: () => void;
}

const CameraComponent: React.FC<CameraProps> = ({ onCapture, onBack }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [isCapturing, setIsCapturing] = useState(false);
  const cameraRef = React.useRef<CameraView>(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        setIsCapturing(true);
        const result = await cameraRef.current.takePictureAsync({
          quality: 0.8,
        });
        setIsCapturing(false);
        if (result) {
          onCapture(result.uri);
        }
      } catch (error) {
        console.error("Error taking picture:", error);
        setIsCapturing(false);
      }
    }
  };

  if (!permission) {
    // Camera permissions are still loading
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0066cc" />
      </View>
    );
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text>Pas d'accès à la caméra</Text>
        <TouchableOpacity
          style={styles.requestButton}
          onPress={requestPermission}
        >
          <Text style={styles.requestButtonText}>Autoriser l'accès</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing="back"
      >
        <View style={styles.overlay}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
              <Ionicons name="arrow-back" size={28} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Scanner Ticket</Text>
          </View>

          <View style={styles.frameContainer}>
            <View style={styles.frame}>
              <Text style={styles.hint}>
                Positionnez le ticket dans le cadre
              </Text>
            </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={takePicture}
              disabled={isCapturing}
            >
              {isCapturing ? (
                <ActivityIndicator size="large" color="white" />
              ) : (
                <View style={styles.captureButtonInner} />
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.flashButton}>
              <Ionicons name="flash" size={28} color="#FFD700" />
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: { flex: 1, width: "100%" },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#0066cc",
  },
  backButton: { marginRight: 16 },
  headerTitle: { color: "white", fontSize: 20, fontWeight: "bold" },
  frameContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  frame: {
    width: "100%",
    aspectRatio: 1,
    borderWidth: 2,
    borderColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },
  hint: {
    color: "#4CAF50",
    fontSize: 18,
    textAlign: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 8,
    borderRadius: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 30,
    paddingTop: 20,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#0066cc",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "white",
  },
  captureButtonInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#0066cc",
  },
  flashButton: { position: "absolute", right: 30 },
  requestButton: {
    backgroundColor: "#0066cc",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  requestButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CameraComponent;