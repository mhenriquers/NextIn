import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text>Olá Bottom Tab</Text>
      <View style={{ flex: 1 }}></View>

      <View style={styles.containerNav}>

        <TouchableOpacity>
        <View style={styles.containerIcon}>
          <Image
            source={require("../assets/icons/home.png")}
            style={styles.iconBar}
          />
          <Text style={styles.textIcon}>Home</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity>
        <View style={styles.containerIcon}>
          <Image
            source={require("../assets/icons/clock.png")}
            style={styles.iconBar}
          />
          <Text style={styles.textIcon}>Filas</Text>
        </View>
        </TouchableOpacity>
        
        <TouchableOpacity>
        <View style={styles.containerIcon}>
          <Image
            source={require("../assets/icons/engrenagem.png")}
            style={styles.iconBar}
          />
          <Text style={styles.textIcon}>Configurações</Text>
        </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  containerNav: {
    width: "102%",
    height: 63,
    borderWidth: 1,
    borderColor: "#000",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 0,
    backgroundColor: '#0d0d0d',
  },

  containerIcon: {
    alignItems: "center",
    
  },

  iconBar: {
    width: 50,
    height: 50,
    padding: 0,
    paddingTop: 5,
  },

  textIcon:{
    color: "#FFF",
  },
});
