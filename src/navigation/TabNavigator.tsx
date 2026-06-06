import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//telas
import Configuracoes from "../screens/configuracoes";
import Fila from "../screens/fila";
import Home from "../screens/home";
import perfil from "../screens/perfil";

//componentes

import NavigationBar from "../components/NavigationBar";
import HeaderGlobal from "../components/Header";
import {
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const insets = useSafeAreaInsets();

  const tabBarStyle = {
    backgroundColor: "#0d0d0d",
    paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
    height: 60 + (insets.bottom > 0 ? insets.bottom : 0),
  };
  return (
    <Tab.Navigator
      screenOptions={{
        header: () => <HeaderGlobal />,
      }}
      tabBar={(props) => <NavigationBar {...props} safeStyle={tabBarStyle} />}
    >
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="fila" component={Fila} />
      <Tab.Screen name="configuracoes" component={Configuracoes} />
      <Tab.Screen name="perfil" component={perfil} />
    </Tab.Navigator>
  );
}
