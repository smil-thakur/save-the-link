import { Route, Routes } from "react-router";
import PublicRoutes from "./publicRoutes";
import RegisterScreen from "../screens/register_screen/registerScreen";
import LoginScreen from "../screens/login_screen/loginScreen";
import ProtectedRoute from "./protectedRoutes";
import HomeScreen from "../screens/home_screen/home_screen";

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
        path="/home"
        element={
          <ProtectedRoute>
            <HomeScreen />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
