const API_URL = "http://localhost:5000/api/auth";

export const signup = async (userData) => {
  try {
    const res = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return await res.json();
  } catch (err) {
    console.error("Signup Error:", err);
    return { message: "Signup failed" };
  }
};

export const login = async (userData) => {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return await res.json();
  } catch (err) {
    console.error("Login Error:", err);
    return { message: "Login failed" };
  }
};
