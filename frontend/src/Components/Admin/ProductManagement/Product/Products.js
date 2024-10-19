import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import Sidebar from "../../AdminDashBord/SideBar/Sidebar";

const Product = ({ product, onDelete }) => {
  const { _id, name, image, location, price, code } = product;

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${name}?`
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8081/products/${_id}`);
        onDelete(_id);
        alert("Product deleted successfully.");
        window.location.reload(); // Show alert after successful deletion
      } catch (error) {
        // Handle error and provide feedback to the user
      }
    }
  };
  return (
    <tr className="admin_tbl_tr">
      <td className="admin_tbl_td">{name}</td>
      <td className="admin_tbl_td">
        <img src={image} alt={name} style={{ width: "50px", height: "50px" }} />
      </td>
      <td className="admin_tbl_td">{location}</td>
      <td className="admin_tbl_td">Rs.{price}.00</td>
      <td className="admin_tbl_td">{code}</td>
      <td className="admin_tbl_td">
        <Link className="btn_dash_admin" to={`/update/${_id}`}>
          Update
        </Link>{" "}
        <button className="btn_dash_admin_dlt" onClick={handleDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8081/products");
      setProducts(response.data.products);
    } catch (error) {
      setAlertMessage("Error fetching products.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/products/${id}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
      window.location.reload();
    } catch (error) {
      // Handle error and provide feedback to the user
    }
  };
  /*PDF Function */
  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: " Details Report",
    onafterprint: () => alert(" Details Report Successfully Download !"),
  });

  /*Search Function */
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handleSearch = () => {
    // Call fetchProducts function to fetch products
    fetchProducts().then(() => {
      const filtered = products.filter((product) =>
        Object.values(product).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setProducts(filtered);
      setNoResults(filtered.length === 0);
    });
  };

  return (
    <div>
      <Sidebar />
      <div className="children_div_admin">
        <div className="dash_button_set">
          <button
            className="btn_dash_admin"
            onClick={() => (window.location.href = "/addproduct")}
          >
            Add New Product
          </button>

          <tr>
            <td className="">
              <input
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                name="search"
                className="serch_inpt"
                placeholder="Search Here..."
              ></input>
            </td>

            <td>
              <button onClick={handleSearch} className="btn_dash_admin">
                Search
              </button>
            </td>
          </tr>
          <button className="btn_dash_admin" onClick={handlePrint}>
            Generate Report
          </button>
        </div>
        <div className="tbl_con_admin" ref={ComponentsRef}>
          <h1 className="topic_inventory">
            Product
            <span className="sub_topic_inventory"> List</span>{" "}
          </h1>
          {alertMessage && <div style={{ color: "red" }}>{alertMessage}</div>}
          <table className="table_details_admin">
            <thead>
              <tr className="admin_tbl_tr">
                <th className="admin_tbl_th">Name</th>
                <th className="admin_tbl_th">Image</th>
                <th className="admin_tbl_th">Specifications</th>
                <th className="admin_tbl_th">Price</th>
                <th className="admin_tbl_th">price per Kg</th>
                <th className="admin_tbl_th">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <Product
                  key={product._id}
                  product={product}
                  onDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;
