import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  TrendingUp,
  DollarSign,
  BarChart3,
  Award,
  CheckCircle,
  Calendar,
  Download,
  Zap,
  Clock3,
  AlertTriangle,
  UserRound,
  ArrowUpRight,
  PieChart,
  Bell,
} from "lucide-react";
import "../App.css";

function OwnerDashboard() {
  const { cafeSlug } = useParams();
  const cafeName = cafeSlug
    ? cafeSlug.replace(/-/g, " ").toUpperCase()
    : "CAFE OWNER";

  // STATE UTAMA
  const [revenue, setRevenue] = useState(15450000);
  const [toastNotif, setToastNotif] = useState(null);

  // STATE: Dropdown Notifikasi (Fitur Baru)
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [savedNotifications, setSavedNotifications] = useState([
    {
      id: 1,
      text: "Laporan harian berhasil di-generate.",
      time: "1 hour ago",
      type: "info",
      read: false,
    },
    {
      id: 2,
      text: "Susu Full Cream sisa 2 karton.",
      time: "2 hours ago",
      type: "warning",
      read: false,
    },
  ]);

  const unreadCount = savedNotifications.filter((n) => !n.read).length;

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  // DATA DUMMY PEAK HOURS
  const peakHours = [
    { hour: "10:00", load: 20 },
    { hour: "13:00", load: 45 },
    { hour: "16:00", load: 30 },
    { hour: "19:00", load: 95 }, // Peak Hour
    { hour: "22:00", load: 60 },
  ];

  const weeklyData = [
    { day: "Mon", total: 1200000 },
    { day: "Tue", total: 1500000 },
    { day: "Wed", total: 900000 },
    { day: "Thu", total: 1800000 },
    { day: "Fri", total: 2100000 },
    { day: "Sat", total: 2800000 },
    { day: "Sun", total: 2500000 },
  ];

  const maxSales = Math.max(...weeklyData.map((d) => d.total));

  // SIMULASI REAL-TIME NOTIFIKASI CUAN (Diupdate agar masuk ke dropdown)
  useEffect(() => {
    const timer = setTimeout(() => {
      const salesAmount = 45000;
      const notifText = `Pembayaran Masuk: ${formatRupiah(salesAmount)} (Meja 07)`;

      // Munculkan Toast
      setToastNotif(notifText);
      setRevenue((prev) => prev + salesAmount);

      // Simpan ke riwayat dropdown
      setSavedNotifications((prev) => [
        {
          id: Date.now(),
          text: notifText,
          time: "Just now",
          type: "success",
          read: false,
        },
        ...prev,
      ]);

      // Hilangkan toast setelah 5 detik
      setTimeout(() => setToastNotif(null), 5000);
    }, 12000);
    return () => clearTimeout(timer);
  }, []);

  // HANDLER EXPORT
  const handleExport = () => {
    setToastNotif("Generating Report... Please wait");
    setTimeout(() => {
      setToastNotif("Report Downloaded Successfully! (.csv)");
      setTimeout(() => setToastNotif(null), 3000);
    }, 2000);
  };

  const markAllAsRead = () => {
    setSavedNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div
      className="app-container"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      {/* TOAST NOTIFIKASI GLOBAL */}
      {toastNotif && (
        <div
          className="glass-panel pulse-anim"
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999,
            padding: "12px 25px",
            borderRadius: "50px",
            border: "1px solid var(--success-color)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "rgba(16, 185, 129, 0.2)",
            backdropFilter: "blur(15px)",
            animation: "fadeUp 0.5s ease-out",
          }}
        >
          <CheckCircle style={{ color: "var(--success-color)" }} size={18} />
          <span
            style={{ fontWeight: "700", fontSize: "0.85rem", color: "#fff" }}
          >
            {toastNotif}
          </span>
        </div>
      )}

      {/* HEADER BARU: Utility & Notification Center */}
      <header
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "20px",
          padding: "15px 30px",
          borderBottom: "1px solid var(--glass-border)",
          background: "rgba(5, 5, 5, 0.5)",
          backdropFilter: "blur(10px)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <button
          className="neon-btn"
          onClick={handleExport}
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
            padding: "8px 16px",
          }}
        >
          <Download size={14} /> Export Report
        </button>

        {/* NOTIFICATION BELL */}
        <div style={{ position: "relative" }}>
          <button
            className="neon-btn"
            style={{
              padding: "8px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: isNotifOpen
                ? "rgba(0, 242, 254, 0.2)"
                : "transparent",
            }}
            onClick={() => setIsNotifOpen(!isNotifOpen)}
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span
                className="pulse-anim"
                style={{
                  position: "absolute",
                  top: "-2px",
                  right: "-2px",
                  background: "#ff4757",
                  color: "#fff",
                  fontSize: "0.6rem",
                  fontWeight: "bold",
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {unreadCount}
              </span>
            )}
          </button>

          {/* DROPDOWN NOTIFICATION */}
          {isNotifOpen && (
            <div
              className="glass-panel"
              style={{
                position: "absolute",
                top: "120%",
                right: 0,
                width: "320px",
                padding: "15px",
                borderRadius: "16px",
                zIndex: 100,
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                animation: "fadeUp 0.2s ease-out",
                background: "rgba(10, 11, 16, 0.98)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "15px",
                  borderBottom: "1px solid var(--glass-border)",
                  paddingBottom: "10px",
                }}
              >
                <h4 style={{ margin: 0, fontSize: "0.9rem" }}>Notifications</h4>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "var(--primary-color)",
                      fontSize: "0.7rem",
                      cursor: "pointer",
                    }}
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  maxHeight: "300px",
                  overflowY: "auto",
                }}
              >
                {savedNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    style={{
                      padding: "10px",
                      borderRadius: "8px",
                      background: notif.read
                        ? "rgba(255,255,255,0.02)"
                        : "rgba(0, 242, 254, 0.05)",
                      borderLeft:
                        notif.type === "success"
                          ? "3px solid var(--success-color)"
                          : notif.type === "warning"
                            ? "3px solid #facc15"
                            : "3px solid var(--primary-color)",
                      opacity: notif.read ? 0.6 : 1,
                    }}
                  >
                    <p
                      style={{
                        fontSize: "0.75rem",
                        margin: "0 0 5px 0",
                        color: "#fff",
                      }}
                    >
                      {notif.text}
                    </p>
                    <span
                      style={{
                        fontSize: "0.65rem",
                        color: "var(--text-muted)",
                      }}
                    >
                      {notif.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="content-area" style={{ width: "100%" }}>
        {/* POIN 3: STATUS LANGGANAN SAAS */}
        <div
          className="glass-panel"
          style={{
            padding: "15px 20px",
            borderRadius: "18px",
            marginBottom: "24px",
            border: "1px solid rgba(0, 242, 254, 0.3)",
            background:
              "linear-gradient(90deg, rgba(0, 242, 254, 0.05) 0%, transparent 100%)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <Zap size={20} className="gradient-text" />
            <div>
              <p
                style={{
                  fontSize: "0.7rem",
                  color: "var(--text-muted)",
                  margin: 0,
                }}
              >
                SERVICE SUBSCRIPTION
              </p>
              <h4 style={{ fontSize: "0.9rem", margin: 0 }}>
                Status:{" "}
                <span style={{ color: "var(--success-color)" }}>ACTIVE</span>
              </h4>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <p
              style={{
                fontSize: "0.6rem",
                color: "var(--text-muted)",
                margin: 0,
              }}
            >
              DAYS REMAINING
            </p>
            <p
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
                color: "#facc15",
                margin: 0,
              }}
            >
              12 Days Left
            </p>
          </div>
        </div>

        {/* STATS GRID */}
        <div className="menu-grid" style={{ marginBottom: "24px" }}>
          <div
            className="glass-panel"
            style={{ padding: "20px", borderRadius: "20px" }}
          >
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.75rem",
                marginBottom: "8px",
              }}
            >
              GROSS REVENUE
            </p>
            <h2
              className="gradient-text"
              style={{ fontSize: "1.8rem", margin: 0 }}
            >
              {formatRupiah(revenue)}
            </h2>
            <div
              style={{
                color: "var(--success-color)",
                fontSize: "0.7rem",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                marginTop: "8px",
              }}
            >
              <ArrowUpRight size={14} /> +12.5% this month
            </div>
          </div>
          <div
            className="glass-panel"
            style={{ padding: "20px", borderRadius: "20px" }}
          >
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.75rem",
                marginBottom: "8px",
              }}
            >
              TOTAL ORDERS
            </p>
            <h2 style={{ fontSize: "1.8rem", margin: 0 }}>
              {revenue > 15450000 ? 453 : 452}
            </h2>
            <p
              style={{
                fontSize: "0.7rem",
                color: "var(--text-muted)",
                marginTop: "8px",
                margin: 0,
              }}
            >
              Avg. per order: {formatRupiah(34181)}
            </p>
          </div>
        </div>

        {/* INVENTORY ALERT */}
        <section style={{ marginBottom: "30px" }}>
          <div
            className="glass-panel"
            style={{
              padding: "15px 20px",
              borderRadius: "18px",
              border: "1px solid #facc15",
              background: "rgba(250, 204, 21, 0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "#facc15",
                marginBottom: "8px",
              }}
            >
              <AlertTriangle size={18} />
              <h4 style={{ margin: 0, fontSize: "0.9rem" }}>
                Low Stock Warning
              </h4>
            </div>
            <div
              style={{
                fontSize: "0.8rem",
                color: "var(--text-main)",
                opacity: 0.9,
              }}
            >
              • Bubuk Matcha Premium (Sisa 5 Porsi) <br />• Susu Full Cream
              (Sisa 2 Karton)
            </div>
          </div>
        </section>

        {/* STAFF EFFICIENCY */}
        <h3
          className="section-title"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <UserRound size={18} className="gradient-text" /> Staff Performance
        </h3>
        <div
          className="glass-panel"
          style={{
            padding: "20px",
            borderRadius: "20px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "0.7rem",
                  color: "var(--text-muted)",
                  margin: 0,
                }}
              >
                AVG. SERVING TIME
              </p>
              <h2 className="gradient-text" style={{ margin: "5px 0" }}>
                8.4 Min
              </h2>
            </div>
            <div style={{ textAlign: "right" }}>
              <p
                style={{
                  fontSize: "0.7rem",
                  color: "var(--text-muted)",
                  margin: 0,
                }}
              >
                KPI STATUS
              </p>
              <span
                style={{
                  color: "var(--success-color)",
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                }}
              >
                EXCELLENT
              </span>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              height: "6px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "10px",
              marginTop: "15px",
            }}
          >
            <div
              style={{
                width: "85%",
                height: "100%",
                background: "var(--primary-gradient)",
                borderRadius: "10px",
                boxShadow: "0 0 10px rgba(0,242,254,0.3)",
              }}
            ></div>
          </div>
        </div>

        {/* PEAK HOURS CHART */}
        <h3
          className="section-title"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <Clock3 size={18} className="gradient-text" /> Customer Peak Hours
        </h3>
        <div
          className="glass-panel"
          style={{
            padding: "24px",
            borderRadius: "24px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              height: "120px",
              gap: "15px",
            }}
          >
            {peakHours.map((data, index) => (
              <div
                key={index}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: `${data.load}%`,
                    background:
                      data.load > 80
                        ? "linear-gradient(to top, #ff4757, #ff6b81)"
                        : "rgba(0, 242, 254, 0.2)",
                    borderRadius: "4px",
                    position: "relative",
                    border:
                      data.load > 80
                        ? "none"
                        : "1px solid rgba(0, 242, 254, 0.1)",
                  }}
                >
                  {data.load > 80 && (
                    <div
                      className="pulse-anim"
                      style={{
                        position: "absolute",
                        top: "-5px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "100%",
                        height: "5px",
                        background: "#ff4757",
                        borderRadius: "50%",
                      }}
                    ></div>
                  )}
                </div>
                <span
                  style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}
                >
                  {data.hour}
                </span>
              </div>
            ))}
          </div>
          <p
            style={{
              fontSize: "0.7rem",
              color: "var(--text-muted)",
              marginTop: "20px",
              textAlign: "center",
              margin: "20px 0 0 0",
            }}
          >
            💡 Recommended shift: Increase staff at{" "}
            <span style={{ color: "#ff4757", fontWeight: "bold" }}>19:00</span>
          </p>
        </div>

        {/* BEST SELLER MOCKUP */}
        <div
          className="glass-panel"
          style={{
            padding: "20px",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              background: "rgba(16, 185, 129, 0.1)",
              padding: "15px",
              borderRadius: "15px",
              color: "var(--success-color)",
            }}
          >
            <Award size={28} />
          </div>
          <div>
            <p
              style={{
                fontSize: "0.7rem",
                color: "var(--text-muted)",
                margin: 0,
              }}
            >
              MOST POPULAR PRODUCT
            </p>
            <h4 style={{ fontSize: "1.1rem", margin: "4px 0" }}>
              Aero-Brew Teh Tarik
            </h4>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <span
                style={{
                  fontSize: "0.8rem",
                  color: "var(--success-color)",
                  fontWeight: "bold",
                }}
              >
                128 Sales
              </span>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                • This Month
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default OwnerDashboard;
