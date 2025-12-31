import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const id = params.get("id");

  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, id, password }),
    });
    const data = await res.json();
    setMsg(data.message);
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Reset</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
};

export default ResetPassword;
