import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, total } = useContext(CartContext);
  const [address, setAddress] = useState("");

  const handleConfirmOrder = () => {
    if (!address) {
      alert("Please enter your delivery address");
      return;
    }

    if (!cart || cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    navigate("/payment", {
      state: {
        address,
      },
    });
  };

  return (
    <div
      className="checkout-page"
      style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}
    >
      <h2>Checkout</h2>

      <label>Delivery Address</label>
      <textarea
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter your full address"
        style={{
          width: "100%",
          padding: "10px",
          margin: "10px 0",
          borderRadius: "5px",
          minHeight: "80px",
        }}
      />

      <h3>Order Summary</h3>
      <p>Total Items: {cart.length}</p>
      <p>Total Amount: ₹{total}</p>

      <button
        onClick={handleConfirmOrder}
        style={{
          padding: "10px 20px",
          marginTop: "20px",
          backgroundColor: "#4caf50",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Confirm & Proceed to Payment
      </button>
    </div>
  );
};

export default Checkout;
