// src/screens/Home.tsx
import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

// Pegamos a largura da tela do celular para calcular o tamanho dos cards matematicamente
const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 50) / 2; // Divide o espaço igualmente entre os dois cards descontando as margens

export default function Home() {
  return (
    <View style={styles.containerTela}>
      {/* Bloco de Boas-Vindas */}
      <View style={styles.welcomeSection}>
        <Text style={styles.titleText}>Painel Geral</Text>
      </View>

      {/* Grid de Cards (Dashboard) */}
      <View style={styles.gridDashboard}>
        {/* Card 1 */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Aguardando</Text>
          <Text style={[styles.cardValue, { color: "#FF3B30" }]}>14</Text>
          <Text style={styles.cardFooter}>pessoas na fila</Text>
        </View>

        {/* Card 2 */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Tempo Médio</Text>
          <Text style={[styles.cardValue, { color: "#007AFF" }]}>22 min</Text>
          <Text style={styles.cardFooter}>minutos de espera</Text>
        </View>

        {/* Card 3 */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Mesas Ativas</Text>
          <Text style={[styles.cardValue, { color: "#4CD964" }]}>18/25</Text>
          <Text style={styles.cardFooter}>ocupadas agora</Text>
        </View>

        {/* Card 4 */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Atendidos</Text>
          <Text style={[styles.cardValue, { color: "#333" }]}>47</Text>
          <Text style={styles.cardFooter}>clientes hoje</Text>
        </View>
      </View>

      {/* Seção de Destaque: Próximo da Fila */}
      <View style={styles.nextCustomerBox}>
        <Text style={styles.nextLabel}>PRÓXIMO CLIENTE DA FILA</Text>
        <View style={styles.nextInfoRow}>
          <Text style={styles.nextName}>Matheus Henrique</Text>
          <Text style={styles.nextBadge}>Mesa p/ 4</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerTela: {
    flex: 1,
    backgroundColor: "#FAF6EE", // O fundo bege padrão do NextIn
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  welcomeSection: {
    marginBottom: 25,
  },
  titleText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1c1c1e",
    letterSpacing: 0.5,
  },
  subtitleText: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  gridDashboard: {
    flexDirection: "row",
    flexWrap: "wrap", // Força os cards a irem para a linha de baixo quando não couberem
    justifyContent: "space-between",
    gap: 10, // Espaçamento fixo entre as linhas e colunas do grid
    marginBottom: 25,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    // Sombra para iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    // Sombra para Android
    elevation: 2,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#8e8e93",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  cardValue: {
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 6,
  },
  cardFooter: {
    fontSize: 12,
    color: "#aeaeaf",
  },
  nextCustomerBox: {
    width: "100%",
    backgroundColor: "#0d0d0d", // Caixa escura para dar um baita contraste de destaque
    borderRadius: 16,
    padding: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  nextLabel: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#FFD700", // Amarelo/Dourado para dar tom de alerta/prioridade
    letterSpacing: 1,
    marginBottom: 8,
  },
  nextInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nextName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  nextBadge: {
    backgroundColor: "#222",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: "600",
    color: "#FFD700",
    borderWidth: 1,
    borderColor: "#333",
  },
});
