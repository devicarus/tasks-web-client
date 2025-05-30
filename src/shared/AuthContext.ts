import { createContext } from "react";

export type AuthContextType = {
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setToken: () => {},
  logout: () => {},
});
