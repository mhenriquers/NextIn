import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Fila() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.texto}>Olá fila</Text>
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

  texto: {
    fontSize: 24,
    fontWeight: "bold",
    top: 10,
    color: "#000",
  },
});
