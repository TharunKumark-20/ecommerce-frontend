import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "./EditCategory.css";

function EditCategory() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [message, setMessage] = useState("");


  // =========================================================
  // Load Category
  // =========================================================
  useEffect(() => {

    const fetchCategory = async () => {

      try {

        setLoading(true);

        setError("");

        const response =
          await api.get(`/categories/${id}`);

        setName(response.data.name || "");

      } catch (error) {

        console.error(
          "Failed to load category:",
          error
        );

        setError(
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to load category."
        );

      } finally {

        setLoading(false);

      }
    };


    fetchCategory();

  }, [id]);


  // =========================================================
  // Update Category
  // =========================================================
  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");

    setMessage("");


    const trimmedName = name.trim();

    if (!trimmedName) {

      setError(
        "Category name is required."
      );

      return;
    }


    try {

      setSaving(true);

      await api.put(
        `/categories/${id}`,
        {
          name: trimmedName,
        }
      );


      setMessage(
        "Category updated successfully!"
      );


      setTimeout(() => {

        navigate("/admin/categories");

      }, 1000);

    } catch (error) {

      console.error(
        "Failed to update category:",
        error
      );


      setError(
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to update category."
      );

    } finally {

      setSaving(false);

    }
  };


  // =========================================================
  // Loading
  // =========================================================
  if (loading) {

    return (
      <div className="edit-category-message">

        <h2>
          Loading category...
        </h2>

      </div>
    );

  }


  // =========================================================
  // Error Loading Category
  // =========================================================
  if (error && !name) {

    return (
      <div className="edit-category-message">

        <h2>
          {error}
        </h2>

        <Link
          to="/admin/categories"
          className="edit-category-back-button"
        >
          Back to Categories
        </Link>

      </div>
    );

  }


  // =========================================================
  // UI
  // =========================================================
  return (
    <div className="edit-category-page">

      <div className="edit-category-card">

        {/* =================================================
            Header
        ================================================= */}
        <div className="edit-category-header">

          <p className="edit-category-label">
            ADMIN
          </p>

          <h1>
            Edit Category
          </h1>

          <p>
            Update the name of this product category.
          </p>

        </div>


        {/* =================================================
            Success Message
        ================================================= */}
        {message && (

          <div className="edit-category-success">
            {message}
          </div>

        )}


        {/* =================================================
            Error Message
        ================================================= */}
        {error && (

          <div className="edit-category-error">
            {error}
          </div>

        )}


        {/* =================================================
            Form
        ================================================= */}
        <form
          onSubmit={handleSubmit}
          className="edit-category-form"
        >

          <div className="edit-category-field">

            <label htmlFor="categoryName">
              Category Name
            </label>

            <input
              id="categoryName"
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="Enter category name"
              required
            />

          </div>


          <div className="edit-category-buttons">

            <Link
              to="/admin/categories"
              className="edit-category-cancel"
            >
              Cancel
            </Link>


            <button
              type="submit"
              className="edit-category-submit"
              disabled={saving}
            >
              {saving
                ? "Updating..."
                : "Update Category"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditCategory;