import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ChefHat,
  TrendingUp,
  LogOut,
  Settings,
  Menu,
  X,
} from "lucide-react";

const DashboardLayout = ({ children }) => {
  const { cafeSlug } = useParams();
  const location = useLocation();

  // STATE PINTAR UNTUK DETEKSI LAYAR
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  // DETEKSI OTOMATIS SAAT LAYAR DI-RESIZE
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
        setIsSidebarOpen(false); // Sembunyikan otomatis di HP
      } else {
        setIsMobile(false);
        setIsSidebarOpen(true); // Munculkan otomatis di PC
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "var(--bg-base)",
      }}
    >
      {/* 1. OVERLAY GELAP UNTUK MOBILE (Muncul saat sidebar dibuka di HP) */}
      {isMobile && isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.6)",
            zIndex: 90,
            backdropFilter: "blur(3px)",
          }}
        />
      )}

      {/* 2. SIDEBAR PINTAR */}
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
          background: "rgba(10, 15, 30, 0.98)",
          zIndex: 100,
          overflowY: "auto",
          // SULAP RESPONSIVENYA DI SINI:
          position: isMobile ? "fixed" : "relative",
          left: 0,
          top: 0,
          transform:
            isMobile && !isSidebarOpen ? "translateX(-100%)" : "translateX(0)",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        {/* TOMBOL CLOSE KHUSUS MOBILE */}
        {isMobile && (
          <button
            onClick={() => setIsSidebarOpen(false)}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "transparent",
              border: "none",
              color: "var(--text-muted)",
            }}
          >
            <X size={24} />
          </button>
        )}

        <div
          className="brand"
          style={{ marginBottom: "40px", marginTop: isMobile ? "10px" : "0" }}
        >
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
              onClick={() => isMobile && setIsSidebarOpen(false)} // Tutup menu kalau di HP habis di-klik
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

      {/* 3. MAIN CONTENT */}
      <main
        style={{
          flex: 1,
          height: "100vh",
          padding: "0",
          overflowY: "auto",
          position: "relative",
        }}
      >
        {/* MOBILE HEADER DENGAN HAMBURGER MENU (Hanya muncul di HP) */}
        {isMobile && (
          <div
            style={{
              padding: "15px 20px",
              display: "flex",
              alignItems: "center",
              borderBottom: "1px solid var(--glass-border)",
              background: "rgba(5, 5, 5, 0.8)",
              backdropFilter: "blur(10px)",
              position: "sticky",
              top: 0,
              zIndex: 40,
            }}
          >
            <button
              onClick={() => setIsSidebarOpen(true)}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--primary-color)",
                marginRight: "15px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Menu size={24} />
            </button>
            <h3
              className="gradient-text"
              style={{ margin: 0, fontSize: "1rem" }}
            >
              {cafeName}
            </h3>
          </div>
        )}

        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
