import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import "./OrderDetails.css";

function OrderDetails() {

  const { id } = useParams();

  const [order, setOrder] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [cancelling, setCancelling] = useState(false);

  const [cancelMessage, setCancelMessage] = useState("");


  // Fetch Order
  const fetchOrder = async () => {

    try {

      const response =
        await api.get(`/orders/${id}`);


      console.log(
        "Order details:",
        response.data
      );


      setOrder(response.data);


    } catch (error) {

      console.error(
        "Order details error:",
        error
      );


      setError(
        "Failed to load order details."
      );


    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {

    fetchOrder();

  }, [id]);


  // Cancel Order
  const handleCancelOrder = async () => {

    const confirmCancel =
      window.confirm(
        "Are you sure you want to cancel this order?"
      );


    if (!confirmCancel) {
      return;
    }


    setCancelling(true);

    setError("");

    setCancelMessage("");


    try {

      const response =
        await api.put(
          `/orders/cancel/${id}`
        );


      console.log(
        "Cancelled order:",
        response.data
      );


      setCancelMessage(
        "Order cancelled successfully."
      );


      // Reload order details
      await fetchOrder();


    } catch (error) {

      console.error(
        "Cancel order error:",
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
          "Failed to cancel order."
        );

      }


    } finally {

      setCancelling(false);

    }
  };


  // Loading
  if (loading) {

    return (
      <div className="order-details-message">

        <h2>
          Loading order...
        </h2>

      </div>
    );

  }


  // Error
  if (error && !order) {

    return (
      <div className="order-details-message">

        <h2>
          {error}
        </h2>

      </div>
    );

  }


  // Order not found
  if (!order) {

    return (
      <div className="order-details-message">

        <h2>
          Order not found.
        </h2>

      </div>
    );

  }


  return (
    <div className="order-details-page">

      {/* Header */}

      <div className="order-details-header">

        <h1>
          Order #{order.orderId}
        </h1>


        <span
          className={`order-status status-${order.status.toLowerCase()}`}
        >
          {order.status}
        </span>

      </div>


      {/* Order information */}

      <div className="order-details-meta">

        <div className="order-meta-card">

          <span className="order-meta-label">
            Order Date
          </span>

          <p className="order-meta-value">
            {new Date(
              order.orderDate
            ).toLocaleString()}
          </p>

        </div>


        <div className="order-meta-card">

          <span className="order-meta-label">
            Order Number
          </span>

          <p className="order-meta-value">
            #{order.orderId}
          </p>

        </div>

      </div>


      {/* Order items */}

      <div className="order-items-section">

        <h2>
          Order Items
        </h2>


        {order.items.map((item, index) => (

          <div
            className="order-item-card"
            key={index}
          >

            <div className="order-item-info">

              <h3>
                {item.productName}
              </h3>

              <p>
                Price: ₹{item.price}
              </p>

              <p>
                Quantity: {item.quantity}
              </p>

            </div>


            <div className="order-item-subtotal">

              ₹{item.subTotal}

            </div>

          </div>

        ))}

      </div>


      {/* Total */}

      <div className="order-total-section">

        <span className="order-total-label">
          Total
        </span>

        <span className="order-total-value">
          ₹{order.totalAmount}
        </span>

      </div>


      {/* Actions */}

      <div className="order-actions">

        {order.status === "PENDING" && (

          <button
            className="cancel-order-button"
            onClick={handleCancelOrder}
            disabled={cancelling}
          >

            {cancelling
              ? "Cancelling..."
              : "Cancel Order"}

          </button>

        )}


        {cancelMessage && (

          <p className="cancel-success">
            {cancelMessage}
          </p>

        )}


        {error && (

          <p className="order-error">
            {error}
          </p>

        )}

      </div>

    </div>
  );
}

export default OrderDetails;