import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  Image,
} from "react-native";

// estrutura do app

export default function App() {
  return (
    <ImageBackground
      source={require("../assets/images/fundoGradiente.jpg")}
      resizeMode="cover"
      style={styles.fundo}
      blurRadius={15}
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
            <TextInput style={styles.input}></TextInput>
          </View>
          <View style={styles.containerInput}>
            <Text style={styles.labelName}>Senha</Text>
            <TextInput style={styles.input}></TextInput>
          </View>
          <View style={styles.containerCheck}>
            <View style={styles.quadrado}></View>
            <Text style={styles.labelCheck}> lembrar-me </Text>
          </View>
          {/*</ImageBackground>*/}
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
  },

  box: {
    borderRadius: 10,
    width: "80%",
    height: "40%",
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
    marginTop: 90,
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
    width: "60%",
    alignItems: "center",
  },

  containerCheck: {
    position: "absolute",
    left: 68,
    bottom: 30,
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
    color: "#FFF",
  },
});
