import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

interface CustomTabBarProps extends BottomTabBarProps {
  safeStyle?: ViewStyle;
}

export default function NavigationBar({
  state,
  descriptors,
  navigation,
  safeStyle,
}: CustomTabBarProps) {
  return (
    <View style={[styles.containerNav, safeStyle]}>
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => navigation.navigate("home")}
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
        style={styles.tabButton}
        onPress={() => navigation.navigate("fila")}
      >
        <View style={styles.containerIcon2}>
          <Image
            source={require("../../assets/icons/clock.png")}
            style={styles.iconBar}
          />
          <Text style={styles.textIcon}>Filas</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => navigation.navigate("configuracoes")}
      >
        <View style={styles.containerIcon3}>
          <Image
            source={require("../../assets/icons/engrenagem.png")}
            style={styles.iconBar}
          />
          <Text style={styles.textIcon}>Configurações</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  containerNav: {
    width: "100%",
    height: 70,
    borderWidth: 1,
    borderColor: "#000",
    flexDirection: "row",
    borderRadius: 0,
    alignItems: "center",
    backgroundColor: "#0d0d0d",
  },

  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  containerIcon: {
    alignItems: "center",
    marginLeft: "9.9%",
    marginRight: "9.9%",
  },

  containerIcon2: {
    alignItems: "center",
    marginLeft: "11%",
    marginRight: "11%",
  },

  containerIcon3: {
    alignItems: "center",
    marginLeft: "2.8%",
    marginRight: "2.8%",
  },

  iconBar: {
    width: 25,
    height: 25,
    padding: 0,
    paddingTop: 5,
  },

  textIcon: {
    color: "#FFF",
  },
});
