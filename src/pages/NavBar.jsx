import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../context/CartContext";

const NavBar = ({ setToken }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState("");

  // Total cart quantity count
  const cartCount = cart.reduce((total, item) => total + item.qty, 0);

  const userLoggedIn = localStorage.getItem("token");
  const adminLoggedIn = localStorage.getItem("adminToken");

  // Get USER NAME FORM LOCAL STORAGE
  const userName = localStorage.getItem("userName");

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setToken(null);
    navigate("/login");
  };

  const logoutAdmin = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    navigate(`/home?search=${value}`);
  };

  return (
    <nav className="navbar-container">
      <div className="nav-brand">
        <h2>MyStore</h2>
      </div>

      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>
        <li>
          <Link to="/home">Home</Link>
        </li>

        <li className="cart-wrapper">
          <Link to="/cart" className="cart-icon">
            <FaShoppingCart size={20} />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </li>
        <li>
          <Link to="/my-orders">Order</Link>
        </li>
        <li>
          <input
            type="text"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Search..."
            style={{
              padding: "6px 2px",
              border: "1px solid #ccc",
              outline: "none",
              borderRadius: "5px",
            }}
          />
        </li>

        {/* ---------- ADMIN SECTION ---------- */}
        {!adminLoggedIn ? (
          <li>
            <Link to="/admin/login">Admin Login</Link>
          </li>
        ) : (
          <>
            <li>
              <Link to="/admin/dashboard">Admin-Dashboard</Link>
            </li>
            <li>
              <button onClick={logoutAdmin}>Admin Logout</button>
            </li>
          </>
        )}

        {/* ---------- USER SECTION ---------- */}
        {!userLoggedIn && (
          <li>
            <Link to="/login">User Login</Link>
          </li>
        )}

        {userLoggedIn && (
          <>
            {/* {User Name Show} */}
            <li style={{ fontWeight: "bold", color: "#f6f6f6ff" }}>Welcome-{userName}</li>
            <li>
              <button onClick={logoutUser}>User Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
