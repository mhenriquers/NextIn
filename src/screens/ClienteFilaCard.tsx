import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";

interface ClienteFilaCardProps {
  posicao: number;
  nome: string;
  pessoas: number;
  tempoEspera: string;
  onChamar: () => void;
  onSentar: () => void;
}

export const ClienteFilaCard: React.FC<ClienteFilaCardProps> = ({
  posicao,
  nome,
  pessoas,
  tempoEspera,
  onChamar,
  onSentar,
}) => {
  // Animação de entrada simples usando valor opaco
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
      {/* Cabeçalho com posição e nome */}
      <View style={styles.header}>
        <Text style={styles.posicao}>{posicao}º</Text>
        <Text style={styles.nome}>{nome}</Text>
      </View>

      {/* Detalhes do grupo e tempo */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Pessoas: {pessoas}</Text>
        <Text style={styles.infoText}>Espera: {tempoEspera}</Text>
      </View>

      {/* Botões de ação */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.chamarButton]}
          onPress={onChamar}
        >
          <Text style={styles.buttonText}>Chamar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.sentarButton]}
          onPress={onSentar}
        >
          <Text style={styles.buttonText}>Sentar</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FAF6EE",
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#0d0d0d",
    shadowColor: "#0d0d0d",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  posicao: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0d0d0d",
    marginRight: 10,
  },
  nome: {
    fontSize: 18,
    color: "#0d0d0d",
  },
  infoContainer: {
    marginBottom: 12,
  },
  infoText: {
    color: "#333",
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  chamarButton: {
    backgroundColor: "#0d0d0d",
  },
  sentarButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#0d0d0d",
  },
  buttonText: {
    color: "#0d0d0d",
    fontWeight: "600",
  },
});
