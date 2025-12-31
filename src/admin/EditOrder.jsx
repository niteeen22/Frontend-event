import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const EditOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      const token = localStorage.getItem("adminToken");
      const { data } = await axios.get(
        "http://localhost:5000/api/admin/all-orders",
        { headers: { Authorization: "Bearer " + token } }
      );

      const order = data.orders.find((o) => o._id === id);
      setStatus(order.status);
    };

    fetchOrder();
  }, [id]);

  const updateStatus = async () => {
    const token = localStorage.getItem("adminToken");

    await axios.put(
      `http://localhost:5000/api/orders/update/${id}`,
      { status },
      { headers: { Authorization: "Bearer " + token } }
    );

    navigate("/admin/orders");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Order Status</h2>

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option>Pending</option>
        <option>Processing</option>
        <option>Shipped</option>
        <option>Delivered</option>
        <option>Cancelled</option>
      </select>

      <br />
      <br />

      <button onClick={updateStatus}>Update</button>
    </div>
  );
};

export default EditOrder;
