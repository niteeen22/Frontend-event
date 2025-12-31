import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const GoogleLoginButton = () => {

  const handleGoogleLogin = async(response) => {
    const decoded = jwtDecode(response.credential);

    console.log("Decoded Token:", decoded);

    const userData = {
      googleId: decoded.sub,
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
    };

    console.log("User Data:", userData);

      try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/google-login",
      {
        credential: response.credential,
      }
    );

    console.log("Backend Response:", res.data);

    // JWT save
    localStorage.setItem("token", res.data.token);

    // User save (optional)
    localStorage.setItem("user", JSON.stringify(res.data.user));

  } catch (error) {
    console.log("Login Error:", error);
  }
  };

  return (
    <div style={{justifyItems:"center"}}>
      <h2>Login with Google</h2>

      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={() => {
          console.log("Google Login Failed");
        }}
      />
    </div>
  );
};

export default GoogleLoginButton;
