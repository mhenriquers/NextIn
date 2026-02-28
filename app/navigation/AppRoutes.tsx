import React from "react";
import { NavigationContainer } from "@react-navigation/native";


import  NavigationBar  from "./NavigationBar";
import  Configuracoes  from '../screens/configuracoes';
import  Fila  from '../screens/fila';
import  Home  from '../screens/home';



export default function AppRoutes() {
    return(
        <NavigationContainer>
            <NavigationBar/>
        </NavigationContainer>
    );

}


