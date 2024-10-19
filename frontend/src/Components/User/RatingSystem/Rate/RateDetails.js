import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Rate.css";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { FaRegUserCircle } from "react-icons/fa";
import AfterNav from "../../Home/NavBar/AfterNav";
import Footer from '../../../Footer/Footer';


const URL = "http://localhost:8081/rates";


const RateDetails = () => {
  const [rates, setRates] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchRates();
  }, []);

  const fetchRates = async () => {
    try {
      const response = await axios.get(URL);
      setRates(response.data.rate);
    } catch (error) {
      console.error("Error fetching rates:", error);
    }
  };

  const handleSearch = () => {
    const filteredRates = rates.filter((rate) =>
      Object.values(rate).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setRates(filteredRates);
    setNoResults(filteredRates.length === 0);
  };

  return (
    <div>
      <AfterNav />
      <div className="">
        <div className="film_box_details">
          <h1 className="cen_h1">Review And Ratings</h1>
          <div className="link_btn_set">
            {/* <button
              className="add_rate"
              onClick={() => (window.location.href = "./addrate")}
            >
              Add Rate
            </button> */}
            <div>
              <td className="">
                <input
                  onChange={(e) => setSearchQuery(e.target.value)}
                  type="text"
                  name="search"
                  className="serch_inpt"
                  placeholder="Search And Review Rateings"
                ></input>
              </td>
              <td>
                <button onClick={handleSearch} className="add_rate">
                  Search
                </button>
              </td>
            </div>
            <button
              className="add_rate"
              onClick={() => (window.location.href = "./myrate")}
            >
              My Feedback
            </button>
          </div>
          <div className="cen_box"></div>
          <div className="boxrviv">
            {noResults ? (
              <h1>No results found.</h1>
            ) : (
              rates.map((rate) => (
                <div key={rate._id}>
                  <div className="rate_box">
                    <div className="profile_info">
                      <img
                        src={rate.imgurl}
                        alt="itemimg_addreate"
                        className="itemimg_addreate"
                      />
                      <div className="rate_info_box">
                        <p className="rate_details"></p>
                        <p className="rate_details">{rate.date}</p>
                      </div>
                      <div>
                        <p className="tpic_cen">{rate.username}</p>
                        <div className="">
                          <Rating
                            name="read-only"
                            value={parseFloat(rate.rating)} // Convert to number if necessary
                            precision={0.5} // Precision for half-star ratings
                            readOnly
                            icon={
                              <StarIcon
                                className="rate_star"
                                fontSize="inherit"
                              />
                            }
                          />
                        </div>
                        <p className="comment_rate">{rate.comment}</p>
                      </div>
                    </div>

                    <div className="btn_set"></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default RateDetails;
