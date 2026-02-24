import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";

// estrutura do app


export default function App() {
  
const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <ImageBackground
      source={require("../assets/images/fundoGradiente.png")}
      resizeMode="cover"
      style={styles.fundo}
      blurRadius={20}
    >
      <View style={styles.container}>
        <Image
          source={require("../assets/images/logoNext.png")}
          style={styles.logo}
        />
        <View style={styles.box}>
          {/*<ImageBackground
            source={require("../assets/images/login-bg.jpg")}
            style={styles.fundoBox}
          >*/}
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
              ></TextInput>
            </View>
          </View>
          <View style={styles.containerCheck}>
            <View style={styles.quadrado}></View>
            <Text style={styles.labelCheck}> lembrar-me </Text>
            <Text style={styles.labelCheck}> Esqueci minha senha </Text>
          </View>
          {/*</ImageBackground>*/}

          <View style={styles.containerBotao}>
            <Pressable
              style={({ pressed }) => [
                styles.botao,
                { backgroundColor: pressed ? "#2846a0" : "#3e6eff" },
              ]}
            >
              <Text style={styles.botaoText}> Entrar </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  texto: {
    fontSize: 20,
    fontWeight: "bold",
    position: "absolute",
    top: 10,
    color: "#000",
  },

  fundo: {
    flex: 1,
  },

  input: {
    backgroundColor: "#000",
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
    backgroundColor: "#000",
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
    color: "#FFF",
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
    position: "absolute",
    left: 50,
    bottom: 100,
    flexDirection: "row",
  },

  quadrado: {
    borderWidth: 0.5,
    borderColor: "#FFF",
    borderRadius: 3,
    width: 15,
    height: 15,
    marginRight: 5,
  },

  labelCheck: {
    color: "#fff",
    marginRight: 24,
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
    marginTop: 50,
  },

  botao: {
    borderWidth: 1,
    borderColor: "#FFF",
    borderRadius: 25,
    width: 240,
    height: 50,
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
