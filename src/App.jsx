import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import NavBar from "./pages/NavBar";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import MyOrders from "./pages/MyOrders";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
// Admin
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/Dashboard";
import ManageProducts from "./admin/ManageProducts";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import ManageUsers from "./admin/ManageUsers";
import EditUser from "./admin/EditUser";
import ManageOrders from "./admin/ManageOrders";
import EditOrder from "./admin/EditOrder";
function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <Router>
      <Toaster position="top-center" />
      <NavBar setToken={setToken} />
      {/* <Toaster position="top-center" reverseOrder={false} /> */}
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />

        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminPrivateRoute>
              <AdminDashboard />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminPrivateRoute>
              <ManageProducts />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/products/add"
          element={
            <AdminPrivateRoute>
              <AddProduct />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/products/edit/:id"
          element={
            <AdminPrivateRoute>
              <EditProduct />
            </AdminPrivateRoute>
          }
        />
        {/* ADMIN USER ROUTES */}
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/users/edit/:id" element={<EditUser />} />
        <Route path="/admin/orders" element={<ManageOrders />} />
        <Route path="/admin/orders/edit/:id" element={<EditOrder />} />
      </Routes>
    </Router>
  );
}

export default App;
