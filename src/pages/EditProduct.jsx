import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import "./EditProduct.css";

function EditProduct() {

  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
  });

  const [productInfo, setProductInfo] = useState({
    id: null,
    categoryId: null,
    categoryName: "",
    imageUrl: null,
  });

  const [image, setImage] = useState(null);

  const [error, setError] = useState("");

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(true);


  // =========================================================
  // Load Product
  // =========================================================
  useEffect(() => {

    const fetchProduct = async () => {

      try {

        const response =
          await api.get(`/products/${id}`);

        console.log(
          "Product:",
          response.data
        );


        setFormData({
          name: response.data.name,
          price: response.data.price,
          description: response.data.description,
          stock: response.data.stock,
        });


        setProductInfo({
          id: response.data.id,
          categoryId: response.data.categoryId,
          categoryName: response.data.categoryName,
          imageUrl: response.data.imageUrl,
        });


      } catch (error) {

        console.error(
          "Failed to load product:",
          error
        );

        setError(
          "Failed to load product."
        );

      } finally {

        setLoading(false);

      }
    };


    fetchProduct();

  }, [id]);


  // =========================================================
  // Handle Text Input
  // =========================================================
  const handleChange = (event) => {

    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

  };


  // =========================================================
  // Handle Image Selection
  // =========================================================
  const handleImageChange = (event) => {

    const selectedImage =
      event.target.files[0];

    if (selectedImage) {

      setImage(selectedImage);

    } else {

      setImage(null);

    }
  };


  // =========================================================
  // Update Product
  // =========================================================
  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");

    setMessage("");


    try {

      // Create multipart form data
      const productData =
        new FormData();


      productData.append(
        "id",
        productInfo.id
      );

      productData.append(
        "name",
        formData.name
      );

      productData.append(
        "price",
        Number(formData.price)
      );

      productData.append(
        "description",
        formData.description
      );

      productData.append(
        "stock",
        Number(formData.stock)
      );


      // Category is optional
      if (productInfo.categoryId !== null) {

        productData.append(
          "categoryId",
          productInfo.categoryId
        );

      }


      // Image is optional
      if (image) {

        productData.append(
          "image",
          image
        );

      }


      console.log(
        "Updating product..."
      );


      const response =
        await api.put(
          "/products",
          productData
        );


      console.log(
        "Updated product:",
        response.data
      );


      // Update displayed image information
      setProductInfo((previous) => ({
        ...previous,
        imageUrl: response.data.imageUrl,
      }));


      // Clear selected file
      setImage(null);


      // Reset file input
      const imageInput =
        document.getElementById("image");

      if (imageInput) {
        imageInput.value = "";
      }


      setMessage(
        "Product updated successfully!"
      );


    } catch (error) {

      console.error(
        "Failed to update product:",
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
          "Failed to update product."
        );

      }

    }

  };


  // =========================================================
  // Loading Screen
  // =========================================================
  if (loading) {

    return (
      <div className="edit-product-message">

        <h2>
          Loading product...
        </h2>

      </div>
    );

  }


  // =========================================================
  // Product Loading Error
  // =========================================================
  if (error && !formData.name) {

    return (
      <div className="edit-product-message">

        <h2>
          {error}
        </h2>

      </div>
    );

  }


  // =========================================================
  // UI
  // =========================================================
  return (
    <div className="edit-product-page">

      <div className="edit-product-card">

        <div className="edit-product-header">

          <p className="edit-product-label">
            ADMIN
          </p>

          <h1>
            Edit Product
          </h1>

          <p>
            Update the details of your product.
          </p>

        </div>


        {message && (

          <div className="edit-product-success">
            {message}
          </div>

        )}


        {error && (

          <div className="edit-product-error">
            {error}
          </div>

        )}


        {/* =================================================
            Current Image
        ================================================= */}
        <div className="edit-product-image-section">

          <label>
            Current Product Image
          </label>


          {productInfo.imageUrl ? (

            <img
              src={
                `http://localhost:9090${productInfo.imageUrl}`
              }
              alt={formData.name}
              className="edit-product-image"
            />

          ) : (

            <div className="edit-product-no-image">
              No image available
            </div>

          )}

        </div>


        {/* =================================================
            Category
        ================================================= */}
        <div className="edit-product-category">

          <span>
            Category
          </span>

          <strong>
            {productInfo.categoryName || "No category"}
          </strong>

        </div>


        <form
          onSubmit={handleSubmit}
          className="edit-product-form"
        >

          {/* =================================================
              Product Name
          ================================================= */}
          <div className="edit-product-field">

            <label htmlFor="name">
              Product Name
            </label>

            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

          </div>


          {/* =================================================
              Price
          ================================================= */}
          <div className="edit-product-field">

            <label htmlFor="price">
              Price
            </label>

            <input
              id="price"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0.01"
              step="0.01"
              required
            />

          </div>


          {/* =================================================
              Description
          ================================================= */}
          <div className="edit-product-field">

            <label htmlFor="description">
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />

          </div>


          {/* =================================================
              Stock
          ================================================= */}
          <div className="edit-product-field">

            <label htmlFor="stock">
              Stock
            </label>

            <input
              id="stock"
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              required
            />

          </div>


          {/* =================================================
              New Image
          ================================================= */}
          <div className="edit-product-field">

            <label htmlFor="image">
              Change Product Image
            </label>

            <input
              id="image"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />

            <small>
              Leave this empty to keep the current image.
            </small>

          </div>


          {/* =================================================
              Selected Image Preview
          ================================================= */}
          {image && (

            <div className="edit-product-new-image">

              <p>
                New Image
              </p>

              <img
                src={URL.createObjectURL(image)}
                alt="New product preview"
                className="edit-product-image"
              />

            </div>

          )}


          {/* =================================================
              Submit
          ================================================= */}
          <button
            type="submit"
            className="edit-product-submit"
          >
            Update Product
          </button>

        </form>

      </div>

    </div>
  );
}

export default EditProduct;