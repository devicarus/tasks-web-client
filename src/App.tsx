import { createRouter, RouterProvider } from "@tanstack/react-router";

import { useAuth } from "@/providers/authProvider";
import routeTree from "@/routes";

const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },
});

function App() {
  const auth = useAuth();

  return <RouterProvider context={{ auth }} router={router} />;
}

export default App;
