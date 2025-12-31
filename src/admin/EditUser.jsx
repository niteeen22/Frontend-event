import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("adminToken");
      const { data } = await axios.get(
        `http://localhost:5000/api/admin/users/${id}`,
        { headers: { Authorization: "Bearer " + token } }
      );
      setUser(data.user);
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");

    await axios.put(`http://localhost:5000/api/admin/users/${id}`, user, {
      headers: { Authorization: "Bearer " + token },
    });

    navigate("/admin/users");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit User</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          placeholder="Name"
        />
        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
        />
        <button type="submit">
          Update
          <Toaster />
        </button>
      </form>
    </div>
  );
};

export default EditUser;
