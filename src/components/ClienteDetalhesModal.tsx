import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  ScrollView,
  Animated,
  Linking,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ClienteFila } from "../context/FilaContext";
import { formatarTelefone } from "./PhoneValidator";

// ---------------------------------------------------------------- Paleta
const C = {
  fundo: "#F6F4EF",
  superficie: "#FFFFFF",
  borda: "#ECE8DF",
  texto: "#111111",
  textoSuave: "#6B6B6B",
  textoFraco: "#A3A3A3",
  marca: "#16213E",
  primaria: "#3E6EFF",
  sucesso: "#2FBF71",
  alerta: "#F5A524",
  perigo: "#E5484D",
  whatsapp: "#25D366",
};

type IconName = React.ComponentProps<typeof Ionicons>["name"];

interface ClienteDetalhesModalProps {
  visible: boolean;
  cliente: ClienteFila | null;
  onClose: () => void;
  onChamar: () => void;
  onSentar: () => void;
}

// ---------------------------------------------------------------- Utilitários
function formatarEspera(ms: number) {
  const totalSeg = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(totalSeg / 3600);
  const m = Math.floor((totalSeg % 3600) / 60);
  const s = totalSeg % 60;
  const dois = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${dois(m)}:${dois(s)}` : `${dois(m)}:${dois(s)}`;
}

function formatarHora(timestamp: number) {
  const d = new Date(timestamp);
  return `${String(d.getHours()).padStart(2, "0")}:${String(
    d.getMinutes(),
  ).padStart(2, "0")}`;
}

// Mesma regra da Home: verde até 15 min, amarelo até 30, vermelho acima
function corEspera(ms: number) {
  const min = ms / 60000;
  if (min <= 15) return C.sucesso;
  if (min <= 30) return C.alerta;
  return C.perigo;
}

// ---------------------------------------------------------------- Bloco de informação
function Info({
  icone,
  rotulo,
  valor,
  cor,
}: {
  icone: IconName;
  rotulo: string;
  valor: string;
  cor?: string;
}) {
  return (
    <View style={styles.info}>
      <View style={styles.infoTopo}>
        <Ionicons name={icone} size={14} color={C.textoSuave} />
        <Text style={styles.infoRotulo}>{rotulo}</Text>
      </View>
      <Text style={[styles.infoValor, cor ? { color: cor } : null]}>
        {valor}
      </Text>
    </View>
  );
}

// ---------------------------------------------------------------- Modal
export const ClienteDetalhesModal: React.FC<ClienteDetalhesModalProps> = ({
  visible,
  cliente,
  onClose,
  onChamar,
  onSentar,
}) => {
  const insets = useSafeAreaInsets();
  const [agora, setAgora] = useState(Date.now());
  const deslize = useRef(new Animated.Value(600)).current;

  // Tempo de espera ao vivo (só enquanto o modal está aberto)
  useEffect(() => {
    if (!visible) return;
    setAgora(Date.now());
    const id = setInterval(() => setAgora(Date.now()), 1000);
    return () => clearInterval(id);
  }, [visible]);

  // Animação de subida da aba
  useEffect(() => {
    if (visible) {
      deslize.setValue(600);
      Animated.spring(deslize, {
        toValue: 0,
        useNativeDriver: true,
        friction: 9,
        tension: 70,
      }).start();
    }
  }, [visible, deslize]);

  if (!cliente) return null;

  const espera = agora - cliente.horaChegada;
  const telefone =
    formatarTelefone(cliente.whatsapp, "BR").nacional || cliente.whatsapp;

  const handleSentar = () => {
    onSentar();
    onClose();
  };

  const handleWhatsapp = async () => {
    const numero = cliente.whatsapp.replace(/\D/g, "");
    if (!numero) {
      Alert.alert("Sem WhatsApp", "Este cliente não tem número cadastrado.");
      return;
    }
    const mensagem = encodeURIComponent(
      `Olá, ${cliente.nome}! Sua mesa no restaurante está pronta. Por favor, dirija-se à recepção.`,
    );
    try {
      await Linking.openURL(`https://wa.me/55${numero}?text=${mensagem}`);
    } catch {
      Alert.alert("Erro", "Não foi possível abrir o WhatsApp.");
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        {/* Toque fora fecha */}
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

        <Animated.View
          style={[
            styles.aba,
            {
              paddingBottom: Math.max(insets.bottom, 16) + 8,
              transform: [{ translateY: deslize }],
            },
          ]}
        >
          <View style={styles.alca} />

          {/* -------------------------------------------- Cabeçalho */}
          <View style={styles.cabecalho}>
            <View style={styles.avatar}>
              <Text style={styles.avatarLetra}>
                {cliente.nome.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.nome} numberOfLines={1}>
                {cliente.nome}
              </Text>
              <View style={styles.posicaoPill}>
                <Ionicons name="list-outline" size={12} color={C.primaria} />
                <Text style={styles.posicaoTexto}>
                  {cliente.posicao}º na fila
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={onClose}
              style={styles.fechar}
              hitSlop={10}
              accessibilityLabel="Fechar"
            >
              <Ionicons name="close" size={20} color={C.textoSuave} />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={{ flexGrow: 0 }}
            showsVerticalScrollIndicator={false}
          >
            {/* ------------------------------------------ Tempo de espera */}
            <View
              style={[
                styles.espera,
                { backgroundColor: corEspera(espera) + "14" },
              ]}
            >
              <View>
                <Text style={styles.esperaRotulo}>Tempo de espera</Text>
                <Text style={[styles.esperaValor, { color: corEspera(espera) }]}>
                  {formatarEspera(espera)}
                </Text>
              </View>
              <Ionicons
                name="hourglass-outline"
                size={28}
                color={corEspera(espera)}
              />
            </View>

            {/* ------------------------------------------ Informações */}
            <View style={styles.infoGrade}>
              <Info
                icone="people-outline"
                rotulo="Pessoas"
                valor={String(cliente.pessoas)}
              />
              <Info
                icone="enter-outline"
                rotulo="Chegada"
                valor={formatarHora(cliente.horaChegada)}
              />
            </View>

            {/* ------------------------------------------ Contato */}
            <Text style={styles.secao}>Contato</Text>
            <View style={styles.contato}>
              <View style={styles.contatoIcone}>
                <Ionicons name="logo-whatsapp" size={20} color={C.whatsapp} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.contatoRotulo}>WhatsApp</Text>
                <Text style={styles.contatoValor}>
                  {telefone || "Não informado"}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.contatoBotao}
                onPress={handleWhatsapp}
              >
                <Text style={styles.contatoBotaoTexto}>Avisar</Text>
              </TouchableOpacity>
            </View>

            {/* ------------------------------------------ Observações */}
            <Text style={styles.secao}>Observações</Text>
            <View style={styles.obs}>
              <Text
                style={[
                  styles.obsTexto,
                  !cliente.observacoes && { color: C.textoFraco },
                ]}
              >
                {cliente.observacoes || "Nenhuma observação."}
              </Text>
            </View>
          </ScrollView>

          {/* -------------------------------------------- Ações */}
          <View style={styles.acoes}>
            <TouchableOpacity
              style={[styles.botao, styles.botaoSecundario]}
              onPress={onChamar}
            >
              <Ionicons name="megaphone-outline" size={18} color={C.texto} />
              <Text style={[styles.botaoTexto, { color: C.texto }]}>
                Chamar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.botao, { backgroundColor: C.sucesso }]}
              onPress={handleSentar}
            >
              <Ionicons name="restaurant-outline" size={18} color="#FFF" />
              <Text style={styles.botaoTexto}>Sentar</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

// ---------------------------------------------------------------- Estilos
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(10, 14, 28, 0.55)",
  },
  aba: {
    maxHeight: "88%",
    backgroundColor: C.superficie,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 16,
  },
  alca: {
    alignSelf: "center",
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: C.borda,
    marginBottom: 16,
  },

  // Cabeçalho
  cabecalho: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 18,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: C.marca,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarLetra: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "700",
  },
  nome: {
    fontSize: 21,
    fontWeight: "700",
    color: C.texto,
  },
  posicaoPill: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 4,
    marginTop: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    backgroundColor: C.primaria + "14",
  },
  posicaoTexto: {
    fontSize: 12,
    fontWeight: "600",
    color: C.primaria,
  },
  fechar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: C.fundo,
    alignItems: "center",
    justifyContent: "center",
  },

  // Espera
  espera: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  esperaRotulo: {
    fontSize: 13,
    color: C.textoSuave,
    fontWeight: "500",
  },
  esperaValor: {
    fontSize: 30,
    fontWeight: "700",
    marginTop: 2,
    fontVariant: ["tabular-nums"],
  },

  // Grade de informações
  infoGrade: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  info: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.borda,
    padding: 14,
  },
  infoTopo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  infoRotulo: {
    fontSize: 12,
    color: C.textoSuave,
  },
  infoValor: {
    fontSize: 20,
    fontWeight: "700",
    color: C.texto,
    marginTop: 6,
  },

  // Seções
  secao: {
    fontSize: 13,
    fontWeight: "700",
    color: C.textoSuave,
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 8,
  },

  // Contato
  contato: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.borda,
    padding: 12,
    marginBottom: 20,
  },
  contatoIcone: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: C.whatsapp + "1A",
    alignItems: "center",
    justifyContent: "center",
  },
  contatoRotulo: {
    fontSize: 12,
    color: C.textoSuave,
  },
  contatoValor: {
    fontSize: 15,
    fontWeight: "600",
    color: C.texto,
    marginTop: 1,
  },
  contatoBotao: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: C.whatsapp,
  },
  contatoBotaoTexto: {
    color: "#FFF",
    fontSize: 13,
    fontWeight: "700",
  },

  // Observações
  obs: {
    borderRadius: 14,
    backgroundColor: C.fundo,
    padding: 14,
    marginBottom: 20,
  },
  obsTexto: {
    fontSize: 14,
    lineHeight: 20,
    color: C.texto,
  },

  // Ações
  acoes: {
    flexDirection: "row",
    gap: 12,
    paddingTop: 4,
  },
  botao: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 52,
    borderRadius: 14,
  },
  botaoSecundario: {
    borderWidth: 1.5,
    borderColor: C.borda,
    backgroundColor: C.superficie,
  },
  botaoTexto: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default ClienteDetalhesModal;
