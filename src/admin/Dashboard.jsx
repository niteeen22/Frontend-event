import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import withLayout from "./WithLayout";

const Dashboard = () => {
  const [stats, setStats] = useState({ products: 0, users: 0, orders: 0 });

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const { data: productData } = await axios.get(
        "http://localhost:5000/api/admin/all-products",
        { headers: { Authorization: "Bearer " + token } }
      );
      console.log("Products:", productData);

      const { data: userData } = await axios.get(
        "http://localhost:5000/api/admin/all-users",
        { headers: { Authorization: "Bearer " + token } }
      );
      console.log("Users:", userData);

      const { data: orderData } = await axios.get(
        "http://localhost:5000/api/orders/all-orders",
        { headers: { Authorization: "Bearer " + token } }
      );
      console.log("Orders:", orderData);

      setStats({
        products: productData?.data?.length || 0,
        users: userData?.data?.length || 0,
        orders: orderData?.orders?.length || 0,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="dashboard-main">
      <h1>AdminDashboard</h1>
      <div className="admin-Dashboard">
        <div className="dashboard-card">
          <h2>Total Products</h2>
          <p className="dashboard-number">{stats.products}</p>
          <Link className="dashboard-mobile-link" to="/admin/products">
            Manage Products
          </Link>
        </div>
        <div className="dashboard-card">
          <h2>Total Users</h2>
          <p className="dashboard-number">{stats.users}</p>
          <Link className="dashboard-mobile-link" to="/admin/users">
            Manage Users
          </Link>
        </div>
        <div className="dashboard-card">
          <h2>Total Orders</h2>
          <p className="dashboard-number">{stats.orders}</p>
          <Link className="dashboard-mobile-link" to="/admin/orders">
            Manage Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default withLayout(Dashboard);
