import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native"; // ESSENCIAL
import { AuthProvider } from "./src/context/AuthContext";
import AuthNavigation from "./src/navigation/AuthNavigator";

function Root() {
  return (
    <NavigationContainer>
      <AuthProvider>
        {/* Agora chamamos o Navegador, não a tela solta */}
        <AuthNavigation />
      </AuthProvider>
    </NavigationContainer>
  );
}

registerRootComponent(Root);
