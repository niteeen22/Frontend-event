import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router";

const Cart = () => {
  const { cart, updateCart } = useContext(CartContext);
  const navigate = useNavigate();
  const updateQty = (index, type) => {
    const updated = [...cart];

    if (type === "inc") {
      updated[index].qty += 1;
    } else if (type === "dec" && updated[index].qty > 1) {
      updated[index].qty -= 1;
    }

    updateCart(updated);
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const goToCheckout = () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    navigate("/checkout");
  };

  const removeItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    updateCart(updated);
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cart.map((i, idx) => (
        <div className="cart-item" key={idx}>
          <img src={i.images?.[0]} />

          <div>
            <h3>{i.name}</h3>
            <p>${i.price}</p>

            <div className="qty-box">
              <button onClick={() => updateQty(idx, "dec")}>–</button>
              <span>{i.qty}</span>
              <button onClick={() => updateQty(idx, "inc")}>+</button>
              <button onClick={() => removeItem(idx)}>Remove</button>
            </div>
          </div>
        </div>
      ))}
      {/* <button className="place-order-btn" onClick={placeOrder}>
  Place Order
</button> */}
      <button onClick={goToCheckout} className="checkout-btn">
        Place Order
      </button>

      <h2>Total: ${total}</h2>
    </div>
  );
};

export default Cart;
