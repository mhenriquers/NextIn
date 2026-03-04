import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import TabNavigator from "./TabNavigator";
import AuthNavigator from "./AuthNavigator";

export default function RootNavigator() {
  const [Isloggedin, setIsLoggedin] = useState(false);
  function swap() {
    return Isloggedin ? <AuthNavigator /> : <TabNavigator />;
  }
  return swap();
}
