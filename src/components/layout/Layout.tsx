import { Link, Outlet, useLocation } from "react-router-dom";

const nav = [
  { path: "/", label: "📦 Ressources" },
  { path: "/craft/top-20", label: "💰 Top Craft" },
  { path: "/pet/top-10-xp", label: "🐾 Familiers XP" },
  { path: "/sales", label: "📈 Ventes" },
  { path: "/history", label: "📜 Historique" },
];

export default function Layout() {
  const location = useLocation();

  return (
    <div style={styles.container}>
      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <div style={styles.logo}>⚙️ Economy Tool</div>

        <nav style={styles.nav}>
          {nav.map((item) => {
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  ...styles.link,
                  ...(active ? styles.active : {}),
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* MAIN */}
      <div style={styles.mainContainer}>
        {/* HEADER KPI */}
        <header style={styles.header}>
          <div style={styles.card}>
            💰 Total items
            <strong>--</strong>
          </div>

          <div style={styles.card}>
            📈 Best craft
            <strong>--</strong>
          </div>

          <div style={styles.card}>
            ⚡ Profit moyen
            <strong>--</strong>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main style={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

const styles: any = {
  container: {
    display: "flex",
    minHeight: "100vh",
    background: "#0b1220",
    color: "white",
    fontFamily: "Arial",
  },

  sidebar: {
    width: 260,
    background: "#0f172a",
    borderRight: "1px solid #1e293b",
    padding: 20,
  },

  logo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 25,
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  link: {
    padding: "10px 12px",
    borderRadius: 10,
    textDecoration: "none",
    color: "#94a3b8",
    transition: "0.2s",
  },

  active: {
    background: "#2563eb",
    color: "white",
    fontWeight: "bold",
  },

  mainContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },

  header: {
    display: "flex",
    gap: 12,
    padding: 20,
  },

  card: {
    flex: 1,
    background: "#111827",
    padding: 16,
    borderRadius: 12,
    border: "1px solid #1f2937",
  },

  main: {
    padding: 20,
  },
};