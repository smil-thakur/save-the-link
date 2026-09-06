import { Navigate, Route, Routes } from "react-router";
import PublicRoutes from "./publicRoutes";
import RegisterScreen from "../screens/register_screen/registerScreen";
import LoginScreen from "../screens/login_screen/loginScreen";
import ProtectedRoute from "./protectedRoutes";
import HomeScreen from "../screens/home_screen/home_screen";
import PageScreen from "../screens/page_screen/pageScreen";
import PublicPageScreen from "../screens/public_page_screen/publicPageScreen";
import SettingsScreen from "../screens/settings_screen/settingsScreen";
import AppLayout from "../layouts/AppLayout";

export const MainRoutes = () => {
  return (
    <Routes>
      <Route
        path="/register"
        element={
          <PublicRoutes>
            <RegisterScreen />
          </PublicRoutes>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoutes>
            <LoginScreen />
          </PublicRoutes>
        }
      />
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/pages/:pageId" element={<PageScreen />} />
        <Route path="/settings" element={<SettingsScreen />} />
      </Route>
      <Route path="/p/:slug" element={<PublicPageScreen />} />
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};
