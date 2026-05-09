import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import ItemsTable from "./pages/ItemsTable";
import Dashboard from "./pages/Dashboard";
import SalesHistory from "./pages/SalesHistory";
import Top20Craft from "./pages/Top20Craft";

const PetXP = () => <div>Top XP Familier</div>;

export default function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route element={<Layout />}>

          {/* ITEMS */}
          <Route
            path="/"
            element={<ItemsTable />}
          />

          <Route
            path="/items"
            element={<ItemsTable />}
          />

          {/* TOP CRAFT */}
          <Route
            path="/craft/top-20"
            element={<Top20Craft />}
          />

          {/* PET XP */}
          <Route
            path="/pet/top-10-xp"
            element={<PetXP />}
          />

          {/* SALES */}
          <Route
            path="/sales"
            element={<SalesHistory />}
          />

          {/* DASHBOARD */}
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}