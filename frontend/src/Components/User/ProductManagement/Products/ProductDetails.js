import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import AfterNav from "../../Home/NavBar/AfterNav";
import Footer from "../../../Footer/Footer";
const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [cartMessage, setCartMessage] = useState("");

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/products/${id}`
        );
        setProduct(response.data.product);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) {
      console.error("Product details are undefined.");
      // You can set an error message or take other actions here
      return;
    }

    // Update cartMessage state to show a message after adding to cart
    setCartMessage("Item added to cart.");
    // Example: Navigate to /add-cart with product details in state
    navigate("/add-cart", { state: { product } });
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const { name, image, location, price, code } = product;

  return (
    <div>
      <AfterNav />
      <h1 className="topic_inventory">
          Product 
          <span className="sub_topic_inventory"> Detail</span>
        </h1>

      <div className="itemcard">
        <div>
          <h3 className="itm_name_view">{name}</h3>
          <img src={image} alt={name} className="view_iten_img" />
          <p className="itmname">Specifications: {location}</p>
          <p className="itmname">Price: Rs.{price}</p>
          <p className="itmname">price per Kg: {code}</p>
          <button className="cart_cneter_btn" onClick={handleAddToCart}>Add to Cart</button>
          <button
              className="cart_cneter_btn"
              onClick={() => (window.location.href = "/addrate")}
            >
              Add Feedback
            </button>
          {cartMessage && <div>{cartMessage}</div>}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ProductDetails;
