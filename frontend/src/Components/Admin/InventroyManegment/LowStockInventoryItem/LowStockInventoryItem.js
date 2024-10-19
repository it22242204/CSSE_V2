import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import Sidebar from "../../AdminDashBord/SideBar/Sidebar";

const URL = "http://localhost:8081/inventory";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function LowStockInventoryItem() {
  //fetch data
  const [invent, setInventory] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => {
      const lowStockItems = data.invent.filter((item) => item.quantity <= 10);
      const sortedLowStockItems = lowStockItems.sort((a, b) => a.quantity - b.quantity);
      setInventory(sortedLowStockItems);
    });
  }, []);

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
      <Sidebar/>
      <div className="children_div_admin">
        <div className="dash_button_set">
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
            Inventory Item Low Stock Item
            <span className="sub_topic_inventory"> Details</span>{" "}
          </h1>
          <table className="table_details_admin">
            <thead>
              <tr className="admin_tbl_tr">
                <th className="admin_tbl_th">itemname</th>
                <th className="admin_tbl_th">quantity</th>
                <th className="admin_tbl_th">price</th>
                <th className="admin_tbl_th">description</th>
                <th className="admin_tbl_th">infrom</th>
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
                    <th className="admin_tbl_td">
                    <button
                        className="btn_dash_admin"
                        onClick={() => (window.location.href = "/infromsupply")}
                      >
                        infrom Supplier
                      </button>
                    </th>
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

export default LowStockInventoryItem;
