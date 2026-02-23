import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
} from "react-native";

// estrutura do app

export default function App() {
  return (
    <ImageBackground
      source={require("../assets/images/fundoGradiente.jpg")}
      style={styles.fundo}
    >
      <View style={styles.container}>
        <Text style={styles.texto}>NextIn</Text>
        <View style={styles.box}>
          <ImageBackground source={require("../assets/images/login-bg.jpg")}
          style={styles.fundoBox}
          >
            <Text style={styles.login}>Login</Text>
            <TextInput
              placeholder="Usuário"
              placeholderTextColor={"#999"}
              style={styles.input}
            ></TextInput>
            <TextInput
              placeholder="Senha"
              placeholderTextColor={"#999"}
              style={styles.input}
            ></TextInput>
          </ImageBackground>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
    backgroundColor: "#FFF",
    padding: 5,
    borderRadius: 5,
    width: "60%",
    height: 35,
    marginBottom: 10,
  },

  box: {
    borderRadius: 10,
    width: "80%",
    height: "40%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#999",
  },

  fundoBox:{
    flex: 1,
    width: "100%",
    height: '100%',
    alignItems: "center",
    justifyContent: "center",

  },

  login: {
    fontSize: 28,
    marginBottom: 10,
    fontWeight: "bold",
    color: '#FFF',
  },
});
