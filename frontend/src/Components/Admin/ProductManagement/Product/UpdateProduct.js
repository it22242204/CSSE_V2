import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams and useNavigate hooks
import Sidebar from "../../AdminDashBord/SideBar/Sidebar";

const UpdateProduct = () => {
  const { id } = useParams(); // Use useParams hook to get the route parameter
  const navigate = useNavigate(); // Use useNavigate hook for navigation
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/products/${id}`
        );
        setProduct(response.data.product);
        setLoading(false);
      } catch (error) {
        setError("Error fetching product details."); // Set error message on fetch failure
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // Include id in dependency array to fetch data when id changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/products/${id}`, product);
      alert("Product updated successfully.");
      navigate("/admin-allproducts"); // Navigate to /admin-allproducts after successful update
    } catch (error) {
      setError("Error updating product."); // Set error message on update failure
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render the UI with fetched product details and update form
  return (
    <div>
      <Sidebar />
      <div className="children_div_admin">
        <h1 className="topic_mash_mart">
          Update
          <span className="sub_topic_mash_mart"> Product</span>{" "}
        </h1>
        <div className="item_full_box">
          <form className="item_form_admin" onSubmit={handleSubmit}>
            <div>
              <label className="form_box_item_lable">Name:</label>
              <input
                className="form_box_item_input"
                type="text"
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="form_box_item_lable">Image URL:</label>
              <input
                className="form_box_item_input"
                type="text"
                value={product.image}
                onChange={(e) =>
                  setProduct({ ...product, image: e.target.value })
                }
              />
            </div>
            <div>
              <label className="form_box_item_lable">Specifications:</label>
              <input
                className="form_box_item_input"
                type="text"
                value={product.location}
                onChange={(e) =>
                  setProduct({ ...product, location: e.target.value })
                }
              />
            </div>
            <div>
              <label className="form_box_item_lable">Price:</label>
              <input
                className="form_box_item_input"
                type="number"
                min="1"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
                required

              />
            </div>
            <div>
              <label className="form_box_item_lable">price per Kg:</label>
              <input
                className="form_box_item_input"
                type="text"
                value={product.code}
                onChange={(e) =>
                  setProduct({ ...product, code: e.target.value })
                }
              />
            </div>
            <button type="submit" className="admin_form_cneter_btn">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
