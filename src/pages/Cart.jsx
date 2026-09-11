import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./Cart.css";

function Cart() {

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCart = async () => {

    try {

      const userId =
        localStorage.getItem("userId");

      if (!userId) {

        setError(
          "User not found. Please login again."
        );

        return;
      }

      const response =
        await api.get(`/carts/user/${userId}`);

      console.log(
        "Cart response:",
        response.data
      );

      setCart(response.data);

    } catch (error) {

      console.error(
        "Cart error:",
        error
      );

      setError(
        "Failed to load cart."
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {

    fetchCart();

  }, []);


  if (loading) {

    return (
      <h2 className="cart-message">
        Loading cart...
      </h2>
    );

  }


  if (error) {

    return (
      <h2 className="cart-message">
        {error}
      </h2>
    );

  }


  if (!cart) {

    return (
      <h2 className="cart-message">
        Cart not found.
      </h2>
    );

  }


  return (
    <div className="cart-page">

      <h1>
        Your Cart
      </h1>


      {cart.items.length === 0 ? (

        <div className="empty-cart">

          <h2>
            Your cart is empty.
          </h2>

          <p>
            Add some products to your cart.
          </p>

          <Link
            to="/products"
            className="shop-button"
          >
            Continue Shopping
          </Link>

        </div>

      ) : (

        <>

          <div className="cart-items">

            {cart.items.map((item) => (

              <div
                className="cart-item"
                key={item.id}
              >

                <div className="cart-item-info">

                  <h2>
                    {item.productName}
                  </h2>

                  <p>
                    Price: ₹{item.price}
                  </p>

                  <p>
                    Quantity: {item.quantity}
                  </p>

                </div>


                <div className="cart-item-total">

                  <p>
                    Subtotal
                  </p>

                  <strong>
                    ₹{item.subTotal}
                  </strong>

                </div>

              </div>

            ))}

          </div>


          <div className="cart-summary">

            <p>
              Total
            </p>

            <h2>
              ₹{cart.totalAmount}
            </h2>

            <Link
              to="/checkout"
              className="checkout-button"
            >
              Proceed to Checkout
            </Link>

          </div>

        </>

      )}

    </div>
  );
}

export default Cart;