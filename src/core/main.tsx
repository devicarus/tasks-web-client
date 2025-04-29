import React from "react";
import ReactDOM from "react-dom/client";

import App from "@/core/App";
import { AuthProvider } from "@/feature/auth/provider.tsx";
import "@/core/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
