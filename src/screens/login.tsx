import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TextInputProps,
  Image,
  ImageBackground,
  TouchableOpacity,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "../context/AuthContext";

// ---------------------------------------------------------------- Paleta
const C = {
  fundo: "#F6F4EF",
  superficie: "#FFFFFF",
  campo: "#F7F7F8",
  borda: "#E6E3DC",
  texto: "#111827",
  textoSuave: "#6B7280",
  textoFraco: "#9CA3AF",
  marca: "#16213E", // azul-marinho da logo
  primaria: "#3E6EFF",
  primariaPressionada: "#2846A0",
  perigo: "#E5484D",
  sucesso: "#2FBF71",
};

type Tela = "login" | "lembrado" | "problema";
type IconName = React.ComponentProps<typeof Ionicons>["name"];
type TextInputRef = React.ComponentRef<typeof TextInput>;

// Selos exibidos na capa — o que o app faz, em poucas palavras
const DESTAQUES: { icone: IconName; texto: string }[] = [
  { icone: "time-outline", texto: "Fila em tempo real" },
  { icone: "logo-whatsapp", texto: "Aviso por WhatsApp" },
  { icone: "stats-chart-outline", texto: "Indicadores do dia" },
];

// ---------------------------------------------------------------- Campo de texto
const Campo = React.forwardRef<
  TextInputRef,
  TextInputProps & {
    rotulo: string;
    icone: IconName;
    erro?: boolean;
    direita?: React.ReactNode;
  }
>(({ rotulo, icone, erro, direita, style, onFocus, onBlur, ...props }, ref) => {
  const [focado, setFocado] = useState(false);
  const corBorda = erro ? C.perigo : focado ? C.primaria : C.borda;

  return (
    <View style={styles.campoBloco}>
      <Text style={styles.campoRotulo}>{rotulo}</Text>
      <View
        style={[
          styles.campo,
          { borderColor: corBorda },
          focado && styles.campoFocado,
        ]}
      >
        <Ionicons
          name={icone}
          size={18}
          color={focado ? C.primaria : C.textoFraco}
        />
        <TextInput
          ref={ref}
          style={[styles.campoInput, style]}
          placeholderTextColor={C.textoFraco}
          {...props}
          onFocus={(e) => {
            setFocado(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocado(false);
            onBlur?.(e);
          }}
        />
        {direita}
      </View>
    </View>
  );
});

// ---------------------------------------------------------------- Tela
export default function Login({ navigation }: { navigation: any }) {
  const { login } = useAuth();
  const insets = useSafeAreaInsets();

  const [telaAtual, setTelaAtual] = useState<Tela>("login");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [emailRecuperacao, setEmailRecuperacao] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [revelarSenhaLembrada, setRevelarSenhaLembrada] = useState(false);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const posicaoX = useRef(new Animated.Value(0)).current;
  const opacidade = useRef(new Animated.Value(1)).current;
  const senhaRef = useRef<TextInputRef>(null);

  // ------------------------------------------------------------ Carrega e-mail lembrado
  useEffect(() => {
    async function carregarDados() {
      const emailSalvo = await AsyncStorage.getItem("email");
      const lembrarSalvo = await AsyncStorage.getItem("lembrar");

      if (lembrarSalvo === "true" && emailSalvo) {
        setEmail(emailSalvo);
        setTelaAtual("lembrado");
      } else {
        setEmail(emailSalvo || "");
        setTelaAtual("login");
      }
    }
    carregarDados();
  }, []);

  // ------------------------------------------------------------ Transição entre estados
  function transicionarTela(novaTela: Tela) {
    setErro("");
    const saida = novaTela === "problema" ? -60 : 60;

    Animated.parallel([
      Animated.timing(posicaoX, {
        toValue: saida,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(opacidade, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTelaAtual(novaTela);
      posicaoX.setValue(-saida);
      Animated.parallel([
        Animated.timing(posicaoX, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(opacidade, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }

  // ---------------------------------- Login
  async function handleLogin() {
    Keyboard.dismiss();
    const emailLimpo = email.trim();
    const senhaLimpa = senha.trim();

    if (!emailLimpo || !senhaLimpa) {
      setErro("Preencha e-mail e senha para continuar.");
      return;
    }

    setErro("");
    setCarregando(true);
    try {
      // validação simples (substituir por serviço real em src/services/)
      if (emailLimpo === "teste@gmail.com" && senhaLimpa === "Teste") {
        await AsyncStorage.setItem("email", emailLimpo);
        await AsyncStorage.setItem("lembrar", "true");
        login();
      } else {
        setErro("E-mail ou senha incorretos.");
      }
    } finally {
      setCarregando(false);
    }
  }

  function handleRecuperar() {
    Keyboard.dismiss();
    if (!emailRecuperacao.trim()) {
      setErro("Informe o e-mail da sua conta.");
      return;
    }
    setErro("");
    Alert.alert(
      "Verifique seu e-mail",
      "Se houver uma conta com esse e-mail, enviaremos as instruções para recuperar o acesso.",
      [{ text: "OK", onPress: () => transicionarTela("login") }],
    );
  }

  function trocarConta() {
    setSenha("");
    setEmail("");
    setRevelarSenhaLembrada(false);
    transicionarTela("login");
  }

  // --------------------------------- Peças reutilizadas
  const botaoOlho = (
    <TouchableOpacity
      onPress={() => setMostrarSenha((v) => !v)}
      hitSlop={10}
      accessibilityLabel={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
    >
      <Ionicons
        name={mostrarSenha ? "eye-off-outline" : "eye-outline"}
        size={20}
        color={C.textoSuave}
      />
    </TouchableOpacity>
  );

  const mensagemErro = !!erro && (
    <View style={styles.erroCaixa}>
      <Ionicons name="alert-circle" size={16} color={C.perigo} />
      <Text style={styles.erroTexto}>{erro}</Text>
    </View>
  );

  const botaoPrimario = (texto: string, onPress: () => void) => (
    <Pressable
      onPress={onPress}
      disabled={carregando}
      style={({ pressed }) => [
        styles.botao,
        {
          backgroundColor: pressed ? C.primariaPressionada : C.primaria,
          opacity: carregando ? 0.8 : 1,
        },
      ]}
    >
      {carregando ? (
        <ActivityIndicator color="#FFF" />
      ) : (
        <Text style={styles.botaoTexto}>{texto}</Text>
      )}
    </Pressable>
  );

  // ------------------------- Conteúdo de cada estado
  function renderLogin() {
    return (
      <>
        <Text style={styles.titulo}>Bem-vindo de volta</Text>
        <Text style={styles.subtitulo}>
          Entre com sua conta para gerenciar a fila.
        </Text>

        <Campo
          rotulo="E-mail"
          icone="mail-outline"
          placeholder="voce@exemplo.com"
          value={email}
          onChangeText={(t) => {
            setEmail(t);
            if (erro) setErro("");
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          textContentType="emailAddress"
          returnKeyType="next"
          onSubmitEditing={() => senhaRef.current?.focus()}
          erro={!!erro}
        />

        <Campo
          ref={senhaRef}
          rotulo="Senha"
          icone="lock-closed-outline"
          placeholder="Sua senha"
          value={senha}
          onChangeText={(t) => {
            setSenha(t);
            if (erro) setErro("");
          }}
          secureTextEntry={!mostrarSenha}
          autoCapitalize="none"
          autoComplete="password"
          textContentType="password"
          returnKeyType="go"
          onSubmitEditing={handleLogin}
          erro={!!erro}
          direita={botaoOlho}
        />

        <TouchableOpacity
          style={styles.linkDireita}
          onPress={() => {
            setEmailRecuperacao(email);
            transicionarTela("problema");
          }}
        >
          <Text style={styles.link}>Problemas com login?</Text>
        </TouchableOpacity>

        {mensagemErro}
        {botaoPrimario("Entrar", handleLogin)}
      </>
    );
  }

  function renderLembrado() {
    return (
      <>
        <Text style={styles.titulo}>Que bom te ver!</Text>
        <Text style={styles.subtitulo}>Continue com a conta salva.</Text>

        <TouchableOpacity
          activeOpacity={0.8}
          disabled={revelarSenhaLembrada}
          onPress={() => setRevelarSenhaLembrada(true)}
          style={[
            styles.contaSalva,
            revelarSenhaLembrada && styles.contaSalvaAtiva,
          ]}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarLetra}>
              {email ? email.charAt(0).toUpperCase() : "U"}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.contaRotulo}>Continuar como</Text>
            <Text style={styles.contaEmail} numberOfLines={1}>
              {email}
            </Text>
          </View>
          <Ionicons
            name={revelarSenhaLembrada ? "checkmark-circle" : "chevron-forward"}
            size={20}
            color={revelarSenhaLembrada ? C.sucesso : C.textoFraco}
          />
        </TouchableOpacity>

        {revelarSenhaLembrada && (
          <>
            <Campo
              rotulo="Senha"
              icone="lock-closed-outline"
              placeholder="Sua senha"
              value={senha}
              onChangeText={(t) => {
                setSenha(t);
                if (erro) setErro("");
              }}
              secureTextEntry={!mostrarSenha}
              autoCapitalize="none"
              autoComplete="password"
              textContentType="password"
              returnKeyType="go"
              onSubmitEditing={handleLogin}
              autoFocus
              erro={!!erro}
              direita={botaoOlho}
            />
            {mensagemErro}
            {botaoPrimario("Entrar", handleLogin)}
          </>
        )}

        <View style={styles.divisor}>
          <View style={styles.divisorLinha} />
          <Text style={styles.divisorTexto}>ou</Text>
          <View style={styles.divisorLinha} />
        </View>

        <TouchableOpacity style={styles.botaoSecundario} onPress={trocarConta}>
          <Ionicons name="person-add-outline" size={18} color={C.texto} />
          <Text style={styles.botaoSecundarioTexto}>
            Entrar com outra conta
          </Text>
        </TouchableOpacity>
      </>
    );
  }

  function renderProblema() {
    return (
      <>
        <TouchableOpacity
          style={styles.voltar}
          onPress={() => transicionarTela("login")}
          hitSlop={10}
        >
          <Ionicons name="arrow-back" size={20} color={C.texto} />
          <Text style={styles.voltarTexto}>Voltar</Text>
        </TouchableOpacity>

        <View style={styles.iconeDestaque}>
          <Ionicons name="key-outline" size={24} color={C.primaria} />
        </View>
        <Text style={styles.titulo}>Recuperar acesso</Text>
        <Text style={styles.subtitulo}>
          Informe o e-mail da sua conta e enviaremos as instruções para
          redefinir sua senha.
        </Text>

        <Campo
          rotulo="E-mail"
          icone="mail-outline"
          placeholder="voce@exemplo.com"
          value={emailRecuperacao}
          onChangeText={(t) => {
            setEmailRecuperacao(t);
            if (erro) setErro("");
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="send"
          onSubmitEditing={handleRecuperar}
          erro={!!erro}
        />

        {mensagemErro}
        {botaoPrimario("Enviar instruções", handleRecuperar)}
      </>
    );
  }

  // ------------------------------------------------------------ Render
  return (
    <SafeAreaView style={styles.tela} edges={["left", "right", "bottom"]}>
      {/* Texto da status bar branco por cima da imagem escura */}
      <StatusBar style="light" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.conteudo}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            {/* ------------------------------------------ Capa com imagem */}
            <ImageBackground
              source={require("../../assets/images/bgabstract.png")}
              style={[styles.capa, { paddingTop: insets.top + 28 }]}
              imageStyle={styles.capaImagem}
              resizeMode="cover"
            >
              {/* Véu azul-marinho para dar contraste e puxar a cor da marca */}
              <View style={styles.capaVeu} />

              <Image
                source={require("../../assets/images/iconHeader.png")}
                style={styles.logo}
                accessibilityLabel="NextIn"
              />


              <View style={styles.destaques}>
                {DESTAQUES.map((d) => (
                  <View key={d.texto} style={styles.destaque}>
                    <Ionicons name={d.icone} size={13} color="#DCE6FF" />
                    <Text style={styles.destaqueTexto}>{d.texto}</Text>
                  </View>
                ))}
              </View>
            </ImageBackground>

            <Animated.View
              style={[
                styles.card,
                { opacity: opacidade, transform: [{ translateX: posicaoX }] },
              ]}
            >
              {telaAtual === "login" && renderLogin()}
              {telaAtual === "lembrado" && renderLembrado()}
              {telaAtual === "problema" && renderProblema()}
            </Animated.View>

            <View style={styles.rodape}>
              <Ionicons
                name="shield-checkmark-outline"
                size={14}
                color={C.textoFraco}
              />
              <Text style={styles.rodapeTexto}>
                Conexão segura · NextIn v1.0
              </Text>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ---------------------------------------------------------------- Estilos
const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: C.fundo,
  },
  conteudo: {
    flexGrow: 1,
    paddingBottom: 24,
  },

  // Capa com imagem
  capa: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 84, // espaço para o card "subir" sobre a capa
    overflow: "hidden",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  capaImagem: {
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  capaVeu: {
    ...StyleSheet.absoluteFill,
    backgroundColor: C.marca,
    opacity: 0.55,
  },
  logo: {
    // Logo original (letras azul-marinho com contorno claro), já recortada
    width: 240,
    height: 72,
    resizeMode: "contain",
  },
  slogan: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 21,
    color: "#E5ECFF",
    textAlign: "center",
  },
  destaques: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
    marginTop: 18,
  },
  destaque: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
  },
  destaqueTexto: {
    fontSize: 12,
    fontWeight: "500",
    color: "#DCE6FF",
  },

  // Card
  card: {
    marginTop: -60,
    marginHorizontal: 20,
    backgroundColor: C.superficie,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: C.borda,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.07,
    shadowRadius: 24,
    elevation: 4,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "700",
    color: C.texto,
  },
  subtitulo: {
    fontSize: 14,
    lineHeight: 20,
    color: C.textoSuave,
    marginTop: 6,
    marginBottom: 22,
  },

  // Campo
  campoBloco: {
    marginBottom: 16,
  },
  campoRotulo: {
    fontSize: 13,
    fontWeight: "600",
    color: C.texto,
    marginBottom: 6,
  },
  campo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    height: 50,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    backgroundColor: C.campo,
  },
  campoFocado: {
    backgroundColor: C.superficie,
  },
  campoInput: {
    flex: 1,
    height: "100%",
    fontSize: 15,
    color: C.texto,
  },

  // Links
  linkDireita: {
    alignSelf: "flex-end",
    marginTop: -4,
    marginBottom: 18,
    paddingVertical: 4,
  },
  link: {
    fontSize: 13,
    fontWeight: "600",
    color: C.primaria,
  },

  // Erro
  erroCaixa: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: C.perigo + "14",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
  },
  erroTexto: {
    flex: 1,
    fontSize: 13,
    color: C.perigo,
    fontWeight: "500",
  },

  // Botões
  botao: {
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: C.primaria,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 3,
  },
  botaoTexto: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
  botaoSecundario: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 50,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: C.borda,
  },
  botaoSecundarioTexto: {
    fontSize: 15,
    fontWeight: "600",
    color: C.texto,
  },

  // Conta lembrada
  contaSalva: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: C.borda,
    backgroundColor: C.campo,
    marginBottom: 18,
  },
  contaSalvaAtiva: {
    borderColor: C.primaria,
    backgroundColor: C.primaria + "0D",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: C.marca,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarLetra: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },
  contaRotulo: {
    fontSize: 12,
    color: C.textoSuave,
  },
  contaEmail: {
    fontSize: 15,
    fontWeight: "600",
    color: C.texto,
    marginTop: 1,
  },

  // Divisor "ou"
  divisor: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 18,
  },
  divisorLinha: {
    flex: 1,
    height: 1,
    backgroundColor: C.borda,
  },
  divisorTexto: {
    fontSize: 12,
    color: C.textoFraco,
  },

  // Recuperar acesso
  voltar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    marginBottom: 18,
  },
  voltarTexto: {
    fontSize: 14,
    fontWeight: "600",
    color: C.texto,
  },
  iconeDestaque: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: C.primaria + "1A",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  // Rodapé
  rodape: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 24,
  },
  rodapeTexto: {
    fontSize: 12,
    color: C.textoFraco,
  },
});
