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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";

// estrutura do app


function logar(email: any, senha: any, navigation: any) {
  const { login } = useAuth()
  if (email === "teste@gmail.com" && senha === "teste123")
    login()
}
export default function Login({ navigation }: { navigation: any }) {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [lembrarEmail, setLembrarEmail] = useState("");
  const [senha, setSenha] = useState('');

  async function handleLogin() {
    await AsyncStorage.setItem("email", lembrarEmail); //salva o email
    await AsyncStorage.setItem("lembrar", "true"); // salva que o programa deve lembrar do email quando iniciar
  }

  useEffect(() => {
    async function carregarDados() {
      const emailSalvo = await AsyncStorage.getItem("email");
      const lembrarSalvo = await AsyncStorage.getItem("lembrar");
      setLembrarEmail(emailSalvo || "");
    }
    carregarDados();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Image
            source={require("../assets/images/logoNext.png")}
            style={styles.logo}
          />
          <View style={styles.box}>
            <Image
              source={require("../assets/images/perfil.png")}
              style={styles.imgPerfil}
            />
            <Text style={styles.login}>Login</Text>
            <View style={styles.containerInput}>
              <Text style={styles.labelName}>Usuário</Text>

              <View style={styles.container2}>
                <Image
                  source={require("../assets/images/iconPerson.png")}
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
                  source={require("../assets/images/iconLock.png")}
                  style={styles.iconInput}
                />
                <TouchableOpacity
                  style={styles.containerEye}
                  onPress={() => setMostrarSenha(!mostrarSenha)}
                >
                  <Image
                    source={
                      mostrarSenha
                        ? require("../assets/images/eyeSee.png")
                        : require("../assets/images/eyeNotSee.png")
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
              <TouchableOpacity>
                <Text
                  onPress={() => navigation.navigate("logproblem")}
                  style={styles.labelCheck}
                >
                  {" "}
                  Problemas com login?
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.containerBotao}>
              <Pressable
                onPress={() => {
                  handleLogin();
                  logar(lembrarEmail, senha, navigation );
                  ;
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
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFDD0",
  },

  texto: {
    fontSize: 20,
    fontWeight: "bold",
    position: "absolute",
    top: 10,
    color: "#000",
  },

  fundo: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
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
    height: "50%",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0)",
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
    marginTop: 20,
    marginBottom: 10,
  },

  logo: {
    marginTop: 50,
    marginBottom: 50,
    width: 300,
    height: 100,
  },

  labelName: {
    position: "absolute",
    color: "#FFF",
    zIndex: 10,
    top: -8,
    left: 5,
    backgroundColor: "#000",
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
  },

  containerInput: {
    width: "70%",
    alignItems: "center",
  },

  containerCheck: {
    top: 5,
    flexDirection: "row",
    alignContent: "center",
    width: "70%",
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
    marginRight: 24,
    alignSelf: "center",
    fontSize: 18,
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
    marginTop: 35,
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
    color: "#FFF",
    fontSize: 24,
  },
});
