import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import withLayout from "./WithLayout";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchTimer, setSearchTimer] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 9;

  const handleExportCSV = async () => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(
        "http://localhost:5000/api/admin/export-products",
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
      a.download = "products.csv";
      a.click();
    } catch (error) {
      console.error(error);
      alert("CSV File Download failed");
    }
  };

  const fetchProducts = async (page = 1, searchTerm = "") => {
    try {
      const token = localStorage.getItem("adminToken");
      const { data } = await axios.get(
        `http://localhost:5000/api/admin/all-products?page=${page}&limit=${itemsPerPage}&search=${searchTerm}`,
        { headers: { Authorization: "Bearer " + token } }
      );

      setProducts(data.data);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch products");
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure to delete?")) {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`http://localhost:5000/api/admin/product/${id}`, {
        headers: { Authorization: "Bearer " + token },
      });
      fetchProducts(currentPage, search);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    // setSearch(e.target.value);
    if (searchTimer) clearTimeout(searchTimer);
    const timer = setTimeout(() => {
      fetchProducts(1, value);
    }, 800);
    setSearchTimer(timer);
    // fetchProducts(1, e.target.value);
  };

  const handlePageChange = (page) => fetchProducts(page, search);

  return (
    <div className="manage-products-container">
      <h1>Manage Products</h1>
      <button
        onClick={handleExportCSV}
        style={{ margin: "4px", padding: "10px", textAlign: "center" }}
      >
        Export-Products
      </button>
      <Link to="/admin/products/add" className="add-product-btn">
        Add Product
      </Link>

      <input
        type="text"
        placeholder="Search Product..."
        value={search}
        onChange={handleSearch}
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
              <th>Price</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>
                  <img
                    src={p.images?.[0] || p.image || "/no-image.png"}
                    alt={p.name}
                    width={80}
                  />
                </td>
                <td>
                  <Link
                    to={`/admin/products/edit/${p._id}`}
                    className="edit-btn"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteProduct(p._id)}
                    className="delete-btn"
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
    </div>
  );
};

export default withLayout(ManageProducts);
