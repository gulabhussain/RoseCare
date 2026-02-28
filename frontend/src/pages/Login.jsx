import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, useNavigate, Navigate } from "react-router-dom";
const API = import.meta.env.VITE_API_URL;

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${API}/api/v1/user/login`,
        { email, password, role: "patient" },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(response.data.message);
      setIsAuthenticated(true);
      navigateTo("/");
      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="container form-component login-form">
      <h2>Welcome Back 👋</h2>
      <p style={{ fontWeight: "600" }}>
        Login to access your patient dashboard
      </p>
      <p>
        Securely manage your appointments, view medical history,
        download prescriptions, and stay connected with your doctors —
        all in one place.
      </p>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div
          style={{
            gap: "10px",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <p style={{ marginBottom: 0 }}>
            Don’t have an account?
          </p>

          <Link
            to={"/register"}
            style={{ textDecoration: "none", color: "#271776ca", fontWeight: "600" }}
          >
            Create Account
          </Link>
        </div>

        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
