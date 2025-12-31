import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { Rating } from "react-simple-star-rating";

const ProductDetails = () => {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const { addToCart } = useContext(CartContext);

  const [userRating, setUserRating] = useState(0);

  const handleRating = async (rate) => {
    setUserRating(rate);

    const res = await fetch(`http://localhost:5000/api/products/rate/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating: rate }),
    });

    const data = await res.json();
    setP(data.product);

    alert("Thanks! Rating submitted.");
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const product = data.product || data;

        console.log("FULL PRODUCT:", product);

        setP(product);
        setUserRating(product.rating || 0);
      })
      .catch((err) => console.log("Error:", err));
  }, [id]);

  if (!p) return <h2>Loading...</h2>;

  return (
    <div className="details-wrapper">
      <div className="details-left">
        <img
          className="product-detail"
          src={`${p.images?.[0]}`}
          alt={p.name}
          onError={() => console.log("Image load error:", p.images?.[0])}
        />
      </div>

      <div className="details-right">
        <h1>{p.name}</h1>

        <p>
          <strong>Description- </strong>
          {p.description}
        </p>

        <p>
          <strong>Rating: </strong>
          <Rating onClick={handleRating} initialValue={userRating} size={28} />
          <span style={{ marginLeft: "8px" }}>({p.rating?.toFixed(1)})</span>
        </p>

        <p>
          <strong>Price- </strong>${p.price}
        </p>

        <button onClick={() => addToCart(p)} className="add-to-cart">
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
