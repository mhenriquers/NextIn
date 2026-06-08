import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

interface ClienteFila {
  id: string;
  posicao: number;
  nome: string;
  pessoas: number;
  whatsapp: string;
  observacoes: string;
  horaChegada: number;
}

interface ClienteDetalhesModalProps {
  visible: boolean;
  cliente: ClienteFila | null;
  onClose: () => void;
  onSentar: () => void;
}

const calcularTempoEspera = (horaChegada: number): string => {
  const agora = Date.now();
  const diff = Math.max(0, agora - horaChegada);
  const minutos = Math.floor(diff / 60000);
  const segundos = Math.floor((diff % 60000) / 1000);
  return `${minutos} min ${segundos} seg`;
};

const InfoCard = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <View style={styles.infoCard}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

export const ClienteDetalhesModal: React.FC<ClienteDetalhesModalProps> = ({
  visible,
  cliente,
  onClose,
  onChamar, // ✅ ADICIONE ISSO
  onSentar,
}) => {
  const handleSentarClick = () => {
    onSentar();
    onClose();
  };

  if (!cliente) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Detalhes do Cliente</Text>
          <ScrollView>
            <InfoCard label="Nome" value={cliente.nome} />
            <InfoCard label="Pessoas" value={cliente.pessoas} />
            <InfoCard
              label="Tempo de Espera"
              value={calcularTempoEspera(cliente.horaChegada)}
            />
          </ScrollView>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#4CD964" }]}
            onPress={onChamar}
          >
            <Text style={styles.buttonText}>Chamar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSentarClick}>
            <Text style={styles.buttonText}>Sentar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  container: {
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
  infoCard: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  label: { fontSize: 12, color: "#666" },
  value: { fontSize: 16, fontWeight: "600" },
  button: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "white", fontWeight: "bold" },
  closeButton: { marginTop: 10, alignItems: "center" },
});
export default ClienteDetalhesModal;
