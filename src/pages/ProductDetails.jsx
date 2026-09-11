import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import "./ProductDetails.css";

function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [quantity, setQuantity] = useState(1);
  const [cartMessage, setCartMessage] = useState("");
  const [cartError, setCartError] = useState("");
  const [addingToCart, setAddingToCart] = useState(false);


  // Fetch Product
  useEffect(() => {

    const fetchProduct = async () => {

      try {

        const response =
          await api.get(`/products/${id}`);

        console.log(
          "Product details:",
          response.data
        );

        setProduct(response.data);

      } catch (error) {

        console.error(
          "Product details error:",
          error
        );

        setError(
          "Failed to load product."
        );

      } finally {

        setLoading(false);

      }
    };

    fetchProduct();

  }, [id]);


  // Add Product To Cart
  const handleAddToCart = async () => {

    setCartMessage("");
    setCartError("");
    setAddingToCart(true);

    try {

      const userId =
        localStorage.getItem("userId");

      if (!userId) {

        setCartError(
          "User information not found. Please login again."
        );

        return;
      }


      const cartResponse =
        await api.get(
          `/carts/user/${userId}`
        );

      const cartId =
        cartResponse.data.cartId;


      await api.post(
        "/cart-items",
        {
          cartId: cartId,
          productId: Number(id),
          quantity: quantity
        }
      );


      setCartMessage(
        "Product added to cart successfully!"
      );

    } catch (error) {

      console.error(
        "Add to cart error:",
        error
      );

      if (error.response?.data?.message) {

        setCartError(
          error.response.data.message
        );

      } else if (error.response?.data?.error) {

        setCartError(
          error.response.data.error
        );

      } else {

        setCartError(
          "Failed to add product to cart."
        );

      }

    } finally {

      setAddingToCart(false);

    }
  };


  // Loading
  if (loading) {

    return (
      <div className="product-details-message">
        <h2>Loading product...</h2>
      </div>
    );

  }


  // Error
  if (error) {

    return (
      <div className="product-details-message">
        <h2>{error}</h2>
      </div>
    );

  }


  // Product not found
  if (!product) {

    return (
      <div className="product-details-message">
        <h2>Product not found.</h2>
      </div>
    );

  }


  return (
    <div className="product-details-page">

      <div className="product-details-card">


        {/* Product Image */}

        <div className="product-details-image-container">

          {product.imageUrl ? (

            <img
              src={`http://localhost:9090${product.imageUrl}`}
              alt={product.name}
              className="product-details-image"
            />

          ) : (

            <div className="product-details-no-image">
              No Image
            </div>

          )}

        </div>


        {/* Product Information */}

        <div className="product-details-info">

          <p className="product-details-label">
            PRODUCT
          </p>

          <h1>
            {product.name}
          </h1>


          <p className="product-details-price">
            ₹{product.price}
          </p>


          <p className="product-details-description">
            {product.description}
          </p>


          <p className="product-details-stock">

            {product.stock > 0
              ? `In Stock: ${product.stock}`
              : "Out of Stock"}

          </p>


          {product.stock > 0 && (

            <>

              {/* Quantity */}

              <div className="quantity-section">

                <label>
                  Quantity
                </label>

                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(event) => {

                    const value =
                      Number(event.target.value);

                    if (
                      value >= 1 &&
                      value <= product.stock
                    ) {

                      setQuantity(value);

                    }

                  }}
                />

              </div>


              {/* Add To Cart */}

              <button
                className="add-to-cart-button"
                onClick={handleAddToCart}
                disabled={addingToCart}
              >

                {addingToCart
                  ? "Adding..."
                  : "Add to Cart"}

              </button>


              {cartMessage && (

                <p className="cart-success">
                  {cartMessage}
                </p>

              )}


              {cartError && (

                <p className="cart-error">
                  {cartError}
                </p>

              )}

            </>

          )}


          {product.stock === 0 && (

            <p className="out-of-stock">
              This product is currently unavailable.
            </p>

          )}

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;