import * as ImagePicker from "expo-image-picker";

export const checkPermission = async () => {
  const mediaPermissionResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  const cameraPermissionResult =
    await ImagePicker.requestCameraPermissionsAsync();

  if (!mediaPermissionResult.granted || !cameraPermissionResult.granted) {
    alert("You've refused to allow this app to access your photos!");
    return;
  }
};
