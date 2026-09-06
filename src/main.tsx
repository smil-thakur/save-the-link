import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-sans/700.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import AppThemeProvider from "./theme/AppThemeProvider.tsx";
import { ThemeModeProvider } from "./context/themeModeContext.tsx";
import AuthProvider from "./context/authContext.tsx";
import ToastProvider from "./context/toastContext.tsx";
import ColdStartGate from "./components/ColdStartGate.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import { MainRoutes } from "./routes/mainRoutes.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeModeProvider>
        <AppThemeProvider>
          <ColdStartGate>
            <AuthProvider>
              <ToastProvider>
                <BrowserRouter>
                  <MainRoutes />
                </BrowserRouter>
              </ToastProvider>
            </AuthProvider>
          </ColdStartGate>
        </AppThemeProvider>
      </ThemeModeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
