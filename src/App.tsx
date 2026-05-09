import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Layout from "./components/layout/Layout";

import DashboardPage from "./pages/DashboardPage";
import ItemsPage from "./pages/ItemsPage";
import TopCraftPage from "./pages/TopCraftPage";
import PetXPPage from "./pages/PetXPPage";
import SalesHistoryPage from "./pages/SalesHistoryPage";

export default function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route element={<Layout />}>

          <Route
            path="/"
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
            element={<SalesHistoryPage />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}