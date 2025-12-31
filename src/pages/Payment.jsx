import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

const Payment = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { cart, total } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState("upi");

  const handlePayment = () => {
    // Check if cart is empty
    if (!cart || cart.length === 0) {
      alert("Your cart is empty! Add items before placing an order.");
      return;
    }

    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    if (paymentMethod === "gpay") {
      alert("Scan the QR code to complete payment");
      return;
    }

    // Proceed to success page
    navigate("/payment-success", {
      state: {
        address: state.address,
        items: cart,
        totalAmount: total,
        paymentMethod,
      },
    });
  };

  return (
    <div className="payment-page">
      <h2>Select Payment Method</h2>

      <div className="payment-box">
        <label>
          <input
            type="radio"
            name="payment"
            value="gpay"
            checked={paymentMethod === "gpay"}
            onChange={() => setPaymentMethod("gpay")}
          />
          Google Pay / UPI
        </label>

        <label>
          <input
            type="radio"
            name="payment"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={() => setPaymentMethod("cod")}
          />
          Cash on Delivery
        </label>

        {paymentMethod === "gpay" && cart.length > 0 && (
          <div className="qr-code">
            <p>Scan this QR code to pay ₹{total}</p>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=example@upi&pn=Merchant&am=${total}`}
              alt="UPI QR Code"
            />
          </div>
        )}

        <button
          className="pay-btn"
          onClick={handlePayment}
          disabled={cart.length === 0}
        >
          {paymentMethod === "cod" ? `Pay $${total}` : "I have paid"}
        </button>
      </div>
    </div>
  );
};

export default Payment;
