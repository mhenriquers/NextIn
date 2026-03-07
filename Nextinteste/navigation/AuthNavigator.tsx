import { createNativeStackNavigator } from "@react-navigation/native-stack";

//telas
import Login from "../screens/login";
import Logproblem from "../screens/logproblem";

const Stack = createNativeStackNavigator();

export default function AuthNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="logproblem" component={Logproblem} />
    </Stack.Navigator>
  );
}
