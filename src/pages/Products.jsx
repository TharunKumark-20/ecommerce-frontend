import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./Products.css";

function Products() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const response = await api.get("/products");

        console.log("Products response:", response.data);

        setProducts(response.data.content);

      } catch (error) {

        console.error("Products error:", error);

        setError("Failed to load products.");

      } finally {

        setLoading(false);

      }
    };

    fetchProducts();

  }, []);

  if (loading) {
    return <h2 className="products-message">Loading products...</h2>;
  }

  if (error) {
    return <h2 className="products-message">{error}</h2>;
  }

  return (
    <div className="products-page">

      <h1>Products</h1>

      {products.length === 0 ? (

        <p className="products-message">No products found.</p>

      ) : (

        <div className="products-grid">

          {products.map((product) => (

            <div className="product-card" key={product.id}>

              {product.imageUrl ? (
                <img
                  src={`http://localhost:9090${product.imageUrl}`}
                  alt={product.name}
                  className="product-image"
                />
              ) : (
                <div className="no-image">
                  No Image
                </div>
              )}

              <div className="product-info">

                <h2>{product.name}</h2>

                <p className="product-price">
                  ₹{product.price}
                </p>

                <p>{product.description}</p>

                <p className="product-stock">
                  Stock: {product.stock}
                </p>

                <Link
  to={`/products/${product.id}`}
  className="details-button"
>
  View Details
</Link>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Products;