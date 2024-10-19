import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { addTaskToServer } from "../../slices/tasksSlice";
import { useDispatch } from "react-redux";
import "./addtask.css";

const AddTask = () => {
  const dispatch = useDispatch();

  const [customername, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");

  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const addTask = (e) => {
    e.preventDefault();

    if (!customername || !email || !topic || !description) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    console.log({ customername, email, topic, description });
    dispatch(addTaskToServer({ customername, email, topic, description }));

    // Reset form fields after submission
    setCustomerName("");
    setEmail("");
    setTopic("");
    setDescription("");
  };

  return (
    <section className="form-section my-5">
    <Form className="form-container">
        <Form.Group className="form-group mb-4" controlId="formBasicName">
            <Form.Label className="form-label">Enter Name</Form.Label>
            <Form.Control 
                className="form-input" 
                type="text" 
                placeholder="Name" 
                value={customername} 
                onChange={(e) => setCustomerName(e.target.value)} 
            />
        </Form.Group>

        <Form.Group className="form-group mb-4" controlId="formBasicEmail">
            <Form.Label className="form-label">Email</Form.Label>
            <Form.Control 
                className="form-input" 
                type="email" 
                placeholder="Enter Email address" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
            />
        </Form.Group>

        <Form.Group className="form-group mb-4" controlId="formBasicTopic">
            <Form.Label className="form-label">Topic</Form.Label>
            <Form.Control 
                className="form-input" 
                type="text" 
                placeholder="Enter Topic" 
                value={topic} 
                onChange={(e) => setTopic(e.target.value)} 
            />
        </Form.Group>

        <Form.Group className="form-group mb-4" controlId="formBasicDescription">
            <Form.Label className="form-label">Description</Form.Label>
            <Form.Control 
                className="form-textarea" 
                as="textarea" 
                placeholder="Enter issue Description" 
                value={description} 
                style={{ height: '120px' }} 
                onChange={(e) => setDescription(e.target.value)} 
            />
        </Form.Group>

        <div className="form-submit-container text-end">
            <Button 
                className="submit-btn" 
                variant="primary" 
                type="submit" 
                onClick={(e) => addTask(e)}
            >
                Submit
            </Button>
        </div>
    </Form>
</section>

  );
};

export default AddTask;
