import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import TabNavigator from "./TabNavigator";
import AuthNavigator from "./AuthNavigator";
import { useAuth } from "../context/AuthContext";

export default function RootNavigator() {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <TabNavigator /> : <AuthNavigator />;
}
