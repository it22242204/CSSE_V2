import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTaskInServer } from "../../slices/tasksSlice";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import emailjs from '@emailjs/browser';

const MyVerticallyCenteredModal = (props) => {
  const { selectedTask } = useSelector((state) => state.tasks);

  const [customername, setcustomername] = useState("");
  const [email, setemail] = useState("");
  const [topic, settopic] = useState("");
  const [description, setDescription] = useState("");
  const [responce, setResponce] = useState("");
  const [ticketstatus, setStatus] = useState('');
  const [id, setId] = useState(0);
  const dispatch = useDispatch();

  const updateAndSendEmail = () => {
    // Update the task first
    dispatch(
      updateTaskInServer({
        _id: id,
        customername,
        email,
        topic,
        description,
        responce,
        ticketstatus,
      })
    ).then(() => {
      // After updating the task, send the email
      sendEmail();
    });
  };

  useEffect(() => {
    if (Object.keys(selectedTask).length !== 0) {
      setcustomername(selectedTask.customername);
      setemail(selectedTask.email);
      settopic(selectedTask.topic);
      setDescription(selectedTask.description);
      setResponce(selectedTask.responce);
      setStatus(selectedTask.ticketstatus);
      setId(selectedTask._id);
    }
  }, [selectedTask]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const options = ["Delivered", "Viewed", "Responded"];

  const sendEmail = () => {
    emailjs
      .send('service_79842mg', 'template_ugi240w', {
        customername,
        email,
        topic,
        description,
        responce,
        ticketstatus,
      }, 'jOx5WsWVCJyqUC1Gp') // Using the public key as the user ID
      .then(
        () => {
          console.log('SUCCESS!');
          props.onHide(); // Close the modal after sending the email
        },
        (error) => {
          console.log('FAILED...', error.text);
          console.log('Message not send')
        }
      );
  };

  return (
    <Modal
      open={props.show}
      onClose={props.onHide}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Response to E-ticket
        </Typography>

        <div className="mb-3">
          <label htmlFor="formBasicResponce" className="form-label">Response</label>
          <textarea
            className="form-control"
            id="formBasicResponce"
            placeholder="Customer issues response"
            value={responce}
            style={{ height: '100px' }}
            onChange={(e) => setResponce(e.target.value)}
          ></textarea>
        </div>

        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Status of the E-ticket
        </Typography>
        <Dropdown
          options={options}
          onChange={(option) => setStatus(option.value)}
          value={ticketstatus}
          placeholder="Select an option"
        /><br />

        <div className="text-end">
          <Button variant="primary" onClick={updateAndSendEmail}>
            Submit
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default MyVerticallyCenteredModal;
