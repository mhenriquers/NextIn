import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Pressable, Animated } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useFila } from "../context/FilaContext";

// ---------------------------------------------------------------- Paleta
const C = {
  superficie: "#FFFFFF",
  borda: "#ECE8DF",
  inativo: "#9CA3AF",
  primaria: "#3E6EFF",
  perigo: "#E5484D",
};

type IconName = React.ComponentProps<typeof Ionicons>["name"];

// Abas exibidas na barra (rotas fora desta lista, como "perfil", ficam ocultas)
const ABAS: Record<
  string,
  { rotulo: string; icone: IconName; iconeAtivo: IconName }
> = {
  home: { rotulo: "Início", icone: "home-outline", iconeAtivo: "home" },
  fila: { rotulo: "Fila", icone: "time-outline", iconeAtivo: "time" },
  configuracoes: {
    rotulo: "Ajustes",
    icone: "settings-outline",
    iconeAtivo: "settings",
  },
};

// ---------------------------------------------------------------- Item da barra
function ItemAba({
  rotulo,
  icone,
  ativo,
  badge,
  onPress,
  onLongPress,
}: {
  rotulo: string;
  icone: IconName;
  ativo: boolean;
  badge?: number;
  onPress: () => void;
  onLongPress: () => void;
}) {
  const progresso = useRef(new Animated.Value(ativo ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(progresso, {
      toValue: ativo ? 1 : 0,
      useNativeDriver: true,
      friction: 7,
      tension: 80,
    }).start();
  }, [ativo, progresso]);

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.item}
      accessibilityRole="tab"
      accessibilityState={{ selected: ativo }}
      accessibilityLabel={badge ? `${rotulo}, ${badge} na fila` : rotulo}
    >
      <View style={styles.iconeArea}>
        {/* Pílula de destaque da aba ativa */}
        <Animated.View
          style={[
            styles.pilula,
            {
              opacity: progresso,
              transform: [
                {
                  scaleX: progresso.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1],
                  }),
                },
              ],
            },
          ]}
        />
        <Ionicons
          name={icone}
          size={22}
          color={ativo ? C.primaria : C.inativo}
        />
        {!!badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeTexto}>{badge > 99 ? "99+" : badge}</Text>
          </View>
        )}
      </View>
      <Text
        style={[
          styles.rotulo,
          ativo ? styles.rotuloAtivo : { color: C.inativo },
        ]}
        numberOfLines={1}
      >
        {rotulo}
      </Text>
    </Pressable>
  );
}

// ---------------------------------------------------------------- Barra
export default function NavigationBar({
  state,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { fila } = useFila();
  const rotaAtiva = state.routes[state.index]?.name;

  return (
    <View
      style={[styles.barra, { paddingBottom: Math.max(insets.bottom, 10) }]}
    >
      {state.routes
        .filter((rota) => ABAS[rota.name])
        .map((rota) => {
          const aba = ABAS[rota.name];
          const ativo = rota.name === rotaAtiva;

          const onPress = () => {
            const evento = navigation.emit({
              type: "tabPress",
              target: rota.key,
              canPreventDefault: true,
            });
            if (!ativo && !evento.defaultPrevented) {
              navigation.navigate(rota.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({ type: "tabLongPress", target: rota.key });
          };

          return (
            <ItemAba
              key={rota.key}
              rotulo={aba.rotulo}
              icone={ativo ? aba.iconeAtivo : aba.icone}
              ativo={ativo}
              badge={rota.name === "fila" ? fila.length : undefined}
              onPress={onPress}
              onLongPress={onLongPress}
            />
          );
        })}
    </View>
  );
}

// ---------------------------------------------------------------- Estilos
const styles = StyleSheet.create({
  barra: {
    flexDirection: "row",
    backgroundColor: C.superficie,
    borderTopWidth: 1,
    borderTopColor: C.borda,
    paddingTop: 8,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 12,
  },
  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  iconeArea: {
    width: 64,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  pilula: {
    ...StyleSheet.absoluteFill,
    borderRadius: 16,
    backgroundColor: C.primaria + "1A",
  },
  badge: {
    position: "absolute",
    top: 0,
    right: 12,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    borderRadius: 9,
    backgroundColor: C.perigo,
    borderWidth: 2,
    borderColor: C.superficie,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeTexto: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "700",
  },
  rotulo: {
    fontSize: 12,
    fontWeight: "500",
  },
  rotuloAtivo: {
    color: C.primaria,
    fontWeight: "700",
  },
});
