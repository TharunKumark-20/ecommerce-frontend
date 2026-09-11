import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderDetails from "./pages/OrderDetails";
import Orders from "./pages/Orders";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProducts from "./pages/AdminProducts";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import AdminOrders from "./pages/AdminOrders";
import EditCategory from "./pages/EditCategory";

import AdminCategories from "./pages/AdminCategories";
import AddCategory from "./pages/AddCategory";


function App() {

  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* =====================================================
            Public Routes
        ===================================================== */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />


        {/* =====================================================
            User Routes
        ===================================================== */}

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
          path="/orders"
          element={<Orders />}
        />

        <Route
          path="/orders/:id"
          element={<OrderDetails />}
        />


        {/* =====================================================
            Admin Dashboard
        ===================================================== */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />


        {/* =====================================================
            Admin Product Management
        ===================================================== */}

        <Route
          path="/admin/products"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AdminProducts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/products/add"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AddProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/products/edit/:id"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <EditProduct />
            </ProtectedRoute>
          }
        />


        {/* =====================================================
            Admin Order Management
        ===================================================== */}

        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AdminOrders />
            </ProtectedRoute>
          }
        />


        {/* =====================================================
            Admin Category Management
        ===================================================== */}

        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AdminCategories />
            </ProtectedRoute>
          }
        />
        <Route
  path="/admin/categories/edit/:id"
  element={
    <ProtectedRoute allowedRole="ADMIN">
      <EditCategory />
    </ProtectedRoute>
  }
/>

        <Route
          path="/admin/categories/add"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AddCategory />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;