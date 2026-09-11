import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./AdminCategories.css";

function AdminCategories() {

  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [message, setMessage] = useState("");


  // =========================================================
  // Load Categories
  // =========================================================
  const fetchCategories = async () => {

    try {

      setLoading(true);

      setError("");

      const response =
        await api.get("/categories");

      setCategories(response.data);

    } catch (error) {

      console.error(
        "Failed to load categories:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Failed to load categories."
      );

    } finally {

      setLoading(false);

    }
  };


  // =========================================================
  // Initial Load
  // =========================================================
  useEffect(() => {

    fetchCategories();

  }, []);


  // =========================================================
  // Delete Category
  // =========================================================
  const handleDelete = async (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this category?"
      );

    if (!confirmed) {
      return;
    }


    try {

      setError("");

      setMessage("");


      await api.delete(
        `/categories/${id}`
      );


      setCategories((previousCategories) =>
        previousCategories.filter(
          (category) => category.id !== id
        )
      );


      setMessage(
        "Category deleted successfully!"
      );


    } catch (error) {

      console.error(
        "Failed to delete category:",
        error
      );


      setError(
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to delete category."
      );
    }
  };


  // =========================================================
  // Loading
  // =========================================================
  if (loading) {

    return (
      <div className="admin-category-message">

        <h2>
          Loading categories...
        </h2>

      </div>
    );

  }


  // =========================================================
  // Page
  // =========================================================
  return (
    <div className="admin-categories-page">

      <div className="admin-categories-card">

        {/* =================================================
            Header
        ================================================= */}
        <div className="admin-categories-header">

          <div>

            <p className="admin-categories-label">
              ADMIN
            </p>

            <h1>
              Category Management
            </h1>

            <p>
              Manage the categories used by your products.
            </p>

          </div>


          <Link
            to="/admin/categories/add"
            className="admin-category-add-button"
          >
            Add Category
          </Link>

        </div>


        {/* =================================================
            Success Message
        ================================================= */}
        {message && (

          <div className="admin-category-success">
            {message}
          </div>

        )}


        {/* =================================================
            Error Message
        ================================================= */}
        {error && (

          <div className="admin-category-error">
            {error}
          </div>

        )}


        {/* =================================================
            Empty State
        ================================================= */}
        {categories.length === 0 && !error ? (

          <div className="admin-category-empty">

            <h2>
              No categories found
            </h2>

            <p>
              Create your first category to get started.
            </p>

          </div>

        ) : (

          /* =================================================
             Category Table
          ================================================= */
          <div className="admin-category-table-container">

            <table className="admin-category-table">

              <thead>

                <tr>

                  <th>
                    ID
                  </th>

                  <th>
                    Category Name
                  </th>

                  <th>
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                {categories.map((category) => (

                  <tr key={category.id}>

                    <td>
                      #{category.id}
                    </td>

                    <td className="admin-category-name">
                      {category.name}
                    </td>

                    <td>

                      <div className="admin-category-actions">

                        <Link
                          to={`/admin/categories/edit/${category.id}`}
                          className="admin-category-edit-button"
                        >
                          Edit
                        </Link>


                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(category.id)
                          }
                          className="admin-category-delete-button"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

export default AdminCategories;