import "./App.css";
import { LoginPage } from "./pages/Login/Login";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "react-query";
import { NotificationsProvider } from "@mantine/notifications";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { Dashboard } from "./pages/Dashboard";
import { NotFoundPage } from "./pages/NotFoundPage";
import { RequireAuth } from "./components/RequireAuth";
import { HeaderMegaMenu } from "./components/HeaderMegaMenu";

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
    },
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <NotificationsProvider position="top-right" zIndex={2077}>
          <BrowserRouter>
            <HeaderMegaMenu />
            <Routes>
              <Route path={routes.app.main} element={<RequireAuth />}>
                <Route index element={<Dashboard />} />
              </Route>
              <Route path={routes.app.login} element={<LoginPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </NotificationsProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
