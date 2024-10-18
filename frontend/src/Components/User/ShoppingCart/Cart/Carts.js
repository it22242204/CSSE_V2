// Carts.js
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./cart.css";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import AddPayment from "../Payment/AddPayment";
import AfterNav from "../../Home/NavBar/AfterNav";
import Footer from '../../../Footer/Footer';

const Carts = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/carts/");
        setCarts(response.data.carts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching carts:", error);
        setError("Failed to fetch cart details");
        setLoading(false);
      }
    };

    fetchCarts();
  }, []);

  useEffect(() => {
    let total = 0;
    carts.forEach((cart) => {
      total += parseFloat(cart.total);
    });
    setTotalAmount(total);
  }, [carts]);

  const handleRemoveFromCart = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/carts/${id}`);
      setCarts((prevCarts) => prevCarts.filter((cart) => cart._id !== id));
      alert("Item removed from cart successfully.");
    } catch (error) {
      console.error("Error removing item from cart:", error);
      alert("Failed to remove item from cart");
    }
  };
  /*PDF Function */
  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: " Details Report",
    onafterprint: () => alert(" Details Report Successfully Download !"),
  });
  return (
    <div>
      <AfterNav />
      <div className="carts_container">
        <h1 className="topic_mash_mart">
          Cart
          <span className="sub_topic_mash_mart"> Details</span>{" "}
        </h1>
        <div className="button-container conenn">
          <Link to="/viewall" className="btn_dash_admin">
            Add New
          </Link>
          <button onClick={handlePrint} className="btn_dash_admin">
            Download Report
          </button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="carts-list">
            {carts.length === 0 ? (
              <p>No items in cart</p>
            ) : (
              <div>
                <div ref={ComponentsRef}>
                  {carts.map((cart) => (
                    <div key={cart._id} className="cart_item">
                      <div className="disdatabx1">
                        <img
                          src={cart.image}
                          alt={cart.name}
                          className="cart_item_image"
                        />
                      </div>
                      <div className="disdatabx2">
                        <h3 className="itmnme">{cart.name}</h3>
                        <p className="itmdetails">Price: Rs.{cart.price}</p>
                        <p className="itmdetails">Quantity: {cart.qty}</p>
                        <p className="itmdetails">Total: Rs.{cart.total}</p>
                      </div>
                      <div className="disdatabx3">
                        <button
                          className="btn_dash_admin_dlt_cart"
                          onClick={() => handleRemoveFromCart(cart._id)}
                        >
                          Delete
                        </button>
                        <br></br>
                        <br></br>
                        <Link
                          className="btn_dash_admin"
                          to={`/update-cart/${cart._id}`}
                        >
                          update
                        </Link>
                      </div>
                    </div>
                  ))}
                  <div className="total_amount">
                    <h3>
                      You have to pay:{" "}
                      <span className="tot">Rs.{totalAmount.toFixed(2)}</span>
                    </h3>
                  </div>
                </div>
                {/* Render AddPayment component with cartItems prop */}
                <AddPayment cartItems={carts} />
              </div>
            )}
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default Carts;
