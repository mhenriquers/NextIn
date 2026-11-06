// src/screens/home.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { useFila, ClienteFila } from "../context/FilaContext";
import ClienteDetalhesModal from "../components/ClienteDetalhesModal";
import CustomModal from "../components/CustomModal";
import FormNovoCliente from "../components/FormNovoCliente";

// ---------------------------------------------------------------- Paleta
const C = {
  fundo: "#F6F4EF",
  superficie: "#FFFFFF",
  borda: "#ECE8DF",
  texto: "#111111",
  textoSuave: "#6B6B6B",
  textoFraco: "#A3A3A3",
  escuro: "#111111",
  escuroBorda: "#2A2A2A",
  primaria: "#3E6EFF",
  sucesso: "#2FBF71",
  alerta: "#F5A524",
  perigo: "#FF3B30",
  whatsapp: "#25D366",
};

// ---------------------------------------------------------------- Utilitários
const DIAS = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
const MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

function saudacao(hora: number) {
  if (hora < 12) return "Bom dia";
  if (hora < 18) return "Boa tarde";
  return "Boa noite";
}

function dataPorExtenso(d: Date) {
  return `${DIAS[d.getDay()]}, ${d.getDate()} de ${MESES[d.getMonth()]}`;
}

function minutosDesde(horaChegada: number, agora: number) {
  return Math.max(0, Math.floor((agora - horaChegada) / 60000));
}

function formatarEspera(minutos: number) {
  if (minutos < 1) return "agora";
  if (minutos < 60) return `${minutos} min`;
  const h = Math.floor(minutos / 60);
  const m = minutos % 60;
  return m ? `${h}h ${m}min` : `${h}h`;
}

// Cor do tempo de espera: verde até 15 min, amarelo até 30, vermelho acima
function corEspera(minutos: number) {
  if (minutos <= 15) return C.sucesso;
  if (minutos <= 30) return C.alerta;
  return C.perigo;
}

// ---------------------------------------------------------------- Componentes internos
type IconName = React.ComponentProps<typeof Ionicons>["name"];

function KpiCard({
  icone,
  cor,
  valor,
  rotulo,
}: {
  icone: IconName;
  cor: string;
  valor: string | number;
  rotulo: string;
}) {
  return (
    <View style={styles.kpiCard}>
      <View style={[styles.kpiIcone, { backgroundColor: cor + "1A" }]}>
        <Ionicons name={icone} size={18} color={cor} />
      </View>
      <Text style={styles.kpiValor}>{valor}</Text>
      <Text style={styles.kpiRotulo}>{rotulo}</Text>
    </View>
  );
}

// ---------------------------------------------------------------- Tela
export default function Home() {
  const navigation = useNavigation<any>();
  const { fila, atendidosHoje, adicionarCliente, removerCliente } = useFila();

  const [agora, setAgora] = useState(Date.now());
  const [clienteSelecionado, setClienteSelecionado] =
    useState<ClienteFila | null>(null);
  const [modalNovoVisivel, setModalNovoVisivel] = useState(false);

  // Atualiza os tempos de espera a cada 15 s
  useEffect(() => {
    const id = setInterval(() => setAgora(Date.now()), 15000);
    return () => clearInterval(id);
  }, []);

  const proximo = fila[0] ?? null;
  const seguintes = fila.slice(1, 4);

  const metricas = useMemo(() => {
    const esperas = fila.map((c) => minutosDesde(c.horaChegada, agora));
    const media = esperas.length
      ? Math.round(esperas.reduce((a, b) => a + b, 0) / esperas.length)
      : 0;
    const pessoas = fila.reduce((total, c) => total + c.pessoas, 0);
    return { media, pessoas };
  }, [fila, agora]);

  // ------------------------------------------------------------ Ações
  const handleChamar = (cliente: ClienteFila) => {
    Alert.alert("Chamar cliente", `Chamando ${cliente.nome} para a mesa.`);
  };

  const handleSentar = (cliente: ClienteFila) => {
    removerCliente(cliente.id);
  };

  const handleWhatsapp = async (cliente: ClienteFila) => {
    const numero = cliente.whatsapp.replace(/\D/g, "");
    const mensagem = encodeURIComponent(
      `Olá, ${cliente.nome}! Sua mesa no restaurante está pronta. Por favor, dirija-se à recepção.`,
    );
    const url = `https://wa.me/55${numero}?text=${mensagem}`;
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert("Erro", "Não foi possível abrir o WhatsApp.");
    }
  };

  const handleAdicionarCliente = (dados: {
    nome: string;
    pessoas: number;
    whatsapp: string;
    observacoes: string;
  }) => {
    adicionarCliente({
      ...dados,
      id: Math.random().toString(36).slice(2),
      posicao: fila.length + 1,
      horaChegada: Date.now(),
    });
    setModalNovoVisivel(false);
  };

  const hoje = new Date(agora);
  const esperaProximo = proximo ? minutosDesde(proximo.horaChegada, agora) : 0;

  return (
    <View style={styles.tela}>
      <ScrollView
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
      >
        {/* ------------------------------------------------ Cabeçalho */}
        <View style={styles.topo}>
          <View style={{ flex: 1 }}>
            <Text style={styles.data}>{dataPorExtenso(hoje)}</Text>
            <Text style={styles.saudacao}>{saudacao(hoje.getHours())} 👋</Text>
          </View>
          <View style={styles.statusPill}>
            <View style={styles.statusPonto} />
            <Text style={styles.statusTexto}>Fila ativa</Text>
          </View>
        </View>

        {/* ------------------------------------------------ Próximo da fila */}
        {proximo ? (
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.hero}
            onPress={() => setClienteSelecionado(proximo)}
          >
            <View style={styles.heroTopo}>
              <Text style={styles.heroRotulo}>PRÓXIMO DA FILA</Text>
              <View
                style={[
                  styles.heroEspera,
                  { borderColor: corEspera(esperaProximo) },
                ]}
              >
                <Ionicons
                  name="time-outline"
                  size={13}
                  color={corEspera(esperaProximo)}
                />
                <Text
                  style={[
                    styles.heroEsperaTexto,
                    { color: corEspera(esperaProximo) },
                  ]}
                >
                  {formatarEspera(esperaProximo)}
                </Text>
              </View>
            </View>

            <View style={styles.heroCliente}>
              <View style={styles.avatar}>
                <Text style={styles.avatarLetra}>
                  {proximo.nome.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.heroNome} numberOfLines={1}>
                  {proximo.nome}
                </Text>
                <View style={styles.heroMeta}>
                  <Ionicons name="people-outline" size={14} color="#BDBDBD" />
                  <Text style={styles.heroMetaTexto}>
                    {proximo.pessoas}{" "}
                    {proximo.pessoas === 1 ? "pessoa" : "pessoas"}
                  </Text>
                </View>
              </View>
            </View>

            {!!proximo.observacoes && (
              <View style={styles.heroObs}>
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={14}
                  color="#BDBDBD"
                />
                <Text style={styles.heroObsTexto} numberOfLines={2}>
                  {proximo.observacoes}
                </Text>
              </View>
            )}

            <View style={styles.heroAcoes}>
              <TouchableOpacity
                style={[styles.botao, styles.botaoContorno]}
                onPress={() => handleChamar(proximo)}
              >
                <Ionicons name="megaphone-outline" size={16} color="#FFF" />
                <Text style={styles.botaoTexto}>Chamar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.botao, { backgroundColor: C.sucesso }]}
                onPress={() => handleSentar(proximo)}
              >
                <Ionicons name="restaurant-outline" size={16} color="#FFF" />
                <Text style={styles.botaoTexto}>Sentar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.botaoWhats}
                onPress={() => handleWhatsapp(proximo)}
                accessibilityLabel="Avisar pelo WhatsApp"
              >
                <Ionicons name="logo-whatsapp" size={20} color="#FFF" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.vazio}>
            <View style={styles.vazioIcone}>
              <Ionicons name="cafe-outline" size={28} color={C.textoSuave} />
            </View>
            <Text style={styles.vazioTitulo}>Fila vazia</Text>
            <Text style={styles.vazioTexto}>
              Nenhum cliente aguardando no momento.
            </Text>
          </View>
        )}

        {/* ------------------------------------------------ Métricas */}
        <Text style={styles.secaoTitulo}>Resumo de hoje</Text>
        <View style={styles.kpiGrid}>
          <KpiCard
            icone="list-outline"
            cor={C.primaria}
            valor={fila.length}
            rotulo="Grupos na fila"
          />
          <KpiCard
            icone="people-outline"
            cor="#8B5CF6"
            valor={metricas.pessoas}
            rotulo="Pessoas aguardando"
          />
          <KpiCard
            icone="hourglass-outline"
            cor={corEspera(metricas.media)}
            valor={fila.length ? formatarEspera(metricas.media) : "—"}
            rotulo="Espera média"
          />
          <KpiCard
            icone="checkmark-done-outline"
            cor={C.sucesso}
            valor={atendidosHoje}
            rotulo="Atendidos hoje"
          />
        </View>

        {/* ------------------------------------------------ Próximos */}
        <View style={styles.secaoCabecalho}>
          <Text style={styles.secaoTitulo}>Em seguida</Text>
          <TouchableOpacity
            style={styles.verTodos}
            onPress={() => navigation.navigate("fila")}
          >
            <Text style={styles.verTodosTexto}>Ver fila completa</Text>
            <Ionicons name="chevron-forward" size={14} color={C.primaria} />
          </TouchableOpacity>
        </View>

        <View style={styles.lista}>
          {seguintes.length === 0 ? (
            <Text style={styles.listaVazia}>
              Ninguém aguardando depois do próximo.
            </Text>
          ) : (
            seguintes.map((cliente, i) => {
              const espera = minutosDesde(cliente.horaChegada, agora);
              return (
                <TouchableOpacity
                  key={cliente.id}
                  style={[
                    styles.linha,
                    i < seguintes.length - 1 && styles.linhaDivisor,
                  ]}
                  onPress={() => setClienteSelecionado(cliente)}
                >
                  <View style={styles.linhaPosicao}>
                    <Text style={styles.linhaPosicaoTexto}>
                      {cliente.posicao}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.linhaNome} numberOfLines={1}>
                      {cliente.nome}
                    </Text>
                    <Text style={styles.linhaSub}>
                      {cliente.pessoas}{" "}
                      {cliente.pessoas === 1 ? "pessoa" : "pessoas"}
                    </Text>
                  </View>
                  <Text style={[styles.linhaEspera, { color: corEspera(espera) }]}>
                    {formatarEspera(espera)}
                  </Text>
                </TouchableOpacity>
              );
            })
          )}
        </View>

        {/* ------------------------------------------------ Ação principal */}
        <TouchableOpacity
          style={styles.botaoAdicionar}
          onPress={() => setModalNovoVisivel(true)}
        >
          <Ionicons name="person-add-outline" size={18} color="#FFF" />
          <Text style={styles.botaoAdicionarTexto}>Adicionar cliente à fila</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* ------------------------------------------------ Modais */}
      <ClienteDetalhesModal
        visible={!!clienteSelecionado}
        cliente={clienteSelecionado}
        onClose={() => setClienteSelecionado(null)}
        onChamar={() => clienteSelecionado && handleChamar(clienteSelecionado)}
        onSentar={() => clienteSelecionado && handleSentar(clienteSelecionado)}
      />

      <CustomModal
        visible={modalNovoVisivel}
        onClose={() => setModalNovoVisivel(false)}
      >
        <FormNovoCliente
          onSubmit={handleAdicionarCliente}
          onCancel={() => setModalNovoVisivel(false)}
        />
      </CustomModal>
    </View>
  );
}

// ---------------------------------------------------------------- Estilos
const sombra = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.06,
  shadowRadius: 10,
  elevation: 2,
};

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: C.fundo,
  },
  conteudo: {
    padding: 20,
    paddingBottom: 32,
  },

  // Cabeçalho
  topo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  data: {
    fontSize: 13,
    color: C.textoSuave,
    textTransform: "capitalize",
  },
  saudacao: {
    fontSize: 26,
    fontWeight: "700",
    color: C.texto,
    marginTop: 2,
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: C.sucesso + "1A",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  statusPonto: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: C.sucesso,
  },
  statusTexto: {
    fontSize: 12,
    fontWeight: "600",
    color: C.sucesso,
  },

  // Hero (próximo cliente)
  hero: {
    backgroundColor: C.escuro,
    borderRadius: 20,
    padding: 18,
    marginBottom: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 6,
  },
  heroTopo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  heroRotulo: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
    color: "#9A9A9A",
  },
  heroEspera: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  heroEsperaTexto: {
    fontSize: 12,
    fontWeight: "600",
  },
  heroCliente: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: C.primaria,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarLetra: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "700",
  },
  heroNome: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "700",
  },
  heroMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 4,
  },
  heroMetaTexto: {
    color: "#BDBDBD",
    fontSize: 14,
  },
  heroObs: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginTop: 14,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#1C1C1C",
  },
  heroObsTexto: {
    flex: 1,
    color: "#D4D4D4",
    fontSize: 13,
  },
  heroAcoes: {
    flexDirection: "row",
    gap: 10,
    marginTop: 18,
  },
  botao: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    height: 46,
    borderRadius: 12,
  },
  botaoContorno: {
    borderWidth: 1,
    borderColor: C.escuroBorda,
    backgroundColor: "#1C1C1C",
  },
  botaoTexto: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "600",
  },
  botaoWhats: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: C.whatsapp,
    alignItems: "center",
    justifyContent: "center",
  },

  // Estado vazio
  vazio: {
    alignItems: "center",
    backgroundColor: C.superficie,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: C.borda,
    paddingVertical: 28,
    paddingHorizontal: 20,
    marginBottom: 28,
  },
  vazioIcone: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: C.fundo,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  vazioTitulo: {
    fontSize: 17,
    fontWeight: "700",
    color: C.texto,
  },
  vazioTexto: {
    fontSize: 14,
    color: C.textoSuave,
    marginTop: 4,
    textAlign: "center",
  },

  // Seções
  secaoCabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  secaoTitulo: {
    fontSize: 17,
    fontWeight: "700",
    color: C.texto,
    marginBottom: 12,
  },
  verTodos: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    marginBottom: 12,
  },
  verTodosTexto: {
    fontSize: 13,
    fontWeight: "600",
    color: C.primaria,
  },

  // KPIs
  kpiGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
    marginBottom: 28,
  },
  kpiCard: {
    width: "48.5%",
    backgroundColor: C.superficie,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: C.borda,
    ...sombra,
  },
  kpiIcone: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  kpiValor: {
    fontSize: 24,
    fontWeight: "700",
    color: C.texto,
  },
  kpiRotulo: {
    fontSize: 13,
    color: C.textoSuave,
    marginTop: 2,
  },

  // Lista "em seguida"
  lista: {
    backgroundColor: C.superficie,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: C.borda,
    paddingHorizontal: 14,
    marginBottom: 20,
    ...sombra,
  },
  listaVazia: {
    paddingVertical: 18,
    textAlign: "center",
    color: C.textoFraco,
    fontSize: 14,
  },
  linha: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
  },
  linhaDivisor: {
    borderBottomWidth: 1,
    borderBottomColor: C.borda,
  },
  linhaPosicao: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: C.fundo,
    alignItems: "center",
    justifyContent: "center",
  },
  linhaPosicaoTexto: {
    fontSize: 13,
    fontWeight: "700",
    color: C.texto,
  },
  linhaNome: {
    fontSize: 15,
    fontWeight: "600",
    color: C.texto,
  },
  linhaSub: {
    fontSize: 13,
    color: C.textoSuave,
    marginTop: 1,
  },
  linhaEspera: {
    fontSize: 13,
    fontWeight: "600",
  },

  // Botão adicionar
  botaoAdicionar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 52,
    borderRadius: 14,
    backgroundColor: C.primaria,
    shadowColor: C.primaria,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  botaoAdicionarTexto: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
