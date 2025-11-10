import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { getDomains } from "../../utils/api";
import { Domain } from "../../types/api";
import { HomeScreenProps } from "../../types/navigation";

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [domains, setDomains] = useState<Domain[]>([]);

  useEffect(() => {
    const fetchDomains = async () => {
      const fetchedDomains = await getDomains();
      setDomains(fetchedDomains);
    };
    fetchDomains();
  }, []);

  const renderDomainItem = ({ item }: { item: Domain }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate("Domain", { domain: item })}
    >
      <Text style={styles.itemTitle}>{item.name}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Domain</Text>
      <FlatList
        data={domains}
        renderItem={renderDomainItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  itemContainer: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemDescription: {
    fontSize: 14,
    color: "#666",
  },
});

export default HomeScreen;
