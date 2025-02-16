import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "./api";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const location = useLocation();  

  const from = location.state?.from?.pathname || "/"; // Default to home if no previous path

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("http://localhost:8080/api/properties/login", formData);
    // const res = await api.post("/api/properties/login", formData);
      localStorage.setItem("token", res.data.token);
      navigate(from, { replace: true }); // Default to home if no previous path
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
        <input type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
