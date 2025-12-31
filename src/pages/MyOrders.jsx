import React, { useEffect, useState } from "react";
import axios from "axios";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/orders/my-orders",
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
        setOrders(data.orders);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="orders-container" style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>My Orders</h2>

      {orders.length === 0 ? (
        <p style={{ textAlign: "center" }}>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="order-card"
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "20px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <div
              className="order-header"
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                marginBottom: "10px",
              }}
            >
              <h3 style={{ margin: 0, wordBreak: "break-word" }}>
                Order ID: {order._id}
              </h3>
              <span
                style={{
                  backgroundColor:
                    order.status === "Delivered" ? "#4caf50" : "#ff9800",
                  color: "#fff",
                  padding: "3px 10px",
                  borderRadius: "5px",
                  fontSize: "0.9rem",
                }}
              >
                {order.status}
              </span>
            </div>

            {/* ORDER & DELIVERY DATE */}
            <p style={{ margin: "5px 0" }}>
              <strong>Ordered On:</strong> {formatDate(order.createdAt)}
            </p>

            <p style={{ margin: "5px 0" }}>
              <strong>Delivery Date:</strong>{" "}
              {order.deliveryDate
                ? formatDate(order.deliveryDate)
                : "Not Assigned"}
            </p>

            <p style={{ margin: "5px 0" }}>
              <strong>Total:</strong> ₹{order.totalAmount}
            </p>

            <p style={{ margin: "5px 0", wordBreak: "break-word" }}>
              <strong>Address:</strong> {order.address}
            </p>

            <div className="order-items" style={{ marginTop: "10px" }}>
              {order.items.map((item, index) => (
                <div
                  key={item.productId || index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    marginBottom: "5px",
                    padding: "5px 0",
                    borderBottom: "1px dashed #ddd",
                  }}
                >
                  <span style={{ flex: "1 1 60%", wordBreak: "break-word" }}>
                    {item.name}
                  </span>
                  <span style={{ flex: "1 1 20%", textAlign: "center" }}>
                    {item.qty} ₹{item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
