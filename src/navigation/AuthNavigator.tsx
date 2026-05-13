import { createNativeStackNavigator } from "@react-navigation/native-stack";

//telas
import Login from "../screens/login";
import Logproblem from "../screens/logproblem";
import { useAuth } from "../context/AuthContext";
import TabNavigator from "./TabNavigator";

const Stack = createNativeStackNavigator();

export default function AuthNavigation() {
  const { isLoggedIn } = useAuth(); // pega a informação de estar logado
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <>
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </>
      ) : (
        <>
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="logproblem" component={Logproblem} />
        </>
      )}
    </Stack.Navigator>
  );
}
