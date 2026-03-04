import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import Logproblem from "../logproblem";
import Login from "../screens/login";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";




function swap(){
    const [Isloggedin, setIsLoggedin] = useState(false)

    return  Isloggedin? <AuthNavigator/> : <AppNavigator/>;
}

export default function RootNavigator() {
  return (
    <NavigationContainer>
        {swap()}
    </NavigationContainer>
  );
}
