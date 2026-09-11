import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./Orders.css";

function Orders() {

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  useEffect(() => {

    const fetchOrders = async () => {

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
          await api.get(
            `/orders/user/${userId}`
          );


        console.log(
          "Orders response:",
          response.data
        );


        setOrders(
          response.data
        );


      } catch (error) {

        console.error(
          "Orders error:",
          error
        );


        setError(
          "Failed to load orders."
        );


      } finally {

        setLoading(false);

      }

    };


    fetchOrders();

  }, []);


  if (loading) {

    return (
      <div className="orders-message">

        <h2>
          Loading orders...
        </h2>

      </div>
    );

  }


  if (error) {

    return (
      <div className="orders-message">

        <h2>
          {error}
        </h2>

      </div>
    );

  }


  return (
    <div className="orders-page">

      <h1>
        My Orders
      </h1>


      {orders.length === 0 ? (

        <div className="empty-orders">

          <h2>
            No orders yet
          </h2>

          <p>
            You haven't placed any orders yet.
          </p>


          <Link
            to="/products"
            className="orders-shop-button"
          >
            Start Shopping
          </Link>

        </div>

      ) : (

        <div className="orders-list">

          {orders.map((order) => (

            <div
              className="order-card"
              key={order.orderId}
            >

              <div className="order-card-header">

                <div>

                  <p className="order-label">
                    ORDER
                  </p>

                  <h2>
                    #{order.orderId}
                  </h2>

                </div>


                <span
                  className={`order-status status-${order.status.toLowerCase()}`}
                >
                  {order.status}
                </span>

              </div>


              <div className="order-card-details">

                <div>

                  <span className="order-detail-label">
                    Order Date
                  </span>

                  <p>
                    {new Date(
                      order.orderDate
                    ).toLocaleString()}
                  </p>

                </div>


                <div>

                  <span className="order-detail-label">
                    Total
                  </span>

                  <p className="order-total">
                    ₹{order.totalAmount}
                  </p>

                </div>

              </div>


              <Link
                to={`/orders/${order.orderId}`}
                className="view-order-button"
              >
                View Order
              </Link>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Orders;