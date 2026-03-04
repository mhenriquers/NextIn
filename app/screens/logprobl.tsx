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

// estrutura do app

export default function Login() {

  return (
    <View style={{ flex: 1 }}>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Image
            source={require("../assets/images/logoNext.png")}
            style={styles.logo}
          />
          <View style={styles.box}>

            <Text style={styles.titulo}>Insira seu nome de usuário</Text>
            <View style={styles.containerInput}>
              <Text style={styles.labelName}>Insira seu nome de usuário</Text>

              <View style={styles.container2}>

                <TextInput
                  style={styles.input}
                ></TextInput>
              </View>
            </View>

            <View style={styles.containerBotao}>
              <Pressable
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
    backgroundColor: '#444',
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
    backgroundColor: "#00",
    padding: 5,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "#fff",
    width: "100%",
    height: 35,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    color: "#FFF",
  },

  box: {
    borderRadius: 10,
    width: "80%",
    height: "50%",
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "rgba(0,0,0)",
  },

  fundoBox: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  titulo: {
    fontSize: 20,
    marginBottom: 30,
    fontWeight: "bold",
    color: "#fff",
  },

  logo: {
    marginTop: 50,
    marginBottom: 50,
    width: 300,
    height: 100,
  },

  labelName: {
    position: "absolute",
    color: "#999",
    zIndex: 10,
    top: 2,
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

  container2: {
    width: "100%",
  },

  containerBotao: {
    marginTop: 35,
    borderWidth: 1,
    borderColor: "#FFF",
    borderRadius: 10,
    width: 240,
    height: 45,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  botaoText: {
    fontWeight: "bold",
    color: "#000",
    fontSize: 24,
  },
});
