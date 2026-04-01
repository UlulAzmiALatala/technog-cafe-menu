import { useState } from "react";
import { useParams } from "react-router-dom";
import { menuData } from "../data/menuData";
import "../App.css";
import { ShoppingCart, ArrowLeft, CheckCircle2 } from "lucide-react";

function MenuPage() {
  const { cafeSlug } = useParams();

  const cafeName = cafeSlug
    ? cafeSlug.replace(/-/g, " ").toUpperCase()
    : "TECHNOG CAFE";

  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutMethod, setIsCheckoutMethod] = useState(false);
  const [isPaymentAction, setIsPaymentAction] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("GOPAY");

  // SIMULASI DATA SOLD OUT (Nantinya data ini sinkron dari Admin/Database)
  // Untuk demo, kita asumsikan produk dengan ID 3 dan 6 sedang habis
  const [soldOutItems] = useState([3, 6]);

  // LOGIC CART
  const addToCart = (product) => {
    // Cegah masuk ke keranjang jika item sold out
    if (soldOutItems.includes(product.id)) return;

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
      if (existing.qty === 1)
        return prev.filter((item) => item.id !== productId);
      return prev.map((item) =>
        item.id === productId ? { ...item, qty: item.qty - 1 } : item,
      );
    });
  };

  // CALCULATIONS
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0,
  );
  const totalItem = cart.reduce((acc, item) => acc + item.qty, 0);
  const pb1 = subtotal * 0.1;
  const serviceCharge = subtotal * 0.02;
  const grandTotal = subtotal + pb1 + serviceCharge;
  const [orderId] = useState(
    `#TGC-${Math.floor(100000 + Math.random() * 900000)}`,
  );

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

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
      setCart([]);
      setIsSuccess(false);
    }, 3500);
  };

  const isEwalletSelected = ["GOPAY", "DANA", "SHOPEEPAY"].includes(
    paymentMethod,
  );

  const renderActionTitle = () => {
    if (paymentMethod === "CASH") return "Cash Payment";
    if (paymentMethod === "VISA") return "Card Details";
    if (paymentMethod === "VA") return "Virtual Account";
    return `Pay with ${paymentMethod}`;
  };

  const renderPaymentInstruction = () => {
    switch (paymentMethod) {
      case "VA":
        return (
          <div className="payment-instruction-box">
            <p>Virtual Account Number</p>
            <h2 className="va-number">
              8800 {Math.floor(1000 + Math.random() * 9000)}{" "}
              {Math.floor(1000 + Math.random() * 9000)}
            </h2>
            <p className="timer">
              Pay within <b>23:59:59</b>
            </p>
          </div>
        );
      case "VISA":
        return (
          <div className="payment-instruction-box cc-box">
            <p>Credit / Debit Card</p>
            <input
              type="text"
              placeholder="Card Number (Demo)"
              className="cc-input"
              disabled
            />
            <div className="cc-row">
              <input
                type="text"
                placeholder="MM/YY"
                className="cc-input"
                disabled
              />
              <input
                type="text"
                placeholder="CVC"
                className="cc-input"
                disabled
              />
            </div>
            <p className="demo-note mt-2">Simulation Mode Active</p>
          </div>
        );
      case "CASH":
        return (
          <div className="payment-instruction-box cash-box">
            <div className="cash-icon-large">💵</div>
            <h3>Pay at Cashier</h3>
            <p>
              Please proceed to the cashier and show your Order ID to complete
              the payment.
            </p>
          </div>
        );
      default:
        return (
          <div className="qr-container">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TechnoG-${orderId}-${paymentMethod}&color=ffffff&bgcolor=141620`}
              alt="QRIS"
              className="qr-image"
            />
            <div className="qr-overlay-logo">{paymentMethod[0]}</div>
          </div>
        );
    }
  };

  return (
    <div className="app-container">
      {/* HEADER DINAMIS BERDASARKAN URL */}
      <header className="glass-header">
        <div className="brand">
          <div className="brand-logo">{cafeName[0]}</div>
          <h2>{cafeName}</h2>
        </div>
        <div className="table-info">MEJA 29</div>
      </header>

      {/* MENU LIST */}
      <main className="content-area">
        <div className="menu-grid">
          {menuData.map((product) => {
            const isSoldOut = soldOutItems.includes(product.id);

            return (
              <div
                key={product.id}
                className="menu-card glass-panel"
                style={{ opacity: isSoldOut ? 0.6 : 1 }}
              >
                <div className="card-image-wrapper">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="card-image"
                    style={{ filter: isSoldOut ? "grayscale(1)" : "none" }}
                  />
                  <div className="category-badge">{product.category}</div>

                  {/* Label Sold Out melayang di tengah gambar */}
                  {isSoldOut && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(0,0,0,0.6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 10,
                      }}
                    >
                      <span
                        style={{
                          background: "#ff4757",
                          color: "#fff",
                          padding: "6px 16px",
                          borderRadius: "12px",
                          fontWeight: "700",
                          fontSize: "0.85rem",
                          boxShadow: "0 4px 15px rgba(255, 71, 87, 0.4)",
                        }}
                      >
                        SOLD OUT
                      </span>
                    </div>
                  )}
                </div>

                <div className="card-body">
                  <h3 className="card-name">{product.name}</h3>
                  <p className="card-desc">{product.description}</p>
                  <div className="card-footer">
                    <p className="card-price">{formatRupiah(product.price)}</p>
                    <button
                      className="btn-add neon-btn"
                      onClick={() => !isSoldOut && addToCart(product)}
                      disabled={isSoldOut}
                      style={{
                        borderColor: isSoldOut
                          ? "#444"
                          : "var(--primary-color)",
                        color: isSoldOut ? "#444" : "var(--primary-color)",
                        cursor: isSoldOut ? "not-allowed" : "pointer",
                        opacity: isSoldOut ? 0.5 : 1,
                      }}
                    >
                      {isSoldOut ? "N/A" : "+ Add"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* FLOATING CART BUTTON */}
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

      {/* 1. OVERLAY KERANJANG */}
      {isCartOpen && (
        <div className="overlay-wrapper align-right">
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

      {/* 2. OVERLAY PILIH METODE PEMBAYARAN */}
      {isCheckoutMethod && (
        <div className="overlay-wrapper align-center">
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
              <div style={{ width: "40px" }}></div>
            </div>
            <div className="fullscreen-body">
              <div className="total-display glass-panel">
                <p>Total Payment</p>
                <h1 className="gradient-text">{formatRupiah(grandTotal)}</h1>
                <p className="order-id">Order ID: {orderId}</p>
              </div>
              <h3 className="section-title">Payment Methods</h3>
              <div className="payment-list">
                <label
                  className={`payment-option ${paymentMethod === "QRIS" ? "active" : ""}`}
                >
                  <div className="payment-icon qris-icon">QRIS</div>
                  <div className="payment-info">
                    <h4>QRIS</h4>
                    <p>Any bank/e-wallet</p>
                  </div>
                  <input
                    type="radio"
                    checked={paymentMethod === "QRIS"}
                    onChange={() => setPaymentMethod("QRIS")}
                  />
                </label>

                <div
                  className={`payment-group ${isEwalletSelected ? "group-active" : ""}`}
                >
                  <label
                    className="payment-option no-border"
                    onClick={() =>
                      !isEwalletSelected && setPaymentMethod("GOPAY")
                    }
                  >
                    <div className="payment-icon ewallet-icon">💳</div>
                    <div className="payment-info">
                      <h4>E-Wallet</h4>
                      <p>GoPay, DANA, ShopeePay</p>
                    </div>
                    <input type="radio" checked={isEwalletSelected} readOnly />
                  </label>
                  {isEwalletSelected && (
                    <div className="sub-payment-list">
                      {["GOPAY", "DANA", "SHOPEEPAY"].map((m) => (
                        <label
                          key={m}
                          className={`sub-option ${paymentMethod === m ? "sub-active" : ""}`}
                        >
                          <div className={`sub-icon ${m.toLowerCase()}-sub`}>
                            {m[0]}
                          </div>
                          <span>{m}</span>
                          <input
                            type="radio"
                            checked={paymentMethod === m}
                            onChange={() => setPaymentMethod(m)}
                          />
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                <label
                  className={`payment-option ${paymentMethod === "VA" ? "active" : ""}`}
                >
                  <div className="payment-icon va-icon">VA</div>
                  <div className="payment-info">
                    <h4>Virtual Account</h4>
                    <p>BCA, Mandiri, BRI</p>
                  </div>
                  <input
                    type="radio"
                    checked={paymentMethod === "VA"}
                    onChange={() => setPaymentMethod("VA")}
                  />
                </label>
                <label
                  className={`payment-option ${paymentMethod === "CASH" ? "active" : ""}`}
                >
                  <div className="payment-icon cash-icon">💵</div>
                  <div className="payment-info">
                    <h4>Cash</h4>
                    <p>Pay at cashier</p>
                  </div>
                  <input
                    type="radio"
                    checked={paymentMethod === "CASH"}
                    onChange={() => setPaymentMethod("CASH")}
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
        </div>
      )}

      {/* 3. OVERLAY INSTRUKSI PEMBAYARAN */}
      {isPaymentAction && (
        <div className="overlay-wrapper align-center">
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
                  <h3>{renderActionTitle()}</h3>
                  <p>{cafeName} Official</p>
                </div>
                {renderPaymentInstruction()}
                <div className="qris-details">
                  <h2>{formatRupiah(grandTotal)}</h2>
                  <p className="order-id">Order ID: {orderId}</p>
                </div>
              </div>
              <div className="demo-actions">
                <p className="demo-note">*Click below to simulate success</p>
                <button
                  className="btn-simulate-success"
                  onClick={handleSimulateSuccess}
                >
                  Simulate Payment Success
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. OVERLAY SUCCESS */}
      {isSuccess && (
        <div className="overlay-wrapper align-center success-bg">
          <div className="success-card glass-panel">
            <div className="success-icon-wrapper">
              <div className="success-icon">✓</div>
            </div>
            <h2 className="gradient-text">Success!</h2>
            <p>
              Your order <b>{orderId}</b> is being prepared.
            </p>
            <div className="receipt-line"></div>
            <p className="redirect-text">Returning to menu...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuPage;
