import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator } from "@react-navigation/native-stack";

//telas
import  Configuracoes  from '../configuracoes';
import  Fila  from '../fila';
import  Home  from '../home';
import NavigationBar from "./NavigationBar";

const Tab = createBottomTabNavigator();
const Stack = createBottomTabNavigator();


export default function Navigation(){
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