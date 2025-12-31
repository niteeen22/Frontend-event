import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import withLayout from "./WithLayout";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [searchTimer, setSearchTimer] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const handleExportCSV = async () => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(
        "http://localhost:5000/api/admin/export-orders",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "orders.csv";
      a.click();
    } catch (error) {
      console.error(error);
      alert("CSV File  Download Failed");
    }
  };

  // Fetch orders from server
  const fetchOrders = async (page = 1, searchTerm = "") => {
    try {
      const token = localStorage.getItem("adminToken");
      const { data } = await axios.get(
        `http://localhost:5000/api/orders/all-orders?page=${page}&limit=${itemsPerPage}&search=${searchTerm}`,
        { headers: { Authorization: "Bearer " + token } }
      );

      setOrders(data.orders || []);
      setTotalPages(data.totalPages || 1);
      setCurrentPage(data.currentPage || 1);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  // Delete order (optional)
  const deleteOrder = async (id) => {
    if (window.confirm("Are you sure to delete this order?")) {
      try {
        const token = localStorage.getItem("adminToken");
        await axios.delete(`http://localhost:5000/api/orders/${id}`, {
          headers: { Authorization: "Bearer " + token },
        });
        fetchOrders(currentPage, search);
      } catch (err) {
        console.error("Failed to delete order:", err);
      }
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (searchTimer) clearTimeout(searchTimer);
    const timer = setTimeout(() => {
      fetchOrders(1, value);
    }, 800);
    setSearchTimer(timer);
    // setSearch(e.target.value);
    // fetchOrders(1, e.target.value);
  };

  // Handle page change
  const handlePageChange = (page) => {
    fetchOrders(page, search);
  };

  return (
    <div style={{ padding: "20px",width:"71%",position:"relative",left:"20%" }}>
      <h1>Manage Orders</h1>
      <button
        onClick={handleExportCSV}
        style={{ margin: "5px", padding: "8px" }}
      >
        Export Orders CSV
      </button>
      <input
        type="text"
        placeholder="Search Orders by user or email..."
        value={search}
        onChange={handleSearch}
        style={{
          padding: "8px 10px",
          border: "1px solid #d7d5d5ff",
          borderRadius: "10px",
          width: "25%",
          margin: "10px 0",
        }}
      />

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <>
          <div className="table-responsive">
            <table border="1" cellPadding="10" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th>Items</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((o) => (
                  <tr key={o._id}>
                    <td>{o.user?.name || o.user?.email || "Unknown"}</td>
                    <td>${o.totalAmount}</td>
                    <td>{o.status}</td>
                    <td>
                      {o.items.map((i, idx) => (
                        <div key={idx}>
                          {i.name || i.product?.name} x {i.qty}
                        </div>
                      ))}
                    </td>
                    <td>
                      <Link to={`/admin/orders/edit/${o._id}`}>
                        Edit
                        <Toaster />
                      </Link>
                      <button
                        onClick={() => deleteOrder(o._id)}
                        style={{
                          marginLeft: "5px",
                          padding: "3px 6px",
                          background: "#e74c3c",
                          color: "#fff",
                          border: "none",
                          borderRadius: "3px",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Buttons */}
          <div style={{ marginTop: "20px" }}>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                style={{
                  margin: "0 5px",
                  padding: "6px 12px",
                  background: currentPage === i + 1 ? "#3498db" : "#f0f0f0",
                  color: currentPage === i + 1 ? "#fff" : "#000",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default withLayout (ManageOrders);
