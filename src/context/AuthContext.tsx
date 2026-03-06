import { useState } from "react";
import { createContext } from "react";
import { ReactNode } from "react";

function AuthProvider(){

const [isLoggedIn, setIsLoggedIn] = useState(false);
}

function Login(): void {
  setIsLoggedIn(true);
}
function Logout(): void {
  setIsLoggedIn(false);
}


interface AuthContextType{
     isLoggedIn: Boolean;
     Login: () => void ;
     Logout: () =>  void ;
}
