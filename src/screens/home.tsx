import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/bgabstract.png")}
        style={styles.background}
      >
        <Text style={styles.text}>Olá Home</Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: "absolute",
    zIndex: -1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    blurradius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
  },
});
