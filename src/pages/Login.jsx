import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import GoogleLoginButton from "./GoogleLoginButton";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.user.name);
      
      toast.success("Login Successful");
      navigate("/");
    } catch (err) {
  //  CONSOLE ME BACKEND ERROR
  console.log("LOGIN ERROR FULL:", err);
  console.log("BACKEND RESPONSE:", err.response);
  console.log("ERROR MESSAGE:", err.response?.data?.message);

  // TOAST ME BHI BACKEND KA MESSAGE
  toast.error(
    err.response?.data?.message || "Invalid credentials"
  );
}

  };

  return (
    <div>
      <h2 style={{ textAlign: "center", padding: "16px" }}>User Login</h2>
             <GoogleLoginButton />
      <form onSubmit={submitHandler}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        <button type="submit" className="Login-Signup">
          Login
        </button>
        <p
          onClick={() => navigate("/forgot-password")}
          className="forgot-password"
        >
          forget-password?
        </p>
        <p onClick={() => navigate("/signup")} className="Signup-form">
          If u are not signup u please Signup first!
        </p>
      </form>
    </div>
  );
}
