import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./AddCategory.css";

function AddCategory() {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [error, setError] = useState("");

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);


  // =========================================================
  // Handle Form Submit
  // =========================================================
  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");

    setMessage("");

    setLoading(true);


    try {

      await api.post(
        "/categories",
        {
          name: name.trim(),
        }
      );


      setMessage(
        "Category created successfully!"
      );


      setName("");


      // Redirect after a short delay
      setTimeout(() => {

        navigate("/admin/categories");

      }, 1000);


    } catch (error) {

      console.error(
        "Failed to create category:",
        error
      );


      if (error.response?.data?.message) {

        setError(
          error.response.data.message
        );

      } else if (error.response?.data?.error) {

        setError(
          error.response.data.error
        );

      } else {

        setError(
          "Failed to create category."
        );
      }

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="add-category-page">

      <div className="add-category-card">

        {/* =================================================
            Header
        ================================================= */}
        <div className="add-category-header">

          <p className="add-category-label">
            ADMIN
          </p>

          <h1>
            Add Category
          </h1>

          <p>
            Create a new product category.
          </p>

        </div>


        {/* =================================================
            Success Message
        ================================================= */}
        {message && (

          <div className="add-category-success">
            {message}
          </div>

        )}


        {/* =================================================
            Error Message
        ================================================= */}
        {error && (

          <div className="add-category-error">
            {error}
          </div>

        )}


        {/* =================================================
            Form
        ================================================= */}
        <form
          onSubmit={handleSubmit}
          className="add-category-form"
        >

          <div className="add-category-field">

            <label htmlFor="categoryName">
              Category Name
            </label>

            <input
              id="categoryName"
              type="text"
              placeholder="Enter category name"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              required
            />

          </div>


          {/* =================================================
              Buttons
          ================================================= */}
          <div className="add-category-buttons">

            <Link
              to="/admin/categories"
              className="add-category-cancel"
            >
              Cancel
            </Link>


            <button
              type="submit"
              className="add-category-submit"
              disabled={loading}
            >
              {loading
                ? "Creating..."
                : "Create Category"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddCategory;