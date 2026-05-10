import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Layout from "./components/layout/Layout";

import DashboardPage from "./pages/DashboardPage";
import ItemsPage from "./pages/ItemsPage";
import TopCraftPage from "./pages/TopCraftPage";
import PetXPPage from "./pages/PetXPPage";
import SalesPage from "./pages/SalesPage";
import HistoryPage from "./pages/HistoryPage";
import UsersAdminPage from "./pages/UsersAdminPage";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";

export default function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* PUBLIC */}
        <Route element={<PublicRoute />}>

          <Route
            path="/login"
            element={<LoginPage />}
          />

          <Route
            path="/register"
            element={<RegisterPage />}
          />

        </Route>

        {/* PRIVATE */}
        <Route element={<ProtectedRoute />}>

          <Route element={<Layout />}>

            <Route
              path="/dashboard"
              element={<DashboardPage />}
            />

            <Route
              path="/items"
              element={<ItemsPage />}
            />

            <Route
              path="/craft/top-20"
              element={<TopCraftPage />}
            />

            <Route
              path="/pet/top-xp"
              element={<PetXPPage />}
            />

            <Route
              path="/sales"
              element={<SalesPage />}
            />

            <Route
              path="/history"
              element={<HistoryPage />}
            />

            <Route
              path="/admin/users"
              element={<UsersAdminPage />}
            />

          </Route>

        </Route>

        {/* DEFAULT */}
        <Route
          path="*"
          element={
            <Navigate
              to="/items"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}