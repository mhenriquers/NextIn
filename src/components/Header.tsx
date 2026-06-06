// src/components/HeaderGlobal.tsx
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HeaderGlobal() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets(); // Coleta a área segura do topo do celular
  const [isOnline, setIsOnline] = useState(true);

  return (
    <View
      style={[
        styles.headerContainer,
        {
          paddingTop: insets.top > 0 ? insets.top : 10,
          height: 50 + (insets.top > 0 ? insets.top : 10),
        },
      ]}
    >
      {/* Esquerda: Logo */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("home");
        }}
      >
        <Image
          source={require("../../assets/images/iconHeader.png")}
          style={styles.LogoIcon}
        />
      </TouchableOpacity>

      {/* 💡 Direita: Grupo unido (Bolinha + Perfil) */}
      <View style={styles.rightGroup}>
        <View
          style={[
            styles.statusCircle,
            { backgroundColor: isOnline ? "#4CD964" : "#FF3B30" }, // Verde se online, Vermelho se offline
          ]}
        />

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("perfil");
          }}
        >
          <Image
            source={require("../../assets/images/perfil.png")}
            style={styles.rightIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    backgroundColor: "#ffffff", // Deixei branco conforme sua mudança
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Separa o bloco da Logo do bloco rightGroup
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0", // Uma cor mais clara para combinar com o fundo branco
  },
  LogoIcon: {
    width: 100,
    height: 40,
    resizeMode: "contain",
  },
  rightIcon: {
    width: 35,
    height: 35,
    borderRadius: 17.5, // Deixa a imagem redondinha se for uma foto de avatar
    tintColor: "#000000",
  },
  rightGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12, // Espaçamento controlado entre a bolinha e a foto
  },
  statusCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  }, // 💡 Chave fechada corretamente aqui!
});
