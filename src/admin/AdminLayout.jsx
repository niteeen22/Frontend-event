import React from "react";
import { Link } from "react-router";

function AdminLayout({ children }) {
  return (
    <div className="dashboard-container">
      <div className="dashboard-sidebar">
        <h2 className="sidebar-title">Admin Dashboard</h2>
        <ul className="sidebar-menu">
          <li>
            <Link to="/admin/products" className="sidebar-link">
              Products
            </Link>
          </li>
          <li>
            <Link to="/admin/users" className="sidebar-link">
              Users
            </Link>
          </li>
          <li>
            <Link to="/admin/orders" className="sidebar-link">
              Orders
            </Link>
          </li>
        </ul>
      </div>
      {children}
    </div>
  );
}

export default AdminLayout;
