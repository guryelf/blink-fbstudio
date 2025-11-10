import { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Domain } from '../types';

export default function HomeScreen() {
  const [domains, setDomains] = useState<Domain[]>([]);
  const router = useRouter();

  useEffect(() => {
    // In a real app, you'd fetch this from your backend
    const fetchedDomains: Domain[] = [
      {
        id: 'product_seo',
        name: 'Product SEO',
        description: 'Generate SEO-friendly product descriptions and keywords.',
        endpoint: 'product_seo',
      },
      {
        id: 'receipt_ocr',
        name: 'Receipt OCR',
        description: 'Extract information from receipts using OCR.',
        endpoint: 'receipt_ocr',
      },
      {
        id: 'caption_hashtag',
        name: 'Caption & Hashtag',
        description: 'Generate engaging captions and relevant hashtags for your images.',
        endpoint: 'caption_hashtag',
      },
    ];
    setDomains(fetchedDomains);
  }, []);

  const handlePress = (id: string) => {
    router.push(`/details/${id}`);
  };

  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <FlatList
        data={domains}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item.id)} style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
            <Text style={{ fontSize: 14, color: 'gray' }}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
