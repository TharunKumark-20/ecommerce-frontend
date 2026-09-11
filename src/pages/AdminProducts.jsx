import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./AdminProducts.css";

function AdminProducts() {

  const [products, setProducts] = useState([]);

  const [error, setError] = useState("");


  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const response =
          await api.get("/products");

        console.log(
          "Products:",
          response.data
        );

        setProducts(
          response.data.content
        );

      } catch (error) {

        console.error(
          "Failed to load products:",
          error
        );

        setError(
          "Failed to load products."
        );
      }
    };

    fetchProducts();

  }, []);


  const handleDelete = async (productId) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this product?"
      );

    if (!confirmed) {
      return;
    }


    try {

      await api.delete(
        `/products/${productId}`
      );


      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) =>
            product.id !== productId
        )
      );


    } catch (error) {

      console.error(
        "Failed to delete product:",
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
          "Failed to delete product."
        );

      }
    }
  };


  return (
    <div className="admin-products-page">

      <div className="admin-products-header">

        <div>

          <p className="admin-products-label">
            ADMIN
          </p>

          <h1>
            Product Management
          </h1>

          <p className="admin-products-description">
            View, add, edit, and manage your products.
          </p>

        </div>


        <Link
          to="/admin/products/add"
          className="add-product-button"
        >
          Add Product
        </Link>

      </div>


      {error && (

        <div className="admin-products-error">
          {error}
        </div>

      )}


      {products.length === 0 ? (

        <div className="admin-products-empty">

          <h2>
            No products found
          </h2>

          <p>
            Add your first product to get started.
          </p>

          <Link
            to="/admin/products/add"
            className="add-product-button"
          >
            Add Product
          </Link>

        </div>

      ) : (

        <div className="admin-products-table-container">

          <table className="admin-products-table">

            <thead>

              <tr>

                <th>
                  ID
                </th>

                <th>
                  Product
                </th>

                <th>
                  Price
                </th>

                <th>
                  Stock
                </th>

                <th>
                  Category
                </th>

                <th>
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              {products.map((product) => (

                <tr key={product.id}>

                  <td>
                    #{product.id}
                  </td>

                  <td>
                    <strong>
                      {product.name}
                    </strong>
                  </td>

                  <td className="admin-product-price">
                    ₹{product.price}
                  </td>

                  <td>
                    <span
                      className={
                        product.stock > 0
                          ? "stock-available"
                          : "stock-empty"
                      }
                    >
                      {product.stock}
                    </span>
                  </td>

                  <td>
                    {product.categoryName || "—"}
                  </td>

                  <td>

                    <div className="admin-product-actions">

                      <Link
                        to={`/admin/products/edit/${product.id}`}
                        className="edit-product-button"
                      >
                        Edit
                      </Link>


                      <button
                        className="delete-product-button"
                        onClick={() =>
                          handleDelete(product.id)
                        }
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
  );
}

export default AdminProducts;