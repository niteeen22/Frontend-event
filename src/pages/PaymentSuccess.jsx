import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";

const PaymentSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { updateCart } = useContext(CartContext);

  useEffect(() => {
    saveOrder();
  }, []);

  const saveOrder = async () => {
    const token = localStorage.getItem("token");

    const orderData = {
      items: state.items,
      totalAmount: state.totalAmount,
      address: state.address,
    };

    await axios.post("http://localhost:5000/api/orders/place", orderData, {
      headers: { Authorization: "Bearer " + token },
    });

    updateCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <div className="success-page">
      <h2>Payment Successful</h2>
      <p>Your order has been placed!</p>

      <button onClick={() => navigate("/my-orders")}>View My Orders</button>
    </div>
  );
};

export default PaymentSuccess;
