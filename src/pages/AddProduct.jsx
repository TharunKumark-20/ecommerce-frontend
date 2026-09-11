import { useEffect, useState } from "react";
import api from "../services/api";
import "./AddProduct.css";

function AddProduct() {

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    categoryId: "",
  });

  const [image, setImage] = useState(null);

  const [categories, setCategories] = useState([]);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");


  // Load categories
  useEffect(() => {

    const fetchCategories = async () => {

      try {

        const response =
          await api.get("/categories");

        setCategories(
          response.data
        );

      } catch (error) {

        console.error(
          "Failed to load categories:",
          error
        );

        setError(
          "Failed to load categories."
        );
      }
    };

    fetchCategories();

  }, []);


  // Handle text/select fields
  const handleChange = (event) => {

    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

  };


  // Handle image
  const handleImageChange = (event) => {

    setImage(
      event.target.files[0]
    );

  };


  // Submit product
  const handleSubmit = async (event) => {

    event.preventDefault();

    setMessage("");

    setError("");


    if (!image) {

      setError(
        "Please select a product image."
      );

      return;
    }


    try {

      const productData =
        new FormData();


      productData.append(
        "name",
        formData.name
      );

      productData.append(
        "price",
        formData.price
      );

      productData.append(
        "description",
        formData.description
      );

      productData.append(
        "stock",
        formData.stock
      );

      productData.append(
        "categoryId",
        formData.categoryId
      );

      productData.append(
        "image",
        image
      );


      const response =
        await api.post(
          "/products",
          productData
        );


      console.log(
        "Product created:",
        response.data
      );


      setMessage(
        "Product added successfully!"
      );


      // Clear form
      setFormData({
        name: "",
        price: "",
        description: "",
        stock: "",
        categoryId: "",
      });

      setImage(null);


      // Reset file input
      event.target.reset();


    } catch (error) {

      console.error(
        "Failed to add product:",
        error
      );


      if (
        error.response?.data?.message
      ) {

        setError(
          error.response.data.message
        );

      } else if (
        error.response?.data?.error
      ) {

        setError(
          error.response.data.error
        );

      } else {

        setError(
          "Failed to add product."
        );

      }
    }
  };


  return (
    <div className="add-product-page">

      <div className="add-product-card">

        <div className="add-product-header">

          <p className="add-product-label">
            ADMIN
          </p>

          <h1>
            Add Product
          </h1>

          <p>
            Add a new product to your store.
          </p>

        </div>


        {message && (

          <div className="add-product-success">
            {message}
          </div>

        )}


        {error && (

          <div className="add-product-error">
            {error}
          </div>

        )}


        <form
          onSubmit={handleSubmit}
          className="add-product-form"
        >

          <div className="add-product-field">

            <label htmlFor="name">
              Product Name
            </label>

            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />

          </div>


          <div className="add-product-field">

            <label htmlFor="price">
              Price
            </label>

            <input
              id="price"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              min="0.01"
              step="0.01"
              required
            />

          </div>


          <div className="add-product-field">

            <label htmlFor="description">
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              required
            />

          </div>


          <div className="add-product-field">

            <label htmlFor="stock">
              Stock
            </label>

            <input
              id="stock"
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Enter stock"
              min="0"
              required
            />

          </div>


          <div className="add-product-field">

            <label htmlFor="categoryId">
              Category
            </label>

            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
            >

              <option value="">
                Select Category
              </option>

              {categories.map((category) => (

                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>

              ))}

            </select>

          </div>


          <div className="add-product-field">

            <label htmlFor="image">
              Product Image
            </label>

            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />

            {image && (

              <p className="selected-file">
                Selected: {image.name}
              </p>

            )}

          </div>


          <button
            type="submit"
            className="add-product-submit"
          >
            Add Product
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddProduct;