import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NavigationBar({state, descriptors, navigation}: BottomTabBarProps) {
  return (

      
      <SafeAreaView style={styles.containerNav}>

        <TouchableOpacity
        onPress={() => navigation.navigate('home')}
        
        >
        <View style={styles.containerIcon}>
          <Image
            source={require("../../assets/icons/home.png")}
            style={styles.iconBar}
          />
          <Text style={styles.textIcon}>Home</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity
        onPress={() => navigation.navigate('fila')}
        >
        <View style={styles.containerIcon}>
          <Image
            source={require("../../assets/icons/clock.png")}
            style={styles.iconBar}
          />
          <Text style={styles.textIcon}>Filas</Text>
        </View>
        </TouchableOpacity>
        
        <TouchableOpacity
        onPress={() => navigation.navigate('configuracoes')}
        >
        <View style={styles.containerIcon}>
          <Image
            source={require("../../assets/icons/engrenagem.png")}
            style={styles.iconBar}
          />
          <Text style={styles.textIcon}>Configurações</Text>
        </View>
        </TouchableOpacity>
      </SafeAreaView>

  );
}

const styles = StyleSheet.create({


  containerNav: {
    width: "100%",
    height: 70,
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
