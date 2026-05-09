import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const API_URL = "http://127.0.0.1:3000";

export default function Dashboard() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/items`)
      .then((res) => res.json())
      .then(setItems);
  }, []);

  const data = items.map((i) => ({
    name: i.name,
    profit:
      i.price && i.petXp
        ? i.price / (i.petXp || 1)
        : 0,
  }));

  return (
    <div>
      <h2>📊 Overview</h2>

      <div style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="name" hide />
            <Tooltip />
            <Line type="monotone" dataKey="profit" stroke="#3b82f6" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}