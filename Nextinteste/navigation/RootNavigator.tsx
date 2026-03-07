import React from "react";
import { useAuth } from "../context/AuthContext";
import TabNavigator from "./TabNavigator";
import AuthNavigator from "./AuthNavigator";

export default function RootNavigator() {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <TabNavigator /> : <AuthNavigator />;
}