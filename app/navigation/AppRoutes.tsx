import React from "react";
import { NavigationContainer } from "@react-navigation/native";


import  Navigation  from "./AuthNavigator";


export default function AppRoutes() {
    return(
        <NavigationContainer>
            <Navigation/>
        </NavigationContainer>
    );

}


