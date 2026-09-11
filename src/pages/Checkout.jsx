import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Checkout.css";

function Checkout() {

  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  // Fetch Cart
  useEffect(() => {

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

        setCart(response.data);

      } catch (error) {

        console.error(
          "Checkout cart error:",
          error
        );

        setError(
          "Failed to load cart."
        );

      } finally {

        setLoading(false);

      }
    };

    fetchCart();

  }, []);


  // Place Order
  const handlePlaceOrder = async () => {

    setError("");
    setSuccess("");
    setPlacingOrder(true);

    try {

      const userId =
        localStorage.getItem("userId");

      if (!userId) {

        setError(
          "User not found. Please login again."
        );

        return;
      }


      if (!cart || cart.items.length === 0) {

        setError(
          "Your cart is empty."
        );

        return;
      }


      // Create Order
      const orderResponse =
        await api.post(
          "/orders",
          {
            userId: Number(userId)
          }
        );


      const order =
        orderResponse.data;


      console.log(
        "Order created:",
        order
      );


      // Make Payment
      const paymentResponse =
        await api.post(
          "/payments",
          {
            orderId: order.id,
            paymentMethod: paymentMethod
          }
        );


      console.log(
        "Payment successful:",
        paymentResponse.data
      );


      setSuccess(
        `Order #${order.id} placed successfully!`
      );


      setTimeout(() => {

        navigate(`/orders/${order.id}`);

      }, 1500);


    } catch (error) {

      console.error(
        "Checkout error:",
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
          "Failed to place order."
        );

      }

    } finally {

      setPlacingOrder(false);

    }
  };


  if (loading) {

    return (
      <div className="checkout-message">
        <h2>Loading checkout...</h2>
      </div>
    );

  }


  if (error && !cart) {

    return (
      <div className="checkout-message">
        <h2>{error}</h2>
      </div>
    );

  }


  if (!cart) {

    return (
      <div className="checkout-message">
        <h2>Cart not found.</h2>
      </div>
    );

  }


  if (cart.items.length === 0) {

    return (
      <div className="checkout-message">

        <h1>
          Checkout
        </h1>

        <p>
          Your cart is empty.
        </p>

      </div>
    );

  }


  return (
    <div className="checkout-page">

      <h1>
        Checkout
      </h1>


      <div className="checkout-container">


        {/* Order Summary */}

        <div className="order-summary">

          <h2>
            Order Summary
          </h2>


          {cart.items.map((item) => (

            <div
              className="checkout-item"
              key={item.id}
            >

              <div>

                <h3>
                  {item.productName}
                </h3>

                <p>
                  ₹{item.price} × {item.quantity}
                </p>

              </div>


              <strong>
                ₹{item.subTotal}
              </strong>

            </div>

          ))}


          <div className="checkout-total">

            <span>
              Total
            </span>

            <strong>
              ₹{cart.totalAmount}
            </strong>

          </div>

        </div>


        {/* Payment Section */}

        <div className="payment-section">

          <h2>
            Payment Method
          </h2>


          <label>
            Choose your payment method
          </label>


          <select
            value={paymentMethod}
            onChange={(event) =>
              setPaymentMethod(
                event.target.value
              )
            }
          >

            <option value="COD">
              Cash on Delivery
            </option>

            <option value="UPI">
              UPI
            </option>

            <option value="CREDIT_CARD">
              Credit Card
            </option>

            <option value="DEBIT_CARD">
              Debit Card
            </option>

            <option value="NET_BANKING">
              Net Banking
            </option>

          </select>


          <button
            className="place-order-button"
            onClick={handlePlaceOrder}
            disabled={placingOrder}
          >

            {placingOrder
              ? "Processing..."
              : "Place Order"}

          </button>


          {success && (

            <p className="checkout-success">
              {success}
            </p>

          )}


          {error && (

            <p className="checkout-error">
              {error}
            </p>

          )}

        </div>

      </div>

    </div>
  );
}

export default Checkout;