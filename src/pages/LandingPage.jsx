import { useNavigate } from "react-router-dom";
import {
  QrCode,
  MonitorSmartphone,
  LineChart,
  CheckCircle2,
  ChevronRight,
  Zap,
  TrendingUp,
  ShieldCheck,
  Mail,
  Minus,
} from "lucide-react";
import "../App.css";

function LandingPage() {
  const navigate = useNavigate();

  const benefits = [
    {
      title: "Kontrol Transaksi Jelas",
      desc: "Setiap pesanan dan pembayaran terekam otomatis di sistem, mencegah kebocoran dana.",
      icon: <ShieldCheck size={32} className="gradient-text" />,
    },
    {
      title: "Laporan Real-Time",
      desc: "Owner dapat memantau aktivitas bisnis, omset, dan laporan performa kapan saja & di mana saja.",
      icon: <LineChart size={32} className="gradient-text" />,
    },
    {
      title: "Operasional Terstruktur",
      desc: "Mengurangi antrean di kasir, mempercepat proses pesanan langsung ke dapur/barista.",
      icon: <TrendingUp size={32} className="gradient-text" />,
    },
  ];

  // DATA TABEL HARGA DARI PPT
  const featureComparison = [
    {
      name: "QR Code pemesanan + customize nomor meja",
      basic: true,
      advance: true,
    },
    { name: "Menu Digital Interaktif", basic: true, advance: true },
    {
      name: "Integrasi pembayaran (QRIS, VA, Cash)",
      basic: true,
      advance: true,
    },
    { name: "Notifikasi email pelanggan", basic: true, advance: true },
    { name: "Struk digital / printed", basic: "Additional", advance: true },
    { name: "Notifikasi email owner", basic: false, advance: true },
    { name: "Laporan Keuangan real-time", basic: false, advance: true },
    { name: "Dashboard monitoring bisnis", basic: false, advance: true },
    {
      name: "Website Sendiri (customize domain) + Work email",
      basic: false,
      advance: true,
    },
    {
      name: "Analisis pola bisnis & data pelanggan",
      basic: false,
      advance: true,
    },
  ];

  return (
    <div
      className="app-container"
      style={{
        minHeight: "100vh",
        overflowY: "auto",
        background: "var(--bg-base)",
      }}
    >
      {/* NAVBAR */}
      <header
        className="glass-header"
        style={{ position: "sticky", top: 0, zIndex: 100 }}
      >
        <div className="brand">
          <div
            className="brand-logo"
            style={{ background: "var(--primary-gradient)" }}
          >
            T
          </div>
          <div>
            <h2
              className="gradient-text"
              style={{ fontSize: "1.2rem", margin: 0 }}
            >
              TechnoG Solutions
            </h2>
            <a
              href="https://technogsolutionss.com"
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize: "0.6rem",
                color: "var(--text-muted)",
                textDecoration: "none",
              }}
            >
              technogsolutionss.com
            </a>
          </div>
        </div>
        <button className="neon-btn" onClick={() => navigate("/warkop-abah")}>
          System Preview 🚀
        </button>
      </header>

      <main
        style={{ padding: "40px 20px", maxWidth: "1000px", margin: "0 auto" }}
      >
        {/* HERO SECTION */}
        <section
          style={{
            textAlign: "center",
            padding: "60px 0",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(0, 242, 254, 0.1)",
              padding: "6px 16px",
              borderRadius: "50px",
              color: "var(--primary-color)",
              fontSize: "0.8rem",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            <Zap size={14} /> Solusi Digital Coffee Shop
          </div>
          <h1
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: "800",
              marginBottom: "10px",
              lineHeight: "1.1",
              textTransform: "uppercase",
            }}
          >
            <span className="gradient-text">SMART CASHIER</span> SYSTEM
          </h1>
          <h3
            style={{
              fontSize: "1.2rem",
              color: "var(--text-main)",
              marginBottom: "25px",
              fontWeight: "500",
            }}
          >
            Optimizing CoffeeShop Operations Through Data & System
          </h3>
          <p
            style={{
              fontSize: "1rem",
              color: "var(--text-muted)",
              maxWidth: "700px",
              margin: "0 auto 40px auto",
              lineHeight: "1.6",
            }}
          >
            Sistem operasional layanan self-service. Mencatat transaksi,
            mengelola pesanan, automasi pembayaran, serta menyimpan data
            pelanggan dalam satu platform terintegrasi.
          </p>
          <div
            style={{ display: "flex", gap: "15px", justifyContent: "center" }}
          >
            <button
              className="btn-primary"
              style={{
                width: "auto",
                padding: "15px 30px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
              onClick={() => navigate("/warkop-abah")}
            >
              Lihat System Preview <ChevronRight size={18} />
            </button>
          </div>
        </section>

        {/* OPERATIONAL CONTEXT */}
        <section
          className="glass-panel"
          style={{
            padding: "40px",
            borderRadius: "24px",
            marginBottom: "80px",
            border: "1px solid rgba(255, 71, 87, 0.3)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "30px",
              alignItems: "center",
            }}
          >
            <div>
              <h3 style={{ fontSize: "1.8rem", marginBottom: "15px" }}>
                Operational <span style={{ color: "#ff4757" }}>Context</span>
              </h3>
              <ul
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.95rem",
                  lineHeight: "1.6",
                  paddingLeft: "20px",
                }}
              >
                <li style={{ marginBottom: "10px" }}>
                  Pencatatan transaksi seringkali masih dilakukan secara manual,
                  laporan tidak tersedia real-time.
                </li>
                <li style={{ marginBottom: "10px" }}>
                  Owner kesulitan memantau aktivitas bisnis saat tidak berada di
                  lokasi.
                </li>
                <li>
                  Potensi ketidaksesuaian uang yang membatasi kontrol terhadap
                  operasional bisnis.
                </li>
              </ul>
            </div>
            <div
              style={{
                background: "rgba(0, 242, 254, 0.05)",
                padding: "25px",
                borderRadius: "20px",
                borderLeft: "4px solid var(--primary-color)",
              }}
            >
              <h4
                className="gradient-text"
                style={{ fontSize: "1.2rem", marginBottom: "10px" }}
              >
                Solutions Approach
              </h4>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "var(--text-main)",
                  lineHeight: "1.5",
                }}
              >
                Mengembangkan sistem operasional berbasis digital terintegrasi
                untuk membantu pencatatan, pengelolaan layanan, serta monitoring
                bisnis secara real-time.
              </p>
            </div>
          </div>
        </section>

        {/* BENEFITS SECTION */}
        <section style={{ marginBottom: "80px" }}>
          <h3
            style={{
              textAlign: "center",
              fontSize: "2rem",
              marginBottom: "40px",
              textTransform: "uppercase",
            }}
          >
            Benefit <span className="gradient-text">Smart Cashier</span>
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "25px",
            }}
          >
            {benefits.map((feat, idx) => (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  padding: "30px",
                  borderRadius: "20px",
                  transition: "transform 0.3s",
                }}
              >
                <div
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    width: "60px",
                    height: "60px",
                    borderRadius: "15px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                  }}
                >
                  {feat.icon}
                </div>
                <h4 style={{ fontSize: "1.1rem", marginBottom: "10px" }}>
                  {feat.title}
                </h4>
                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.9rem",
                    lineHeight: "1.5",
                  }}
                >
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* PRICING TABLE SECTION (Sinkron 100% dengan Gambar Terakhir) */}
        <section style={{ marginBottom: "80px" }}>
          <h3
            style={{
              textAlign: "center",
              fontSize: "2.5rem",
              marginBottom: "40px",
              fontFamily: "var(--heading)",
              fontWeight: "bold",
            }}
          >
            Price
          </h3>

          {/* Kontainer overflow agar tabel bisa di-scroll ke samping kalau dibuka di HP */}
          <div
            className="glass-panel"
            style={{
              overflowX: "auto",
              borderRadius: "16px",
              padding: 0,
              border: "1px solid var(--glass-border)",
            }}
          >
            <table
              style={{
                width: "100%",
                minWidth: "800px",
                borderCollapse: "collapse",
                textAlign: "center",
              }}
            >
              {/* TABLE HEADER */}
              <thead>
                <tr>
                  <th
                    style={{
                      width: "40%",
                      padding: "20px",
                      borderBottom: "1px solid var(--glass-border)",
                      borderRight: "1px solid var(--glass-border)",
                    }}
                  ></th>
                  <th
                    style={{
                      width: "30%",
                      padding: "20px",
                      borderBottom: "1px solid var(--glass-border)",
                      borderRight: "1px solid var(--glass-border)",
                    }}
                  >
                    <h4
                      style={{
                        fontSize: "1.1rem",
                        color: "var(--text-main)",
                        margin: "0 0 5px 0",
                      }}
                    >
                      Paket Dasar
                    </h4>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--text-main)",
                        margin: 0,
                      }}
                    >
                      QR Code Only
                    </p>
                  </th>
                  <th
                    style={{
                      width: "30%",
                      padding: "20px",
                      borderBottom: "1px solid var(--glass-border)",
                      background: "rgba(0, 242, 254, 0.05)",
                      borderTop: "3px solid var(--primary-color)",
                    }}
                  >
                    <h4
                      className="gradient-text"
                      style={{ fontSize: "1.1rem", margin: "0 0 5px 0" }}
                    >
                      Paket Advance
                    </h4>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--text-main)",
                        margin: "0 0 5px 0",
                        fontWeight: "bold",
                      }}
                    >
                      Full Integration
                    </p>
                    <span
                      style={{
                        color: "var(--primary-color)",
                        fontSize: "0.8rem",
                        fontWeight: "bold",
                      }}
                    >
                      Rekomendasi
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {/* BARIS INSTALASI */}
                <tr>
                  <td
                    style={{
                      padding: "15px 20px",
                      textAlign: "left",
                      borderBottom: "1px solid var(--glass-border)",
                      borderRight: "1px solid var(--glass-border)",
                      fontWeight: "bold",
                    }}
                  >
                    INSTALASI & SETUP
                  </td>
                  <td
                    style={{
                      padding: "15px 20px",
                      borderBottom: "1px solid var(--glass-border)",
                      borderRight: "1px solid var(--glass-border)",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                    }}
                  >
                    Rp 1.500.000
                  </td>
                  <td
                    style={{
                      padding: "15px 20px",
                      borderBottom: "1px solid var(--glass-border)",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      background: "rgba(0, 242, 254, 0.05)",
                    }}
                  >
                    Rp 1.500.000
                  </td>
                </tr>

                {/* HEADER HARGA BULANAN */}
                <tr style={{ background: "rgba(255,255,255,0.02)" }}>
                  <td
                    colSpan="3"
                    style={{
                      padding: "8px 20px",
                      textAlign: "left",
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                      borderBottom: "1px solid var(--glass-border)",
                    }}
                  >
                    HARGA BULANAN
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "20px",
                      textAlign: "left",
                      borderBottom: "1px solid var(--glass-border)",
                      borderRight: "1px solid var(--glass-border)",
                    }}
                  >
                    Biaya / Bulan
                  </td>
                  <td
                    style={{
                      padding: "20px",
                      borderBottom: "1px solid var(--glass-border)",
                      borderRight: "1px solid var(--glass-border)",
                    }}
                  >
                    <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                      Rp 99.000
                    </div>
                    <div
                      style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}
                    >
                      Per Bulan
                    </div>
                  </td>
                  <td
                    style={{
                      padding: "20px",
                      borderBottom: "1px solid var(--glass-border)",
                      background: "rgba(0, 242, 254, 0.05)",
                    }}
                  >
                    <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                      Rp 299.000
                    </div>
                    <div
                      style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}
                    >
                      Per Bulan
                    </div>
                  </td>
                </tr>

                {/* HEADER HARGA TAHUNAN */}
                <tr style={{ background: "rgba(255,255,255,0.02)" }}>
                  <td
                    colSpan="3"
                    style={{
                      padding: "8px 20px",
                      textAlign: "left",
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                      borderBottom: "1px solid var(--glass-border)",
                    }}
                  >
                    HARGA TAHUNAN
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "20px",
                      textAlign: "left",
                      borderBottom: "1px solid var(--glass-border)",
                      borderRight: "1px solid var(--glass-border)",
                    }}
                  >
                    Biaya / Tahun
                  </td>
                  <td
                    style={{
                      padding: "20px",
                      borderBottom: "1px solid var(--glass-border)",
                      borderRight: "1px solid var(--glass-border)",
                    }}
                  >
                    <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                      Rp 990.000
                    </div>
                    <div
                      style={{
                        fontSize: "0.85rem",
                        color: "var(--text-muted)",
                        textDecoration: "line-through",
                      }}
                    >
                      Rp 1.188.000
                    </div>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--success-color)",
                        fontWeight: "bold",
                        marginTop: "5px",
                      }}
                    >
                      Hemat Rp 198.000
                      <br />
                      (2 bln Gratis)
                    </div>
                  </td>
                  <td
                    style={{
                      padding: "20px",
                      borderBottom: "1px solid var(--glass-border)",
                      background: "rgba(0, 242, 254, 0.05)",
                    }}
                  >
                    <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                      Rp 2.990.000
                    </div>
                    <div
                      style={{
                        fontSize: "0.85rem",
                        color: "var(--text-muted)",
                        textDecoration: "line-through",
                      }}
                    >
                      Rp 3.588.000
                    </div>
                    {/* Nilai hemat di sini sudah saya koreksi (3.588k - 2.990k = 598k) */}
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--success-color)",
                        fontWeight: "bold",
                        marginTop: "5px",
                      }}
                    >
                      Hemat Rp 598.000
                      <br />
                      (2 bln Gratis)
                    </div>
                  </td>
                </tr>

                {/* HEADER FITUR */}
                <tr style={{ background: "rgba(255,255,255,0.02)" }}>
                  <td
                    colSpan="3"
                    style={{
                      padding: "8px 20px",
                      textAlign: "left",
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                      borderBottom: "1px solid var(--glass-border)",
                    }}
                  >
                    FITUR
                  </td>
                </tr>

                {/* MAPPING FITUR DARI ARRAY */}
                {featureComparison.map((feat, idx) => (
                  <tr key={idx}>
                    <td
                      style={{
                        padding: "15px 20px",
                        textAlign: "left",
                        borderBottom:
                          idx === featureComparison.length - 1
                            ? "none"
                            : "1px solid var(--glass-border)",
                        borderRight: "1px solid var(--glass-border)",
                        fontSize: "0.9rem",
                      }}
                    >
                      {feat.name}
                    </td>
                    <td
                      style={{
                        padding: "15px 20px",
                        borderBottom:
                          idx === featureComparison.length - 1
                            ? "none"
                            : "1px solid var(--glass-border)",
                        borderRight: "1px solid var(--glass-border)",
                      }}
                    >
                      {feat.basic === true ? (
                        <CheckCircle2 size={24} color="var(--success-color)" />
                      ) : feat.basic === false ? (
                        <Minus size={20} color="var(--text-muted)" />
                      ) : (
                        <span
                          style={{
                            fontSize: "0.9rem",
                            color: "var(--text-main)",
                          }}
                        >
                          {feat.basic}
                        </span>
                      )}
                    </td>
                    <td
                      style={{
                        padding: "15px 20px",
                        borderBottom:
                          idx === featureComparison.length - 1
                            ? "none"
                            : "1px solid var(--glass-border)",
                        background: "rgba(0, 242, 254, 0.05)",
                      }}
                    >
                      {feat.advance === true ? (
                        <CheckCircle2 size={24} color="var(--success-color)" />
                      ) : feat.advance === false ? (
                        <Minus size={20} color="var(--text-muted)" />
                      ) : (
                        <span
                          style={{
                            fontSize: "0.9rem",
                            color: "var(--text-main)",
                          }}
                        >
                          {feat.advance}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer
        style={{
          borderTop: "1px solid var(--glass-border)",
          padding: "50px 20px",
          textAlign: "center",
          background: "rgba(5,5,5,0.8)",
        }}
      >
        <h2 style={{ fontSize: "1.8rem", marginBottom: "10px" }}>
          Let's Innovate <span className="gradient-text">Together</span>
        </h2>
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "0.95rem",
            maxWidth: "600px",
            margin: "0 auto 25px auto",
            lineHeight: "1.6",
          }}
        >
          A business should be run with clear data, not assumptions. <br />
          TechnoG Smart Cashier helping you gain better control over your
          operations.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            alignItems: "center",
            marginBottom: "40px",
            fontSize: "0.9rem",
          }}
        >
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Mail size={18} color="var(--primary-color)" />{" "}
            andririzki@technogsolutionss.com
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <MonitorSmartphone size={18} color="var(--primary-color)" />{" "}
            www.technogsolutionss.com
          </div>
        </div>

        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "0.8rem",
            opacity: 0.6,
          }}
        >
          © 2026 TechnoG Solutions. Palu, Central Sulawesi.
        </p>
      </footer>
    </div>
  );
}

export default LandingPage;
