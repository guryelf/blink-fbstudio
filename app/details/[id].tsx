import { useState } from 'react';
import { Button, Image, Platform, ScrollView, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams } from 'expo-router';
import { ProcessingResult } from '../../types';

const API_URL = 'http://localhost:8000'; // Your backend URL

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const processImage = async () => {
    if (!image) return;

    setLoading(true);
    const formData = new FormData();
    const uriParts = image.split('.');
    const fileType = uriParts[uriParts.length - 1];

    formData.append('file', {
      uri: image,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    } as any);

    try {
      const response = await fetch(`${API_URL}/process/${id}`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data: ProcessingResult = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginVertical: 20 }} />}
      {image && <Button title="Process Image" onPress={processImage} disabled={loading} />}
      {loading && <Text>Processing...</Text>}
      {result && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Summary:</Text>
          <Text>{result.summary}</Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>Details:</Text>
          <Text>{JSON.stringify(result.structured, null, 2)}</Text>
        </View>
      )}
    </ScrollView>
  );
}
