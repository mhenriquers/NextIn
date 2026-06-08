import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomModal from "../components/CustomModal";
import FormNovoCliente from "../components/FormNovoCliente";
import ClienteDetalhesModal from "../components/ClienteDetalhesModal";
import { useFila } from "../context/FilaContext";

interface ClienteFila {
  id: string;
  nome: string;
  pessoas: number;
  whatsapp: string;
  observacoes: string;
  posicao: number;
  horaChegada: number;
}

const MOCK_DATA: ClienteFila[] = [
  {
    id: "1",
    nome: "João Silva",
    pessoas: 2,
    whatsapp: "11999999999",
    observacoes: "Mesa externa",
    posicao: 1,
    horaChegada: Date.now() - 600000,
  },
  {
    id: "2",
    nome: "Maria Souza",
    pessoas: 4,
    whatsapp: "11888888888",
    observacoes: "Cadeira de bebê",
    posicao: 2,
    horaChegada: Date.now() - 300000,
  },
];

export default function Fila() {
  const { fila, adicionarCliente, removerCliente } = useFila();
  const [modalVisible, setModalVisible] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] =
    useState<ClienteFila | null>(null);
  const [modalDetalhesVisivel, setModalDetalhesVisivel] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const calcularTempoEspera = (horaChegada: number) => {
    const diff = Math.floor((Date.now() - horaChegada) / 1000);
    const min = Math.floor(diff / 60);
    const seg = diff % 60;
    return `${min} min ${seg} seg`;
  };

  const handleChamar = (cliente: ClienteFila) => {
    Alert.alert("Chamar Cliente", `Chamando ${cliente.nome} para a mesa.`);
  };

  const handleSentar = (id: string) => {
    removerCliente(id);
  };

  const handleAdicionarCliente = (dados: {
    nome: string;
    pessoas: number;
    whatsapp: string;
    observacoes: string;
  }) => {
    const novo: ClienteFila = {
      ...dados,
      id: Math.random().toString(36),
      posicao: fila.length + 1,
      horaChegada: Date.now(),
    };
    adicionarCliente(novo);
    setModalVisible(false);
  };

  const handleAbrirDetalhes = (cliente: ClienteFila) => {
    setClienteSelecionado(cliente);
    setModalDetalhesVisivel(true);
  };

  const renderCliente = ({ item }: { item: ClienteFila }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleAbrirDetalhes(item)}
    >
      <View style={styles.posicaoBox}>
        <Text style={styles.posicaoText}>{item.posicao}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.nome}>
          {item.nome} ({item.pessoas} pessoas)
        </Text>
        <Text style={styles.tempo}>
          {calcularTempoEspera(item.horaChegada)}
        </Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleChamar(item)}>
          <Text style={styles.btn}>Chamar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSentar(item.id)}>
          <Text style={styles.btn}>Sentar</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={fila}
        renderItem={renderCliente}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        <FormNovoCliente
          onSubmit={(dados) => {
            console.log("onSubmit chamado com:", dados);
            handleAdicionarCliente(dados);
          }}
          onCancel={() => setModalVisible(false)}
        />
      </CustomModal>
      <ClienteDetalhesModal
        visible={modalDetalhesVisivel}
        cliente={clienteSelecionado}
        onClose={() => setModalDetalhesVisivel(false)}
        onChamar={() => handleChamar(clienteSelecionado!)}
        onSentar={() => handleSentar(clienteSelecionado!.id)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f4f4" },
  card: {
    flexDirection: "row",
    padding: 15,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
  },
  posicaoBox: {
    width: 40,
    height: 40,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  posicaoText: { color: "#fff", fontWeight: "bold" },
  info: { flex: 1, marginLeft: 15 },
  nome: { fontSize: 16, fontWeight: "bold" },
  tempo: { color: "red", fontSize: 12 },
  actions: { flexDirection: "row", gap: 10 },
  btn: { color: "#000", fontWeight: "bold" },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: "#000",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  fabText: { color: "#fff", fontSize: 30 },
});
