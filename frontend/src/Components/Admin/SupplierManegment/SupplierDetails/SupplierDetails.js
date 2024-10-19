import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import Sidebar from "../../AdminDashBord/SideBar/Sidebar";

const URL = "http://localhost:8081/supplier";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function SupplierDetails() {
  //fetch data
  const [supply, setSupply] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => setSupply(data.supply));
  }, []);

  /*Delete Function */
  const history = useNavigate();
  const deleteHandler = async (_id) => {
    // Define _id as a parameter
    const confirmed = window.confirm(
      "Are you sure you want to delete this Account?"
    );

    if (confirmed) {
      try {
        await axios.delete(`${URL}/${_id}`); // Correct URL construction
        window.alert("Account deleted successfully!");
        history("/supplierdetails");
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
      const filtered = data.supply.filter((supply) =>
        Object.values(supply).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setSupply(filtered);
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
            onClick={() => (window.location.href = "/addsupplier")}
          >
            Add New Supplier
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
            Supplier Account
            <span className="sub_topic_inventory"> Details</span>{" "}
          </h1>
          <table className="table_details_admin">
            <thead>
              <tr className="admin_tbl_tr">
                <th className="admin_tbl_th">firstname</th>
                <th className="admin_tbl_th">lastname</th>
                <th className="admin_tbl_th">phone</th>
                <th className="admin_tbl_th">address</th>
                <th className="admin_tbl_th">gmail</th>
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
                {supply.map((item, index) => (
                  <tr className="admin_tbl_tr" key={index}>
                    <td className="admin_tbl_td">{item.firstname}</td>
                    <td className="admin_tbl_td">{item.lastname}</td>
                    <td className="admin_tbl_td">{item.phone}</td>
                    <td className="admin_tbl_td">{item.address}</td>
                    <td className="admin_tbl_td">{item.gmail}</td>
                    <td className="admin_tbl_td">
                      <Link
                        to={`/updatesupplier/${item._id}`}
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

export default SupplierDetails;
