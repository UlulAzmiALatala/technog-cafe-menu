import { Link, useParams, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ChefHat,
  TrendingUp,
  LogOut,
  Settings,
} from "lucide-react";

const DashboardLayout = ({ children }) => {
  const { cafeSlug } = useParams();
  const location = useLocation();

  const cafeName = cafeSlug
    ? cafeSlug.replace(/-/g, " ").toUpperCase()
    : "CAFE DASHBOARD";

  const menuItems = [
    {
      name: "Orders (Admin)",
      path: `/admin/${cafeSlug}`,
      icon: <ChefHat size={20} />,
    },
    {
      name: "Analytics (Owner)",
      path: `/owner/${cafeSlug}`,
      icon: <TrendingUp size={20} />,
    },
    { name: "Settings", path: "#", icon: <Settings size={20} /> },
  ];

  return (
    // 1. CONTAINER UTAMA: Kunci tinggi persis 100vh dan matikan scroll body
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "var(--bg-base)",
      }}
    >
      {/* 2. SIDEBAR: Kunci tinggi 100vh, jangan biarkan menyusut (flexShrink: 0) */}
      <aside
        className="glass-panel"
        style={{
          width: "260px",
          height: "100vh",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          padding: "24px",
          borderRadius: 0,
          borderRight: "1px solid var(--glass-border)",
          borderTop: "none",
          borderBottom: "none",
          borderLeft: "none",
          background: "rgba(10, 15, 30, 0.95)",
          zIndex: 100,
          overflowY: "auto", // Jaga-jaga kalau menu di sidebar makin banyak
        }}
      >
        <div className="brand" style={{ marginBottom: "40px" }}>
          <div
            className="brand-logo"
            style={{ background: "var(--primary-gradient)" }}
          >
            {cafeName[0]}
          </div>
          <h2
            className="gradient-text"
            style={{ fontSize: "1.2rem", margin: 0 }}
          >
            {cafeName}
          </h2>
        </div>

        <nav style={{ flex: 1 }}>
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                borderRadius: "12px",
                textDecoration: "none",
                color:
                  location.pathname === item.path
                    ? "var(--primary-color)"
                    : "var(--text-muted)",
                marginBottom: "8px",
                background:
                  location.pathname === item.path
                    ? "rgba(0, 242, 254, 0.1)"
                    : "transparent",
                border:
                  location.pathname === item.path
                    ? "1px solid rgba(0, 242, 254, 0.2)"
                    : "1px solid transparent",
                transition: "var(--transition)",
              }}
            >
              {item.icon}
              <span style={{ fontWeight: "600", fontSize: "0.9rem" }}>
                {item.name}
              </span>
            </Link>
          ))}
        </nav>

        <div
          style={{
            borderTop: "1px solid var(--glass-border)",
            paddingTop: "20px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "0.65rem",
              color: "var(--text-muted)",
              marginBottom: "15px",
              letterSpacing: "0.5px",
            }}
          >
            SYSTEM POWERED BY <br />
            <strong
              style={{ color: "var(--primary-color)", fontSize: "0.8rem" }}
            >
              TechnoG Solutions
            </strong>
          </p>
          <button
            className="neon-btn"
            style={{
              width: "100%",
              display: "flex",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* 3. MAIN CONTENT: Scroll mandiri khusus area konten ini saja */}
      <main
        style={{
          flex: 1,
          height: "100vh",
          padding: "0",
          overflowY: "auto",
          position: "relative",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
