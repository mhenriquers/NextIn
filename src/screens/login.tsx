import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  Image,
  TouchableOpacity,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  BackHandler,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

// estrutura do app

export default function Login({ navigation }: { navigation: any }) {
  const { login } = useAuth();
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [lembrarEmail, setLembrarEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telaAtual, setTelaAtual] = useState("login");
  const [posicaoX] = useState(new Animated.Value(0)); // Começa na posição 0 (centro)
  const emailLimpo = lembrarEmail.trim(); // Remove espaços em branco do início e do fim
  const senhaLimpa = senha.trim(); // Remove espaços em branco do início e do fim
  const [revelarSenhaLembrada, setRevelarSenhaLembrada] = useState(false);

  function transicionarTela(novaTela: "login" | "lembrado" | "problema") {
    // 💡 ISOLAMENTO: Se a nova tela for 'login', o app entra aqui,
    // muda de tela instantaneamente e mata o resto da função (sem afetar as outras)
    if (novaTela === "login") {
      setTelaAtual("login");
      posicaoX.setValue(0); // Teleporta o box direto para o centro, sem deslizar
      return; // O 'return' para a função aqui. As linhas de baixo nem são lidas.
    }

    // 🚀 MOVIMENTO NORMAL: Qualquer outra tela (problema, lembrado, etc.)
    // vai ignorar o 'if' acima e rodar o deslize padrão de 150ms aqui embaixo:
    const posicaoSaida = novaTela === "problema" ? -400 : 400;
    const posicaoEntrada = novaTela === "problema" ? 400 : -400;

    Animated.timing(posicaoX, {
      toValue: posicaoSaida,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setTelaAtual(novaTela);
      posicaoX.setValue(posicaoEntrada);

      Animated.timing(posicaoX, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
    });
  }
  async function handleLogin() {
    //validação simples
    if (emailLimpo === "teste@gmail.com" && senhaLimpa === "Teste") {
      await AsyncStorage.setItem("email", emailLimpo); //salva o email
      await AsyncStorage.setItem("lembrar", "true"); // salva que o programa deve lembrar do email quando iniciar

      login();
    } else {
      Alert.alert("Email ou senha incorretos.");
    }
  }

  useEffect(() => {
    async function carregarDados() {
      // 1. Busca os dados guardados no celular
      const emailSalvo = await AsyncStorage.getItem("email");
      const lembrarSalvo = await AsyncStorage.getItem("lembrar");

      // 2. Se a flag de lembrar for verdadeira E existir um e-mail salvo...
      if (lembrarSalvo === "true" && emailSalvo) {
        setLembrarEmail(emailSalvo);
        setTelaAtual("lembrado"); // Joga direto para a tela do card
      } else {
        // 3. Caso contrário, garante que o input de e-mail comece limpo ou com o último digitado
        setLembrarEmail(emailSalvo || "");
        setTelaAtual("login"); // Garante que comece na tela de login tradicional
      }
    }
    carregarDados();
  }, []);

  return (
    <SafeAreaView style={styles.bgColor}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <Image
            source={require("../../assets/images/log-Photoroom.png")}
            style={styles.logo}
          />

          {/*-------------------------------------------------------------TELA DE LOGIN ---------------------------------------------------------------- */}

          {telaAtual === "login" ? (
            <Animated.View
              style={[styles.box, { transform: [{ translateX: posicaoX }] }]}
            >
              <Image
                source={require("../../assets/images/perfil.png")}
                style={styles.imgPerfil}
              />
              <Text style={styles.login}>Login</Text>
              <View style={styles.containerInput}>
                <Text style={styles.labelName}>Usuário</Text>

                <View style={styles.container2}>
                  <Image
                    source={require("../../assets/images/iconPerson.png")}
                    style={styles.iconInput}
                  />

                  <TextInput
                    style={styles.input}
                    placeholder="Exemplo@gmail.com"
                    placeholderTextColor={"#999"}
                    value={lembrarEmail}
                    onChangeText={setLembrarEmail}
                  ></TextInput>
                </View>
              </View>
              <View style={styles.containerInput}>
                <Text style={styles.labelName}>Senha</Text>
                <View style={styles.container2}>
                  <Image
                    source={require("../../assets/images/iconLock.png")}
                    style={styles.iconInput}
                  />
                  <TouchableOpacity
                    style={styles.containerEye}
                    onPress={() => setMostrarSenha(!mostrarSenha)}
                  >
                    <Image
                      source={
                        mostrarSenha
                          ? require("../../assets/images/eyeSee.png")
                          : require("../../assets/images/eyeNotSee.png")
                      }
                      style={styles.iconEye}
                    />
                  </TouchableOpacity>
                  <TextInput
                    secureTextEntry={!mostrarSenha}
                    style={styles.input}
                    placeholder="sua senha"
                    placeholderTextColor={"#999"}
                    value={senha}
                    onChangeText={setSenha}
                  ></TextInput>
                </View>
              </View>
              <View style={styles.containerCheck}>
                <Pressable
                  onPress={() => transicionarTela("problema")} // <-- Mudamos aqui para chamar a função com animação
                  style={styles.areaLink}
                >
                  {({ pressed }) => (
                    <Text
                      style={[
                        styles.labelCheck,
                        { opacity: pressed ? 0.6 : 1 },
                      ]}
                    >
                      Problemas com login?
                    </Text>
                  )}
                </Pressable>
              </View>

              <View style={styles.containerBotao}>
                <Pressable
                  onPress={() => {
                    handleLogin();
                  }}
                  style={({ pressed }) => [
                    styles.botao,
                    { backgroundColor: pressed ? "#2846a0" : "#3e6eff" },
                  ]}
                >
                  <Text style={styles.botaoText}> Login </Text>
                </Pressable>
              </View>
            </Animated.View>
          ) : telaAtual === "lembrado" ? (
            /*----------------------------------------------------------- TELA LOGIN LEMBRADO -------------------------------------------------------------- */
            <>
              <Animated.View style={[styles.boxLoginLembrado]}>
                <View style={styles.containerLoginLembrado}>
                  <Text style={styles.loginLembrado}>Entrar</Text>
                </View>
                {/* Ao clicar no card, ou abre a senha ou faz o login se a senha já estiver lá */}
                <TouchableOpacity
                  disabled={revelarSenhaLembrada}
                  onPress={() => {
                    if (!revelarSenhaLembrada) {
                      setRevelarSenhaLembrada(true);
                    } else {
                      handleLogin();
                    }
                  }}
                  style={styles.cardUsuarioLembrado}
                >
                  <View style={styles.avatarCirculo}>
                    <Text style={styles.avatarLetra}>
                      {lembrarEmail
                        ? lembrarEmail.charAt(0).toUpperCase()
                        : "U"}
                    </Text>
                  </View>
                  <View style={styles.infoUsuarioLembrado}>
                    <Text style={styles.textoContinuarComo}>
                      Continuar como
                    </Text>
                    <Text style={styles.textoEmailLembrado} numberOfLines={1}>
                      {lembrarEmail}
                    </Text>
                  </View>
                </TouchableOpacity>
                {!revelarSenhaLembrada && (
                  <View style={styles.containerLinha}></View>
                )}
                {/* INPUT DE SENHA: Só aparece na tela após o clique no card */}
                {revelarSenhaLembrada && (
                  <View style={[styles.containerInputLogLembrado]}>
                    <Text style={styles.labelName}>Senha</Text>
                    <View style={styles.container2}>
                      <Image
                        source={require("../../assets/images/iconLock.png")}
                        style={styles.iconInput}
                      />
                      <TouchableOpacity
                        style={styles.containerEye}
                        onPress={() => setMostrarSenha(!mostrarSenha)}
                      >
                        <Image
                          source={
                            mostrarSenha
                              ? require("../../assets/images/eyeSee.png")
                              : require("../../assets/images/eyeNotSee.png")
                          }
                          style={styles.iconEye}
                        />
                      </TouchableOpacity>
                      <TextInput
                        secureTextEntry={!mostrarSenha}
                        style={styles.input}
                        placeholderTextColor={"#999"}
                        value={senha}
                        onChangeText={setSenha}
                        autoFocus={true} // Faz o teclado abrir automaticamente quando o input aparecer
                      />
                    </View>
                    <View style={styles.containerBotaoLogLembrado}>
                      <Pressable
                        onPress={() => {
                          handleLogin();
                        }}
                        style={({ pressed }) => [
                          styles.botao,
                          { backgroundColor: pressed ? "#2846a0" : "#3e6eff" },
                        ]}
                      >
                        <Text style={styles.botaoText}> Login </Text>
                      </Pressable>
                    </View>
                  </View>
                )}

                {/* Link para o usuário trocar de conta visualmente */}
                <TouchableOpacity
                  onPress={() => {
                    setSenha("");
                    setRevelarSenhaLembrada(false); // Reseta para a caixinha começar fechada na próxima
                    transicionarTela("login");
                  }}
                  style={styles.areaLinkTrocarConta}
                >
                  <Text style={styles.textoTrocarConta}>
                    + Entrar com outra conta
                  </Text>
                </TouchableOpacity>
              </Animated.View>
              <View style={{ height: "20%" }} />
            </>
          ) : (
            <>
              {/*----------------------------------------------------------- TELA DE PROBLEMAS DE LOGIN----------------------------------------------------- */}
              <View style={styles.containerLogProblem}>
                <View style={styles.header}>
                  <TouchableOpacity
                    onPress={() => transicionarTela("login")} // Faz voltar para o Login
                    style={styles.areaBotaoVoltar}
                  >
                    <Image
                      source={require("../../assets/icons/arrow-back.png")}
                      style={styles.arrowBack}
                    />
                  </TouchableOpacity>
                </View>

                <Animated.View
                  style={[
                    styles.boxlog,
                    { transform: [{ translateX: posicaoX }] },
                  ]}
                >
                  <Text style={styles.titulo}>Insira seu nome de usuário</Text>
                  <View style={styles.containerInput}>
                    <Text style={styles.labelName}>
                      Insira seu nome de usuário
                    </Text>

                    <View style={styles.container2}>
                      <TextInput style={styles.input}></TextInput>
                    </View>
                  </View>

                  <View>
                    <Pressable
                      style={({ pressed }) => [
                        styles.containerBotaoLog,
                        { opacity: pressed ? 0.6 : 1 },
                      ]}
                    >
                      <Text style={styles.botaoTextLog}> Enviar </Text>
                    </Pressable>
                  </View>
                </Animated.View>
              </View>
              <View style={{ height: "20%" }} />
            </>
          )}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center", // <-- ADICIONE ISSO: Força a tela inteira a se centralizar e recalcular quando o teclado abre
  },

  bgColor: {
    flex: 1,
    backgroundColor: "#FAF6EE",
    zIndex: -1,
  },

  texto: {
    fontSize: 20,
    fontWeight: "bold",
    position: "absolute",
    top: 10,
    color: "#000",
  },

  input: {
    backgroundColor: "#0000",
    padding: 5,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "#FFF",
    width: "100%",
    height: 35,
    marginBottom: 10,
    paddingLeft: 30,
    color: "#FFF",
  },

  box: {
    borderRadius: 10,
    width: "80%",
    // height: "50%", <-- APAGUE ESSA LINHA
    paddingVertical: 20, // <-- ADICIONE ISSO (Garante tamanho dinâmico)
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,1)", // Preto sólido
  },

  fundoBox: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  login: {
    fontSize: 28,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#fff",
  },

  imgPerfil: {
    width: 80,
    height: 80,
    marginTop: 0,
  },

  logo: {
    marginTop: 10,
    marginBottom: 50,
    width: 300,
    height: 100,
  },

  labelName: {
    position: "absolute",
    color: "#FFF",
    zIndex: 10,
    top: -10,
    left: 5,
    backgroundColor: "#000",
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
  },

  containerInput: {
    width: "85%",
    alignItems: "center",
  },

  containerCheck: {
    top: 0,
    flexDirection: "row",
    alignContent: "center",
    width: "80%",
  },

  quadrado: {
    borderWidth: 0.5,
    borderColor: "#FFF",
    borderRadius: 3,
    width: 15,
    height: 15,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },

  verificado: {
    height: 15,
    width: 15,
    zIndex: 5,
  },

  labelCheck: {
    color: "#FFF",
    alignSelf: "center",
    fontSize: 18,
    justifyContent: "flex-start",
  },

  iconInput: {
    height: 14,
    width: 14,
    position: "absolute",
    zIndex: 10,
    top: 10,
    left: 10,
  },

  container2: {
    width: "100%",
  },

  containerEye: {
    height: 20,
    width: 20,
    position: "absolute",
    zIndex: 10,
    top: 8,
    right: 10,
  },

  iconEye: {
    height: 20,
    width: 20,
  },

  containerBotao: {
    marginTop: 15,
    marginBottom: 10,
  },

  botao: {
    borderWidth: 1,
    borderColor: "#FFF",
    borderRadius: 10,
    width: 240,
    height: 45,
    backgroundColor: "#3e6eff",
    alignItems: "center",
    justifyContent: "center",
  },

  botaoText: {
    fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: 24,
  },

  titulo: {
    fontSize: 20,
    marginBottom: 30,
    fontWeight: "bold",
    color: "#fff",
  },

  areaBotaoVoltar: {
    padding: 10,
  },

  arrowBack: {
    width: 30, // 50 estava muito grande para uma seta de voltar padrão
    height: 30,
    resizeMode: "contain",
    position: "absolute",
    alignSelf: "center",
  },

  header: {
    width: "10%",
    height: 50, // <-- Mude de "100%" para 50 fixo
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "flex-start",
    // Remova o position: "absolute" e o zIndex negativo para não sumir com o clique
  },

  boxlog: {
    borderRadius: 10,
    width: "80%",
    // height: "50%", <-- APAGUE ESSA LINHA
    paddingVertical: 35, // <-- ADICIONE ISSO
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,1)",
  },

  containerBotaoLog: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderRadius: 10,
    width: 240,
    height: 45,
    backgroundColor: "#FFFFFF", // Nota: se o fundo e a borda forem brancos, a borda não vai aparecer.
    alignItems: "center",
    justifyContent: "center",
  },

  botaoTextLog: {
    fontWeight: "bold",
    color: "#000000", // Corrigido para preto puro sem caracteres estranhos
    fontSize: 24,
  },

  containerLogProblem: {
    flexDirection: "row",
    alignItems: "center",
    left: -20,
  },

  containerLinha: {
    width: "85%",
    height: 1,
    backgroundColor: "#333",
  } /* NOVOS ESTILOS DO CARD LEMBRADO (ESTILO MIRO) */,

  boxLoginLembrado: {
    borderRadius: 10,
    width: "80%",
    // Se houver algum height fixo aqui ou no 'box', certifique-se de remover.
    paddingVertical: 20, // Mantém o box elástico para crescer e encolher
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,1)", // Preto 100% sólido para não vazar o fundo
  },

  cardUsuarioLembrado: {
    width: "85%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.08)", // Fundo sutil sobre o box preto
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 8,
    padding: 12,
    marginTop: 20,
    marginBottom: 25,
  },

  avatarCirculo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFC107", // Amarelo característico do Miro
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  avatarLetra: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 18,
  },

  infoUsuarioLembrado: {
    flex: 1,
  },

  textoContinuarComo: {
    color: "#999",
    fontSize: 12,
  },

  textoEmailLembrado: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
  },

  areaLinkTrocarConta: {
    marginTop: 10,
    padding: 10,
  },

  textoTrocarConta: {
    color: "#3e6eff",
    fontSize: 16,
    fontWeight: "600",
  },

  containerLoginLembrado: {
    width: "100%",
    paddingLeft: "8%",
  },

  loginLembrado: {
    fontSize: 28,
    marginBottom: 10,
    marginTop: 20,
    fontWeight: "bold",
    color: "#fff",
    justifyContent: "flex-start",
  },

  containerInputLogLembrado: {
    width: "85%",
    alignItems: "center",
  },
  containerBotaoLogLembrado: {
    marginTop: 10,
  },
});
