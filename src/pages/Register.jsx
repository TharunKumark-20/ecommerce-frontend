import { useState } from "react";
import api from "../services/api";
import "./Register.css";

function Register() {

  const [formData, setFormData] = useState({
    name: "",
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

      await api.post(
        "/auth/register",
        formData
      );


      setMessage(
        "Registration successful!"
      );


      setFormData({
        name: "",
        email: "",
        password: "",
      });


    } catch (error) {

      console.error(
        "Registration error:",
        error
      );


      if (error.response?.data?.message) {

        setError(
          error.response.data.message
        );

      } else {

        setError(
          "Registration failed. Please try again."
        );

      }
    }
  };


  return (
    <div className="register-page">

      <div className="register-card">

        <div className="register-header">

          <h1>
            Create Account
          </h1>

          <p>
            Join our E-Commerce Store
          </p>

        </div>


        <form
          onSubmit={handleSubmit}
          className="register-form"
        >

          <div className="register-field">

            <label htmlFor="name">
              Name
            </label>

            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />

          </div>


          <div className="register-field">

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


          <div className="register-field">

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />

          </div>


          <button
            type="submit"
            className="register-button"
          >
            Register
          </button>

        </form>


        {message && (

          <p className="register-success">
            {message}
          </p>

        )}


        {error && (

          <p className="register-error">
            {error}
          </p>

        )}

      </div>

    </div>
  );
}

export default Register;