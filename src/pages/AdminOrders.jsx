import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./AdminOrders.css";

function AdminOrders() {

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(true);

  const [updatingOrderId, setUpdatingOrderId] = useState(null);


  useEffect(() => {

    const fetchOrders = async () => {

      try {

        const response =
          await api.get("/orders");

        console.log(
          "Orders:",
          response.data
        );

        setOrders(
          response.data
        );

      } catch (error) {

        console.error(
          "Failed to load orders:",
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


  const handleView = (orderId) => {

    navigate(`/orders/${orderId}`);

  };


  const handleStatusChange = async (
    orderId,
    newStatus
  ) => {

    setError("");

    setUpdatingOrderId(orderId);


    try {

      const response =
        await api.put(
          `/orders/status/${orderId}`,
          {
            status: newStatus
          }
        );


      console.log(
        "Updated order:",
        response.data
      );


      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.orderId === orderId
            ? {
                ...order,
                status: response.data.status
              }
            : order
        )
      );


    } catch (error) {

      console.error(
        "Failed to update order status:",
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
          "Failed to update order status."
        );

      }

    } finally {

      setUpdatingOrderId(null);

    }
  };


  const handleDelete = async (orderId) => {

    const confirmed =
      window.confirm(
        `Are you sure you want to delete Order #${orderId}?`
      );

    if (!confirmed) {
      return;
    }


    setError("");


    try {

      await api.delete(
        `/orders/${orderId}`
      );


      setOrders((currentOrders) =>
        currentOrders.filter(
          (order) =>
            order.orderId !== orderId
        )
      );


    } catch (error) {

      console.error(
        "Failed to delete order:",
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
          "Failed to delete order."
        );

      }
    }
  };


  if (loading) {

    return (
      <div className="admin-orders-message">

        <h2>
          Loading orders...
        </h2>

      </div>
    );

  }


  if (error && orders.length === 0) {

    return (
      <div className="admin-orders-message">

        <h2>
          {error}
        </h2>

      </div>
    );

  }


  return (
    <div className="admin-orders-page">

      <div className="admin-orders-header">

        <div>

          <p className="admin-orders-label">
            ADMIN
          </p>

          <h1>
            Order Management
          </h1>

          <p className="admin-orders-description">
            View customer orders and manage their status.
          </p>

        </div>

      </div>


      {error && (

        <div className="admin-orders-error">
          {error}
        </div>

      )}


      {orders.length === 0 ? (

        <div className="admin-orders-empty">

          <h2>
            No orders found
          </h2>

          <p>
            There are currently no customer orders.
          </p>

        </div>

      ) : (

        <div className="admin-orders-table-container">

          <table className="admin-orders-table">

            <thead>

              <tr>

                <th>
                  ID
                </th>

                <th>
                  User
                </th>

                <th>
                  Total
                </th>

                <th>
                  Status
                </th>

                <th>
                  Update Status
                </th>

                <th>
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              {orders.map((order) => (

                <tr key={order.orderId}>

                  <td>
                    #{order.orderId}
                  </td>

                  <td>
                    User #{order.userId}
                  </td>

                  <td className="admin-order-total">
                    ₹{order.totalAmount}
                  </td>

                  <td>

                    <span
                      className={`admin-order-status status-${order.status.toLowerCase()}`}
                    >
                      {order.status}
                    </span>

                  </td>

                  <td>

                    <select
                      className="admin-order-status-select"
                      value={order.status}
                      disabled={
                        updatingOrderId ===
                        order.orderId
                      }
                      onChange={(event) =>
                        handleStatusChange(
                          order.orderId,
                          event.target.value
                        )
                      }
                    >

                      <option value="PENDING">
                        PENDING
                      </option>

                      <option value="CONFIRMED">
                        CONFIRMED
                      </option>

                      <option value="SHIPPED">
                        SHIPPED
                      </option>

                      <option value="DELIVERED">
                        DELIVERED
                      </option>

                      <option value="CANCELLED">
                        CANCELLED
                      </option>

                    </select>

                  </td>

                  <td>

                    <div className="admin-order-actions">

                      <button
                        className="view-order-button"
                        onClick={() =>
                          handleView(
                            order.orderId
                          )
                        }
                      >
                        View
                      </button>


                      <button
                        className="delete-order-button"
                        onClick={() =>
                          handleDelete(
                            order.orderId
                          )
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

export default AdminOrders;