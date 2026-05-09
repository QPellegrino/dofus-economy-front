import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import ItemsTable from "./pages/ItemsTable";
import Dashboard from "./pages/Dashboard";
import SalesHistory from "./pages/SalesHistory";

const TopCraft = () => <div>Top 20 Craft</div>;
const PetXP = () => <div>Top XP Familier</div>;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ItemsTable />} />
          <Route path="/items" element={<ItemsTable />} />

          <Route path="/craft/top-20" element={<TopCraft />} />
          <Route path="/pet/top-10-xp" element={<PetXP />} />

          {/* 📈 HISTORIQUE AVEC GRAPHIQUE */}
          <Route path="/sales" element={<SalesHistory />} />

          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}