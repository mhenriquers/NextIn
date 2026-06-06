import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Olá Home</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF6EE",
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    color: "#000",
    fontSize: 24,
    fontWeight: "bold",
  },
});
