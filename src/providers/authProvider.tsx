import {
  createContext,
  useMemo,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

import { axiosPrivate } from "@/util/axios";

export type AuthContextType = {
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  token: string | null;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setToken: () => {},
  token: null,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const saveAndSetToken = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const contextValue = useMemo(
    () => ({
      isAuthenticated: !!token,
      setToken: saveAndSetToken,
      token,
    }),
    [token],
  );

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error),
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
    };
  }, [token]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};
