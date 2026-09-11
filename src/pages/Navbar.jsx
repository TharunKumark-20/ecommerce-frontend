import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

  const navigate = useNavigate();

  const accessToken =
    localStorage.getItem("accessToken");

  const role =
    localStorage.getItem("role");


  const handleLogout = () => {

    localStorage.removeItem("accessToken");

    localStorage.removeItem("refreshToken");

    localStorage.removeItem("userId");

    localStorage.removeItem("role");

    navigate("/login");
  };


  return (
    <nav className="navbar">

      <div className="navbar-container">

        <Link
          to="/"
          className="navbar-brand"
        >
          E-Commerce Store
        </Link>


        <div className="navbar-links">

          <Link
            to="/"
            className="navbar-link"
          >
            Home
          </Link>


          <Link
            to="/products"
            className="navbar-link"
          >
            Products
          </Link>


          {accessToken && (

            <>

              <Link
                to="/cart"
                className="navbar-link"
              >
                Cart
              </Link>


              <Link
                to="/orders"
                className="navbar-link"
              >
                My Orders
              </Link>


              <Link
                to="/checkout"
                className="navbar-link"
              >
                Checkout
              </Link>


              {role === "ADMIN" && (

                <Link
                  to="/admin"
                  className="navbar-link admin-link"
                >
                  Admin
                </Link>

              )}


              <button
                onClick={handleLogout}
                className="logout-button"
              >
                Logout
              </button>

            </>

          )}


          {!accessToken && (

            <>

              <Link
                to="/login"
                className="navbar-link"
              >
                Login
              </Link>


              <Link
                to="/register"
                className="navbar-link"
              >
                Register
              </Link>

            </>

          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;