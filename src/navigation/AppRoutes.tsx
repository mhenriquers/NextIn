import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./RootNavigator";
import { AuthProvider } from "../context/AuthContext";



export default function AppRoutes() {
    return(
        <AuthProvider>
        <NavigationContainer>
            <RootNavigator/>
        </NavigationContainer>
        </AuthProvider>
    );

}


