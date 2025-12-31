import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import withLayout from "./WithLayout";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleExportCSV = async () => {
    const token = localStorage.getItem("adminToken");

    try {
      const res = await fetch("http://localhost:5000/api/admin/export-users", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "users.csv";
      a.click();
    } catch (error) {
      console.log(error);
      alert("CSV download failed");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 800);

    return () => clearTimeout(timer);
  }, [search]);

  // Fetch paginated + searched users
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const { data } = await axios.get(
        `http://localhost:5000/api/admin/all-users?page=${currentPage}&limit=9&search=${search}`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      console.log("API Response:", data);

      setUsers(data.data || []);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, debouncedSearch]);

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure to delete this user?")) {
      try {
        const token = localStorage.getItem("adminToken");
        await axios.delete(`http://localhost:5000/api/admin/user/${id}`, {
          headers: { Authorization: "Bearer " + token },
        });

        fetchUsers();
      } catch (err) {
        console.log(err);
        alert("Failed to delete user");
      }
    }
  };

  return (
    <div className="manage-products-container">
      <h1>Manage Users</h1>
      <button onClick={handleExportCSV}>Export Users CSV</button>
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search Users..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        style={{
          padding: "8px 10px",
          border: "1px solid #d7d5d5ff",
          borderRadius: "10px",
          width: "20%",
          margin: "10px 4px",
        }}
      />

      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>
                    <Link
                      to={`/admin/users/edit/${u._id}`}
                      className="edit-btn"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteUser(u._id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{ marginTop: "20px" }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
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
    </div>
  );
};

export default withLayout (ManageUsers);
