import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Stock.css";
import AfterNav from "../../Home/NavBar/AfterNav";
import Footer from '../../../Footer/Footer';

const Product = ({ product }) => {
  const { _id, name, image, location, price, code } = product;

  return (
    <div className="item_details_cart">
      <h3 className="carname">{name}</h3>
      <img className="itemimg_addreate" src={image} alt={name} />
      <p className="itm_detil_body">Specifications: {location}</p>
      <p className="itm_detil_body">Price: Rs.{price}.00</p>
      <p className="itm_detil_body">price per Kg: {code}</p>
      <Link className="cart_cneter_btn" to={`/viewoneproduct/${_id}`}>
        View
      </Link>
    </div>
  );
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8081/products");
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
        setAlertMessage("Error fetching product items.");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <AfterNav />
      <div className="fulbox_with">
        <h1 className="topic_inventory">
          Product Items
          <span className="sub_topic_inventory"> List</span>
        </h1>
        {alertMessage && <div style={{ color: "red" }}>{alertMessage}</div>}
        <div className="fullbox_set_cat">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Products;
