import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//telas
import Configuracoes from "../screens/configuracoes";
import Fila from "../screens/fila";
import Home from "../screens/home";
import NavigationBar from "./NavigationBar";
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
        headerShown: false,
      }}
      tabBar={(props) => <NavigationBar {...props} safeStyle={tabBarStyle} />}
    >
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="fila" component={Fila} />
      <Tab.Screen name="configuracoes" component={Configuracoes} />
    </Tab.Navigator>
  );
}
