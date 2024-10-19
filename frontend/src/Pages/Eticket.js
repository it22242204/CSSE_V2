import React, { useEffect, useRef } from "react";
import { Row, Col, Navbar, Container } from "react-bootstrap";
import TasksList from "../Components/Eticket/TasksList";
import AddTask from "../Components/Eticket/AddTask";
import { useParams } from "react-router-dom";
import "./Eticket.css";
import BeforNav from "../Components/User/Home/NavBar/BeforNav";
import Footer from "../Components/Footer/Footer";

export default function Eticket() {
  const { id } = useParams();
  useEffect(() => {
    console.log(id);
  });
  return (
    <div className="modified-admin-home">
      <BeforNav />
      <Container>
        <Row className="justify-content-md-center">
          <Col lg="11">
            <br />
            <div className="Headertext">Create E-Ticket</div>
            <AddTask />
          </Col>
        </Row>
        <TasksList />
      </Container>
      <Footer />
    </div>
  );
}
