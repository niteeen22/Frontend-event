import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // FETCH PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        const list = res.data.products || res.data;

        setProducts(list);
        setFiltered(list);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("search") || "";

    applySearch(search);
  }, [location.search, products]);

  const applySearch = (term) => {
    if (!term.trim()) {
      setFiltered(products);
      return;
    }

    const filteredList = products.filter((p) =>
      p.name.toLowerCase().includes(term.toLowerCase())
    );

    setFiltered(filteredList);
  };

  return (
    <div className="home">
      <h2>Featured Products</h2>

      <div className="product-grid">
        {loading ? (
          Array(35)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="product-card">
                <Skeleton height={180} />
                <Skeleton height={20} style={{ marginTop: 8 }} />
                <Skeleton width={80} height={20} />
              </div>
            ))
        ) : filtered.length ? (
          filtered.map((item) => (
            <Link
              key={item._id}
              to={`/product/${item._id}`}
              className="product-card"
            >
              <img
                src={item.images?.[0] || item.image || "/no-image.png"}
                alt={item.name}
              />
              <h3>{item.name}</h3>
              <p>${item.price}</p>
            </Link>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
