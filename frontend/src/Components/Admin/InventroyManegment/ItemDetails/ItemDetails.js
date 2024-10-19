import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import Sidebar from "../../AdminDashBord/SideBar/Sidebar";

const URL = "http://localhost:8081/inventory";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function ItemDetails() {
  //fetch data
  const [invent, setInventory] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => {
      const sortedInventory = data.invent.sort((a, b) => a.quantity - b.quantity);
      setInventory(sortedInventory);
    });
  }, []);

  /*Delete Function */
  const history = useNavigate();
  const deleteHandler = async (_id) => {
    // Define _id as a parameter
    const confirmed = window.confirm(
      "Are you sure you want to delete this Item?"
    );

    if (confirmed) {
      try {
        await axios.delete(`${URL}/${_id}`); // Correct URL construction
        window.alert("Item deleted successfully!");
        history("/inventoryitemdetails");
        window.location.reload(); // Reload the page
      } catch (error) {
        // Handle deletion error if needed
        console.error("Error deleting details:", error);
      }
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
    fetchHandler().then((data) => {
      const filtered = data.invent.filter((invent) =>
        Object.values(invent).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setInventory(filtered);
      setNoResults(filtered.length === 0);
    });
  };

  return (
    <div>
      <Sidebar />
      <div className="children_div_admin">
        <div className="dash_button_set">
          <div>
            <button
              className="btn_dash_admin"
              onClick={() => (window.location.href = "/addinventoryitem")}
            >
              Add New Item
            </button>

            <button
              className="btn_dash_admin spc"
              onClick={() => (window.location.href = "/inventoryitelowstock")}
            >
              Low Stock Quantity
            </button>
            <button className="btn_dash_admin spc" onClick={handlePrint}>
              Generate Report
            </button>
          </div>
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
        </div>

        <div className="tbl_con_admin" ref={ComponentsRef}>
          <h1 className="topic_inventory">
            Inventory Item
            <span className="sub_topic_inventory"> Details</span>{" "}
          </h1>
          <table className="table_details_admin">
            <thead>
              <tr className="admin_tbl_tr">
                <th className="admin_tbl_th">itemname</th>
                <th className="admin_tbl_th">quantity</th>
                <th className="admin_tbl_th">price</th>
                <th className="admin_tbl_th">description</th>
                <th className="admin_tbl_th">action</th>
              </tr>
            </thead>
            {noResults ? (
              <div>
                <br></br>
                <h1 className="con_topic">
                  No <span className="clo_us"> Found</span>{" "}
                </h1>
              </div>
            ) : (
              <tbody>
                {invent.map((item, index) => (
                  <tr className="admin_tbl_tr" key={index}>
                    <td className="admin_tbl_td">{item.itemname}</td>
                    <td className="admin_tbl_td">{item.quantity}</td>
                    <td className="admin_tbl_td">{item.price}</td>
                    <td className="admin_tbl_td">{item.description}</td>
                    <td className="admin_tbl_td">

                    <button className="btn_dash_payment">
                        Payment
                      </button>
                      
                      <Link
                        to={`/updateinventoryitem/${item._id}`}
                        className="btn_dash_admin"
                      >
                        Update
                      </Link>
                      
                      <button
                        onClick={() => deleteHandler(item._id)}
                        className="btn_dash_admin_dlt"
                      >
                        Delete
                      </button>
                     
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}

export default ItemDetails;
