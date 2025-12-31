import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CartContext, CartProvider } from "./context/CartContext.jsx";
import { GoogleOAuthProvider } from '@react-oauth/google';
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <GoogleOAuthProvider clientId="211874730616-i8n53vqsccsm5f4f5jtmbil8b8k7ra76.apps.googleusercontent.com">
  <CartProvider>
    <App />
  </CartProvider>
  </GoogleOAuthProvider>
);
