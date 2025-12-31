import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) navigate("/login");
    else setError(data.message || "Signup failed");
  };

  return (
    <div className="Signup-page">
      <form onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <input
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit" className="Login-Signup">
          Signup
        </button>
        {error && <p>{error}</p>}
        <p onClick={() => navigate("/login")}>Already have an account?</p>
      </form>
    </div>
  );
};

export default Signup;
