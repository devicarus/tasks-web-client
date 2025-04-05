import {
  createContext,
  useMemo,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

import {
  axiosPrivate,
  setupRequestInterceptor,
  setupResponseInterceptor,
  ejectInterceptor,
} from "@/shared/util";
import { refreshAccessToken } from "@/feature/auth/api";

export type AuthContextType = {
  isAuthenticated: boolean;
  setToken: (token: string) => void;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setToken: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) setToken(newAccessToken);
    };

    initializeAuth();
  }, []);

  useEffect(() => {
    const requestIntercept = setupRequestInterceptor(axiosPrivate, token);

    return () => ejectInterceptor(axiosPrivate, requestIntercept);
  }, [token]);

  useEffect(() => {
    const responseIntercept = setupResponseInterceptor(axiosPrivate, setToken);

    return () => ejectInterceptor(axiosPrivate, responseIntercept);
  }, [setToken]);

  const contextValue = useMemo(
    () => ({
      isAuthenticated: !!token,
      setToken,
    }),
    [token],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};
