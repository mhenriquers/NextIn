import {createNativeStackNavigator } from "@react-navigation/native-stack";

//telas
import Logproblem from "../logproblem";
import Login from "../screens/login";


const Stack = createNativeStackNavigator();


export default function AuthNavigation(){
  return(
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="logproblem" component={Logproblem} />
      </Stack.Navigator>
  );
}