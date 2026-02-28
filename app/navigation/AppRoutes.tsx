import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { BottomTabBar, createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import  bottomTabNav  from "./bottomTabNav";
import  Configuracoes  from '../screens/configuracoes';
import  Fila  from '../screens/fila';
import  Home  from '../screens/fila'

const Tab = createBottomTabNavigator();

export default function NavigationBar() {
    return(
        <Tab.Navigator>

        </Tab.Navigator>
    );

}


