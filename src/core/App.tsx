import { createRouter, RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useAuth } from "@/feature/auth/provider.tsx";
import routeTree from "@/core/router";

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
    queryClient,
  },
  defaultPreload: "intent",
});

function App() {
  const auth = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider context={{ auth, queryClient }} router={router} />
    </QueryClientProvider>
  );
}

export default App;
