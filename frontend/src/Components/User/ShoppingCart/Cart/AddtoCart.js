import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import AfterNav from "../../Home/NavBar/AfterNav";
import Footer from "../../../Footer/Footer";


const AddToCart = () => {
  const history = useNavigate();
  const location = useLocation();
  const [item, setItem] = useState({
    name: "",
    image: "",

    price: "",
    code: "",
    qty: 1,
    total: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (location.state && location.state.product) {
      const { name, image, price, code } = location.state.product;
      setItem({
        ...item,
        name,
        image,

        price,
        code,
      });
    }
  }, [location.state.product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "qty" || name === "price") {
      const totalPrice = parseFloat(value) * parseFloat(item.price);
      setItem((prevState) => ({
        ...prevState,
        total: totalPrice.toFixed(2),
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form...");
    try {
      await axios.post("http://localhost:8080/carts/", item);
      alert("Item added to cart successfully.");
      history("/view-cart");
    } catch (error) {
      alert("Error adding item to cart:", error);
    }
  };

  return (
    <div>
      <AfterNav />
      <div className="cart-container">
        <h1 className="topic_mash_mart">
          Add New Item For
          <span className="sub_topic_mash_mart"> Cart</span>{" "}
        </h1>
        <div className="item_full_box">
          <form className="item_form_admin" onSubmit={handleSubmit}>
            <div>
              <label className="form_box_item_lable">Name:</label>
              <input
                className="form_box_item_input"
                type="text"
                name="name"
                value={item.name}
                onChange={handleChange}
                readOnly
                required
              />
            </div>

            <div>
              <label className="form_box_item_lable">Price:</label>
              <input
                className="form_box_item_input"
                type="number"
                name="price"
                value={item.price}
                onChange={handleChange}
                readOnly
                required
              />
            </div>
            <div>
              <label className="form_box_item_lable">Quantity:</label>
              <input
                className="form_box_item_input"
                type="number"
                name="qty"
                value={item.qty}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
            <div>
              <label className="form_box_item_lable">Total:</label>
              <input
                className="form_box_item_input"
                type="text"
                name="total"
                value={item.total}
                readOnly
              />
            </div>
            {error && <p className="cart-error-message">{error}</p>}
            <button className="admin_form_cneter_btn" type="submit">
              Add to Cart
            </button>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default AddToCart;
