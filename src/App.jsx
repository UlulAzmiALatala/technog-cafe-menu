import { useState } from "react";
import { menuData } from "./data/menuData";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutMethod, setIsCheckoutMethod] = useState(false); // Halaman pilih metode
  const [isPaymentAction, setIsPaymentAction] = useState(false); // Halaman tampilkan QRIS/VA
  const [isSuccess, setIsSuccess] = useState(false); // Halaman sukses
  const [paymentMethod, setPaymentMethod] = useState("QRIS"); // Default metode

  // --- Fungsi Keranjang ---
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const decrementQty = (productId) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === productId);
      if (existing.qty === 1) {
        return prev.filter((item) => item.id !== productId);
      }
      return prev.map((item) =>
        item.id === productId ? { ...item, qty: item.qty - 1 } : item,
      );
    });
  };

  const removeFromCart = (productId) =>
    setCart((prev) => prev.filter((item) => item.id !== productId));

  // --- Kalkulasi ---
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0,
  );
  const totalItem = cart.reduce((acc, item) => acc + item.qty, 0);
  const pb1 = subtotal * 0.1;
  const serviceCharge = subtotal * 0.02;
  const grandTotal = subtotal + pb1 + serviceCharge;
  const orderId = `#TGC-${Math.floor(100000 + Math.random() * 900000)}`;

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  // --- Navigasi Flow Pembayaran ---
  const handleOpenCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutMethod(true);
  };
  const handleProceedToPay = () => {
    setIsCheckoutMethod(false);
    setIsPaymentAction(true);
  };
  const handleSimulateSuccess = () => {
    setIsPaymentAction(false);
    setIsSuccess(true);
    setTimeout(() => {
      setCart([]); // Reset keranjang setelah 3 detik
      setIsSuccess(false);
    }, 3500);
  };

  return (
    <div className="app-container">
      {/* --- HEADER --- */}
      <header className="glass-header">
        <div className="brand">
          <div className="brand-logo">T</div>
          <h2>TechnoG Cafe</h2>
        </div>
        <div className="table-info">MEJA 29</div>
      </header>

      {/* --- MENU LIST --- */}
      <main className="content-area">
        <div className="menu-grid">
          {menuData.map((product) => (
            <div key={product.id} className="menu-card glass-panel">
              <div className="card-image-wrapper">
                <img
                  src={product.image}
                  alt={product.name}
                  className="card-image"
                />
                <div className="category-badge">{product.category}</div>
              </div>
              <div className="card-body">
                <h3 className="card-name">{product.name}</h3>
                <p className="card-desc">{product.description}</p>
                <div className="card-footer">
                  <p className="card-price">{formatRupiah(product.price)}</p>
                  <button
                    className="btn-add neon-btn"
                    onClick={() => addToCart(product)}
                  >
                    + Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* --- FLOATING CART --- */}
      {cart.length > 0 &&
        !isCartOpen &&
        !isCheckoutMethod &&
        !isPaymentAction &&
        !isSuccess && (
          <div
            className="cart-floating glass-panel"
            onClick={() => setIsCartOpen(true)}
          >
            <div className="cart-summary">
              <div className="cart-count pulse-anim">{totalItem}</div>
              <div className="cart-text">
                <span className="cart-total-label">Subtotal</span>
                <span className="cart-total-price">
                  {formatRupiah(subtotal)}
                </span>
              </div>
            </div>
            <button className="btn-checkout">View Order ➔</button>
          </div>
        )}

      {/* --- 1. OVERLAY KERANJANG --- */}
      {isCartOpen && (
        <div className="overlay-wrapper">
          <div className="modal-panel glass-panel">
            <div className="modal-header">
              <h2>Order Summary</h2>
              <button
                className="btn-close"
                onClick={() => setIsCartOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-img"
                  />
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <p className="cart-item-price">
                      {formatRupiah(item.price)}
                    </p>
                    <div className="qty-controls">
                      <button
                        className="btn-qty"
                        onClick={() => decrementQty(item.id)}
                      >
                        -
                      </button>
                      <span>{item.qty}</span>
                      <button
                        className="btn-qty"
                        onClick={() => addToCart(item)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="bill-breakdown">
                <div className="breakdown-row">
                  <span>Subtotal</span>
                  <span>{formatRupiah(subtotal)}</span>
                </div>
                <div className="breakdown-row">
                  <span>Tax (10%)</span>
                  <span>{formatRupiah(pb1)}</span>
                </div>
                <div className="breakdown-row">
                  <span>Service (2%)</span>
                  <span>{formatRupiah(serviceCharge)}</span>
                </div>
                <div className="breakdown-row total-row">
                  <span>Grand Total</span>
                  <span className="gradient-text">
                    {formatRupiah(grandTotal)}
                  </span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-primary" onClick={handleOpenCheckout}>
                Checkout • {formatRupiah(grandTotal)}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- 2. OVERLAY PILIH METODE PEMBAYARAN --- */}
      {isCheckoutMethod && (
        <div className="fullscreen-panel">
          <div className="modal-header transparent-header">
            <button
              className="btn-back"
              onClick={() => {
                setIsCheckoutMethod(false);
                setIsCartOpen(true);
              }}
            >
              ← Back
            </button>
            <h2>Select Payment</h2>
            <div style={{ width: "40px" }}></div> {/* Spacer */}
          </div>
          <div className="fullscreen-body">
            <div className="total-display glass-panel">
              <p>Total Payment</p>
              <h1 className="gradient-text">{formatRupiah(grandTotal)}</h1>
              <p className="order-id">Order ID: {orderId}</p>
            </div>

            <h3 className="section-title">E-Wallets & QRIS</h3>
            <div className="payment-list glass-panel">
              <label
                className={`payment-option ${paymentMethod === "QRIS" ? "active" : ""}`}
              >
                <div className="payment-icon qris-icon">QRIS</div>
                <div className="payment-info">
                  <h4>QRIS</h4>
                  <p>Pay with any banking/e-wallet app</p>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "QRIS"}
                  onChange={() => setPaymentMethod("QRIS")}
                />
              </label>

              <label
                className={`payment-option ${paymentMethod === "GOPAY" ? "active" : ""}`}
              >
                <div className="payment-icon gopay-icon">G</div>
                <div className="payment-info">
                  <h4>GoPay</h4>
                  <p>Pay instantly with GoPay</p>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "GOPAY"}
                  onChange={() => setPaymentMethod("GOPAY")}
                />
              </label>
            </div>
          </div>
          <div className="modal-footer bottom-fixed glass-panel">
            <button className="btn-primary" onClick={handleProceedToPay}>
              Confirm Selection
            </button>
          </div>
        </div>
      )}

      {/* --- 3. OVERLAY INSTRUKSI PEMBAYARAN (QRIS SCAN) --- */}
      {isPaymentAction && (
        <div className="fullscreen-panel dark-bg">
          <div className="modal-header transparent-header">
            <button
              className="btn-back"
              onClick={() => {
                setIsPaymentAction(false);
                setIsCheckoutMethod(true);
              }}
            >
              ← Change
            </button>
            <h2>Complete Payment</h2>
            <div style={{ width: "40px" }}></div>
          </div>
          <div className="fullscreen-body center-content">
            <div className="qris-card glass-panel">
              <div className="qris-header">
                <h3>
                  {paymentMethod === "QRIS"
                    ? "Scan QRIS to Pay"
                    : "GoPay Payment"}
                </h3>
                <p>TechnoG Cafe Palu</p>
              </div>

              {/* Fake QR Code using an API generator for realism */}
              <div className="qr-container">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TechnoG-${orderId}&color=ffffff&bgcolor=141620`}
                  alt="QRIS"
                  className="qr-image"
                />
                <div className="qr-overlay-logo">T</div>
              </div>

              <div className="qris-details">
                <p className="timer">
                  Awaiting payment... <span>14:59</span>
                </p>
                <h2>{formatRupiah(grandTotal)}</h2>
                <p className="order-id">Order ID: {orderId}</p>
              </div>
            </div>

            {/* TOMBOL RAHASIA UNTUK DEMO ANDRI */}
            <div className="demo-actions">
              <p className="demo-note">
                *For demo purpose, click below to simulate Midtrans success
                callback
              </p>
              <button
                className="btn-simulate-success"
                onClick={handleSimulateSuccess}
              >
                Simulate Payment Success
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- 4. OVERLAY SUCCESS --- */}
      {isSuccess && (
        <div className="fullscreen-panel success-bg center-content">
          <div className="success-card glass-panel">
            <div className="success-icon-wrapper">
              <div className="success-icon">✓</div>
            </div>
            <h2 className="gradient-text">Payment Successful!</h2>
            <p>
              Your order <b>{orderId}</b> has been received by the kitchen.
            </p>
            <div className="receipt-line"></div>
            <p className="redirect-text">Returning to menu automatically...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
