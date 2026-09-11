import { Link } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {

  return (
    <div className="admin-dashboard">

      <div className="admin-dashboard-header">

        <h1>
          Admin Dashboard
        </h1>

        <p>
          Welcome to the Admin Dashboard.
        </p>

      </div>


      <div className="admin-dashboard-grid">

        {/* Product Management */}

        <div className="admin-card">

          <h2>
            Product Management
          </h2>

          <p>
            Manage the products available in your
            e-commerce application.
          </p>

          <div className="admin-card-buttons">

            <Link
              to="/admin/products"
              className="admin-button"
            >
              Manage Products
            </Link>


            <Link
              to="/admin/products/add"
              className="admin-button secondary"
            >
              Add Product
            </Link>

          </div>

        </div>


        {/* Order Management */}

        <div className="admin-card">

          <h2>
            Order Management
          </h2>

          <p>
            View customer orders and manage their
            order status.
          </p>

          <div className="admin-card-buttons">

            <Link
              to="/admin/orders"
              className="admin-button"
            >
              Manage Orders
            </Link>

          </div>

        </div>


        {/* Category Management */}

        <div className="admin-card">

          <h2>
            Category Management
          </h2>

          <p>
            Create, edit, view, and delete product
            categories.
          </p>

          <div className="admin-card-buttons">

            <Link
              to="/admin/categories"
              className="admin-button"
            >
              Manage Categories
            </Link>

            <Link
              to="/admin/categories/add"
              className="admin-button secondary"
            >
              Add Category
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;