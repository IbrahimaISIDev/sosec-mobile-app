// src/hooks/useCamera.ts
import { useState, useEffect } from 'react';
import { CameraView } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';

export const useCamera = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraRef, setCameraRef] = useState<CameraView | null>(null);
  const [flashMode, setFlashMode] = useState<"off" | "on">("off");

  useEffect(() => {
    (async () => {
      const { status } = await CameraView.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const toggleFlash = () => {
    setFlashMode(flashMode === "off" ? "on" : "off");
  };

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const photo = await cameraRef.takePictureAsync({ quality: 0.8 });
        
        if (!photo) return null;

        const processedImage = await ImageManipulator.manipulateAsync(
          photo.uri,
          [
            { resize: { width: 1200 } },
            { crop: { originX: 0, originY: 0, width: 1200, height: 800 } }
          ],
          { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
        );
        
        return processedImage;
      } catch (error) {
        console.error('Error taking picture:', error);
        throw error;
      }
    }
    return null;
  };

  return {
    hasPermission,
    cameraRef,
    setCameraRef,
    flashMode,
    toggleFlash,
    takePicture,
  };
};