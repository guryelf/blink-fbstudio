import React, { useState } from "react";
import { View, Text, Button, Image, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { DomainScreenProps } from "../../types/navigation";
import { processImage } from "../../utils/api";
import { useCredits } from "../../context/CreditsContext";

const DomainScreen: React.FC<DomainScreenProps> = ({ route, navigation }) => {
  const { domain } = route.params;
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { credits, removeCredits } = useCredits();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Sorry, we need camera roll permissions to make this work!"
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleProcessImage = async () => {
    if (!image) {
      Alert.alert("No Image", "Please select an image first.");
      return;
    }
    if (credits === 0) {
      Alert.alert("No Credits", "You have no credits left.");
      return;
    }

    setLoading(true);
    try {
      const data = await processImage(image, domain);
      removeCredits(1);
      navigation.navigate("Result", { data });
    } catch (error) { 
      Alert.alert("Error", "Failed to process image. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{domain.name}</Text>
      <Text style={styles.description}>{domain.description}</Text>

      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}

      <View style={styles.buttonContainer}>
        <Button
          title={loading ? "Processing..." : "Process Image"}
          onPress={handleProcessImage}
          disabled={!image || loading}
        />
      </View>

      <Text style={styles.credits}>Credits: {credits}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    color: "#666",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginVertical: 16,
  },
  buttonContainer: {
    marginTop: 16,
  },
  credits: {
    position: "absolute",
    top: 16,
    right: 16,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DomainScreen;
