import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//telas
import  Configuracoes  from '../configuracoes';
import  Fila  from '../fila';
import  Home  from '../home';
import NavigationBar from "./NavigationBar";

const Tab = createBottomTabNavigator();


export default function TabNavigator(){
  return(
    <Tab.Navigator
    tabBar={(props) => <NavigationBar {...props}/>}
    >
      <Tab.Screen name='home' component={Home}/>
      <Tab.Screen name='configuracoes' component={Configuracoes}/>
      <Tab.Screen name='fila' component={Fila}/>
      
    </Tab.Navigator>
  );
} 