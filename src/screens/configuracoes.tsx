import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useAuth } from "../context/AuthContext";
import { Login } from "./login";

export default function Configuracoes({ navigation }: { navigation: any }) {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            logout();
          }}
        >
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.texto}>Olá configurações</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#911",
    padding: 10,
    borderRadius: 5,
    position: "absolute",
    top: 50,
    right: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  texto: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
});
