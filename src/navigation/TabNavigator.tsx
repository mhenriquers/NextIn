import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//telas
import Configuracoes from "../screens/configuracoes";
import Fila from "../screens/fila";
import Home from "../screens/home";
import NavigationBar from "./NavigationBar";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <NavigationBar {...props} />}
    >
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="configuracoes" component={Configuracoes} />
      <Tab.Screen name="fila" component={Fila} />
    </Tab.Navigator>
  );
}
