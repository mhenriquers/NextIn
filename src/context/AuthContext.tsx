import { createContext, useState, ReactNode, useContext } from "react";

// SEÇÃO 2: Interface (Tipagem)
interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

// SEÇÃO 3: Criar o Contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// SEÇÃO 4: AuthProvider (Função que envolve tudo)
export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function login(): void {
    setIsLoggedIn(true);
  }

  function logout(): void {
    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// SEÇÃO 5: useAuth Hook (Função para acessar o contexto)
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
}