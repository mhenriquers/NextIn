import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//telas
import Configuracoes from "../screens/configuracoes";
import Fila from "../screens/fila";
import Home from "../screens/home";
import Perfil from "../screens/perfil";
import { FilaProvider } from "../context/FilaContext";

//componentes
import NavigationBar from "../components/NavigationBar";
import HeaderGlobal from "../components/Header";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <FilaProvider>
      <Tab.Navigator
        screenOptions={{
          header: () => <HeaderGlobal />,
        }}
        // A barra cuida da própria área segura (insets) e esconde rotas fora da lista (ex.: perfil)
        tabBar={(props) => <NavigationBar {...props} />}
      >
        <Tab.Screen name="home" component={Home} />
        <Tab.Screen name="fila" component={Fila} />
        <Tab.Screen name="configuracoes" component={Configuracoes} />
        <Tab.Screen name="perfil" component={Perfil} />
      </Tab.Navigator>
    </FilaProvider>
  );
}
