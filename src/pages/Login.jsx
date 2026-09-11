import { useState } from "react";
import api from "../services/api";
import "./Login.css";

function Login() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");


  const handleChange = (event) => {

    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

  };


  const handleSubmit = async (event) => {

    event.preventDefault();

    setMessage("");
    setError("");

    try {

      const response =
        await api.post("/auth/login", formData);


      const {
        accessToken,
        refreshToken,
        userId
      } = response.data;


      // Store authentication information
      localStorage.setItem(
        "accessToken",
        accessToken
      );

      localStorage.setItem(
        "refreshToken",
        refreshToken
      );

      localStorage.setItem(
        "userId",
        userId
      );


      // Extract role from JWT
      const payload =
        JSON.parse(
          atob(
            accessToken
              .split(".")[1]
              .replace(/-/g, "+")
              .replace(/_/g, "/")
          )
        );


      const role = payload.role;


      // Store user role
      localStorage.setItem(
        "role",
        role
      );


      console.log("Login successful");
      console.log("User ID:", userId);
      console.log("User Role:", role);


      setMessage("Login successful!");


    } catch (error) {

      console.error(
        "Login error:",
        error
      );


      if (error.response?.data?.message) {

        setError(
          error.response.data.message
        );

      } else {

        setError(
          "Login failed. Please check your email and password."
        );

      }
    }
  };


  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-header">

          <h1>
            Welcome Back
          </h1>

          <p>
            Login to your E-Commerce account
          </p>

        </div>


        <form
          onSubmit={handleSubmit}
          className="login-form"
        >

          <div className="login-field">

            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />

          </div>


          <div className="login-field">

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />

          </div>


          <button
            type="submit"
            className="login-button"
          >
            Login
          </button>

        </form>


        {message && (
          <p className="login-success">
            {message}
          </p>
        )}


        {error && (
          <p className="login-error">
            {error}
          </p>
        )}

      </div>

    </div>
  );
}

export default Login;