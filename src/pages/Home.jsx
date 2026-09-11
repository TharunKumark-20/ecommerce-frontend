import { Link } from "react-router-dom";
import "./Home.css";

function Home() {

  return (
    <div className="home-page">

      <section className="home-hero">

        <p className="home-label">
          WELCOME
        </p>

        <h1>
          Welcome to Our E-Commerce Store
        </h1>

        <p className="home-description">
          Discover great products at great prices.
        </p>

        <Link
          to="/products"
          className="home-shop-button"
        >
          Shop Now
        </Link>

      </section>


      <section className="home-features">

        <div className="home-feature-card">

          <h2>
            Quality Products
          </h2>

          <p>
            Explore a collection of products
            selected for your everyday needs.
          </p>

        </div>


        <div className="home-feature-card">

          <h2>
            Easy Shopping
          </h2>

          <p>
            Browse products, add them to your
            cart, and complete your order easily.
          </p>

        </div>


        <div className="home-feature-card">

          <h2>
            Simple Checkout
          </h2>

          <p>
            Choose your payment method and
            place your order in just a few steps.
          </p>

        </div>

      </section>

    </div>
  );
}

export default Home;