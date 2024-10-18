import React, { useEffect, useRef, useState } from "react";
import { Row, Col, Navbar, Container } from "react-bootstrap";
import Response from "../Components/Eticket/Responce";
import { useParams } from "react-router-dom";
import "../Pages/Eticket.css";
import Sidebar from "../Components/Admin/AdminDashBord/SideBar/Sidebar";

export default function Admin() {
  const { id } = useParams();
  useEffect(() => {
    console.log(id);
  });

  return (
    <div className="modified-admin-home">
      <Sidebar />
      <Container>
        <Response />
      </Container>
    </div>
  );
}
