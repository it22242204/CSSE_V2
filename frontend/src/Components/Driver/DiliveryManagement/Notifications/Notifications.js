import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import Sidebar from "../../DriverDashBord/SideBar/Sidebar";

function Notifications() {
    return(
       <div>
         <Sidebar />
       </div>
    );
}
export default Notifications;