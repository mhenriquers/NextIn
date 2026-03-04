import { createNativeStackNavigator } from "@react-navigation/native-stack";
  
import Login from "../screens/login";
import Logproblem from "../screens/logproblem";


const stack = createNativeStackNavigator();

export default function AppNavigator(){
    return(
        <stack.Navigator>
            <stack.Screen name='login' component={Login}/>
            <stack.Screen name='logproblem' component={Logproblem}/>

        </stack.Navigator>

    );
}