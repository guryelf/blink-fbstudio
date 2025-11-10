import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { ResultScreenProps } from "../../types/navigation";

const ResultScreen: React.FC<ResultScreenProps> = ({ route }) => {
  const { data } = route.params;

  const renderJson = (obj: any) => {
    return <Text style={styles.jsonText}>{JSON.stringify(obj, null, 2)}</Text>;
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Result</Text>
      <View style={styles.jsonContainer}>{renderJson(data)}</View>
    </ScrollView>
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
  jsonContainer: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    borderRadius: 8,
  },
  jsonText: {
    fontFamily: "monospace",
    fontSize: 14,
  },
});

export default ResultScreen;
