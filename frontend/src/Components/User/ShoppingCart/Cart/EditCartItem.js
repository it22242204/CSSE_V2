import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import AfterNav from "../../Home/NavBar/AfterNav";
import Footer from "../../../Footer/Footer";
const EditCartItem = () => {
  const history = useNavigate();
  const { id } = useParams();
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
    const fetchCartItem = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/carts/${id}`);
        setItem(response.data.cart);
      } catch (error) {
        console.error("Error fetching cart item:", error);
        setError("Failed to fetch cart item details");
      }
    };

    fetchCartItem();
  }, [id]);

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
    try {
      await axios.put(`http://localhost:8080/carts/${id}`, item);
      alert("Cart item updated successfully.");
      history("/view-cart");
    } catch (error) {
      console.error("Error updating cart item:", error);
      setError("Failed to update cart item");
    }
  };

  return (
    <div>
      <AfterNav />
      <div className="edit-cart-item-container">
        <h1 className="topic_mash_mart">
          Edit Cart
          <span className="sub_topic_mash_mart"> Item</span>{" "}
        </h1>
        {error && <p>{error}</p>}
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
                required
                readOnly
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
            <button className="admin_form_cneter_btn"  type="submit">Update</button>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default EditCartItem;
