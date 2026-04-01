import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Clock,
  AlertTriangle,
  PackageCheck,
  Bell,
  CheckCircle2,
  Info,
} from "lucide-react";
import { menuData } from "../data/menuData";
import "../App.css";

function AdminDashboard() {
  const { cafeSlug } = useParams();

  // STATE: Kontrol Stok & Toast
  const [stockStatus, setStockStatus] = useState({});
  const [toastNotif, setToastNotif] = useState(null);

  // STATE: Dropdown Notifikasi (Fitur Baru)
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [savedNotifications, setSavedNotifications] = useState([
    {
      id: 1,
      text: "Meja 04 meminta bill/pembayaran.",
      time: "2 min ago",
      type: "alert",
      read: false,
    },
    {
      id: 2,
      text: "Pesanan #TGC-123456 telat 15 menit!",
      time: "5 min ago",
      type: "warning",
      read: false,
    },
    {
      id: 3,
      text: "Susu Full Cream sisa 2 karton.",
      time: "1 hour ago",
      type: "info",
      read: true,
    },
  ]);

  const unreadCount = savedNotifications.filter((n) => !n.read).length;

  // Fitur Panggil Pelayan
  const [serviceRequests, setServiceRequests] = useState([
    { id: 1, table: "MEJA 04", type: "Panggil Pelayan", time: "14:45" },
  ]);

  // Data Orders
  const [orders, setOrders] = useState([
    {
      id: "#TGC-123456",
      table: "MEJA 29",
      items: [{ name: "Aero-Brew Teh Tarik", qty: 2 }],
      status: "PENDING",
      startTime: Date.now() - 600000, // 10 menit lalu
    },
  ]);

  // Fungsi Update Timer
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const getElapsedTime = (startTime) => {
    return Math.floor((now - startTime) / 60000);
  };

  const toggleStock = (id) => {
    setStockStatus((prev) => ({ ...prev, [id]: !prev[id] }));
    // Simulasi toast saat toggle stock
    setToastNotif("Status stok berhasil diubah.");
    setTimeout(() => setToastNotif(null), 3000);
  };

  const markAllAsRead = () => {
    setSavedNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div
      className="app-container"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      {/* TOAST NOTIFICATION (Pop-up singkat) */}
      {toastNotif && (
        <div
          className="glass-panel pulse-anim"
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 9999,
            padding: "12px 20px",
            borderRadius: "12px",
            border: "1px solid var(--primary-color)",
            background: "rgba(5,5,5,0.9)",
          }}
        >
          <span style={{ fontSize: "0.8rem", color: "#fff" }}>
            {toastNotif}
          </span>
        </div>
      )}

      {/* HEADER BARU: Hanya berisi Notification Center */}
      <header
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "15px 30px",
          borderBottom: "1px solid var(--glass-border)",
          background: "rgba(5, 5, 5, 0.5)",
          backdropFilter: "blur(10px)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        {/* BELL ICON WRAPPER */}
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

          {/* DROPDOWN NOTIFICATION PANEL */}
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
                        notif.type === "alert"
                          ? "3px solid #ff4757"
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
        {/* SECTION PANGGIL PELAYAN */}
        {serviceRequests.length > 0 && (
          <section style={{ marginBottom: "30px" }}>
            <h3
              className="section-title"
              style={{
                color: "#ff4757",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <AlertTriangle size={16} /> Service Requests
            </h3>
            {serviceRequests.map((req) => (
              <div
                key={req.id}
                className="glass-panel pulse-anim"
                style={{
                  padding: "12px 20px",
                  borderRadius: "12px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1px solid #ff4757",
                  marginBottom: "10px",
                }}
              >
                <div>
                  <span style={{ fontWeight: "700", color: "#ff4757" }}>
                    {req.table}
                  </span>
                  <p style={{ fontSize: "0.8rem", margin: 0 }}>{req.type}</p>
                </div>
                <button
                  className="neon-btn"
                  style={{ borderColor: "#ff4757", color: "#ff4757" }}
                  onClick={() => setServiceRequests([])}
                >
                  Selesaikan
                </button>
              </div>
            ))}
          </section>
        )}

        {/* ORDER LIST DENGAN TIMER */}
        <section>
          <h3
            className="section-title"
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <Clock size={16} /> Active Orders
          </h3>
          <div className="menu-grid">
            {orders.map((order) => {
              const minutes = getElapsedTime(order.startTime);
              const isLate = minutes >= 15;

              return (
                <div
                  key={order.id}
                  className="menu-card glass-panel"
                  style={{
                    padding: "15px",
                    border: isLate
                      ? "1px solid #ff4757"
                      : "1px solid var(--glass-border)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                  >
                    <span
                      className="order-id"
                      style={{ fontSize: "0.65rem", padding: "2px 8px" }}
                    >
                      {order.id}
                    </span>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        color: isLate ? "#ff4757" : "var(--text-muted)",
                        fontWeight: "bold",
                      }}
                    >
                      {minutes}m ago
                    </span>
                  </div>
                  <h3
                    style={{
                      fontSize: "1.2rem",
                      color: isLate ? "#ff4757" : "var(--primary-color)",
                    }}
                  >
                    {order.table}
                  </h3>
                  <div style={{ margin: "15px 0" }}>
                    {order.items.map((it, idx) => (
                      <div
                        key={idx}
                        style={{
                          fontSize: "0.85rem",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span style={{ color: "var(--text-muted)" }}>
                          {it.name}
                        </span>
                        <span
                          style={{
                            fontWeight: "700",
                            color: "var(--primary-color)",
                          }}
                        >
                          x{it.qty}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button
                    className="btn-primary"
                    style={{
                      padding: "10px",
                      fontSize: "0.8rem",
                      width: "100%",
                    }}
                    onClick={() => setOrders([])}
                  >
                    Selesaikan Pesanan
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* INVENTORY CONTROL */}
        <section style={{ marginTop: "40px" }}>
          <h3
            className="section-title"
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <PackageCheck size={16} /> Quick Stock Toggle
          </h3>
          <div
            style={{
              display: "flex",
              gap: "10px",
              overflowX: "auto",
              paddingBottom: "10px",
            }}
          >
            {menuData.slice(0, 5).map((item) => (
              <div
                key={item.id}
                className="glass-panel"
                style={{
                  minWidth: "120px",
                  padding: "12px",
                  borderRadius: "12px",
                  opacity: stockStatus[item.id] ? 0.4 : 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <p
                  style={{
                    fontSize: "0.65rem",
                    marginBottom: "12px",
                    lineHeight: "1.4",
                  }}
                >
                  {item.name}
                </p>
                <button
                  className="neon-btn"
                  style={{ width: "100%", fontSize: "0.6rem", padding: "6px" }}
                  onClick={() => toggleStock(item.id)}
                >
                  {stockStatus[item.id] ? "Set Tersedia" : "Set Habis"}
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;
