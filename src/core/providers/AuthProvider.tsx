import { useMemo, useState, useEffect, ReactNode } from "react";

import {
  axiosPrivate,
  setupRequestInterceptor,
  setupResponseInterceptor,
  ejectInterceptor,
} from "@/shared/util";
import { deleteRefreshToken, refreshAccessToken } from "@/feature/auth/api";
import { AuthContext } from "@/shared/AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  const logout = async () => {
    await deleteRefreshToken();
    setToken(null);
    location.reload();
  };

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
      logout,
    }),
    [token],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
