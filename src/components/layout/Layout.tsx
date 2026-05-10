import { Link, Outlet, useLocation } from "react-router-dom";
import "./Layout.scss";

const nav = [
  { path: "/items", label: "📦 Items" },
  { path: "/craft/top-20", label: "💰 Top Craft" },
  { path: "/pet/top-xp", label: "🐾 Familiers XP" },
  { path: "/sales", label: "📈 Ventes" },
  { path: "/history", label: "📜 Historique" },
  { path: "/", label: "📊 Dashboard" },
];

export default function Layout() {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname.startsWith(path);

  return (
    <div className="layout">

      <aside className="sidebar">
        <div className="logo">⚙️ Economy Tool</div>

        <nav className="nav">
          {nav.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`link ${
                isActive(item.path) ? "active" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="main-container">

        <header className="header">
          <div className="card">
            💰 Items <strong>--</strong>
          </div>

          <div className="card">
            💎 Best craft <strong>--</strong>
          </div>

          <div className="card">
            ⚡ Avg profit <strong>--</strong>
          </div>
        </header>

        <main className="main">
          <Outlet />
        </main>

      </div>

    </div>
  );
}