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

export default function Logproblem({ navigation }: { navigation: any }) {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/images/bgabstract.png")}
        style={styles.background}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            {/* CONTAINER DO CABEÇALHO (Garante que a seta fique no topo esquerdo) */}
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => navigation.goBack()} // Faz voltar para o Login
                style={styles.areaBotaoVoltar}
              >
                <Image
                  source={require("../../assets/icons/arrow-back.png")}
                  style={styles.arrowBack}
                />
              </TouchableOpacity>
            </View>

            {/* LOGO E CONTEÚDO CONTINUAM EMBAIXO */}
            <Image
              source={require("../../assets/images/log-Photoroom.png")}
              style={styles.logo}
            />
            <View style={styles.box}>
              <Text style={styles.titulo}>Insira seu nome de usuário</Text>
              <View style={styles.containerInput}>
                <Text style={styles.labelName}>Insira seu nome de usuário</Text>

                <View style={styles.container2}>
                  <TextInput style={styles.input}></TextInput>
                </View>
              </View>

              <View>
                <Pressable
                  style={({ pressed }) => [
                    styles.containerBotao,
                    { opacity: pressed ? 0.6 : 1 },
                  ]}
                >
                  <Text style={styles.botaoText}> Login </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  background: {
    position: "absolute",
    zIndex: -1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
  },

  fundo: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  // Cria uma linha invisível no topo da tela para alinhar os elementos
  header: {
    width: "100%",
    height: "100%", // Espaço para não ficar colado na barra de bateria do celular
    paddingHorizontal: 10,
    justifyContent: "center", // Alinha verticalmente
    alignItems: "flex-start", // Força a seta a ir para a extrema esquerda
    position: "absolute", // Garante que o header fique sobreposto ao restante do conteúdo
    zIndex: -1, // Garante que o header fique acima do restante do conteúdo
    justifyContent: "center", // Centraliza verticalmente a seta dentro do header
  },

  // Aumenta a área de toque (UX boa: o usuário não precisa acertar milimetricamente o ícone)
  areaBotaoVoltar: {
    padding: 10,
  },

  // Ajusta o tamanho real do ícone da seta
  arrowBack: {
    width: 30, // 50 estava muito grande para uma seta de voltar padrão
    height: 30,
    resizeMode: "contain",
    position: "absolute",
    alignSelf: "center",
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
    justifyContent: "center",
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
