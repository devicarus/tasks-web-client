import { useContext } from "react";

import { AuthContext, AuthContextType } from "@/shared/AuthContext";

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};
