import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const addToCart = (product, navigate) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    let updatedCart = [...cart];
    const exist = updatedCart.find((item) => item._id === product._id);
    if (exist) {
      exist.qty += 1;
    } else {
      updatedCart.push({ ...product, qty: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <CartContext.Provider value={{ cart, total, addToCart, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};
