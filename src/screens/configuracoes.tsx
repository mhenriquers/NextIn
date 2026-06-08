import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext";

const Configuracoes: React.FC = () => {
  const { logout } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Olá configurações</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={logout}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffcf8", // Bege NextIn
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    color: "#000000", // Preto NextIn
    textAlign: "center",
    marginBottom: 40,
  },
  buttonContainer: {
    width: "100%",
  },
  logoutButton: {
    backgroundColor: "#FF3B30", // Vermelho NextIn
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fffcf8",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Configuracoes;
