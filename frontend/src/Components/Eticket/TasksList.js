import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import MyVerticallyCenteredModal from './UpdateTask';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedTask, removeTaskFromList, deleteTaskFromServer } from "../../slices/tasksSlice";
import { getTasksFromServer } from '../../slices/tasksSlice';

const TasksList = () => {
  const { tasksList } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const updateTask = (task) => {
    console.log("update Task");
    setModalShow(true);
    dispatch(setSelectedTask(task));
  };

  useEffect(() => {
    dispatch(getTasksFromServer());
  }, [dispatch]);

  const deleteTask = (task) => {
    console.log("delete task");
    dispatch(deleteTaskFromServer(task))
      .unwrap()
      .then(() => {
        dispatch(removeTaskFromList(task));
      });
  };

  useEffect(() => {
    // Filter tasksList based on search term
    const filtered = tasksList.filter(task =>
      task.customername.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTasks(filtered);
  }, [tasksList, searchTerm]);

  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Form className="mb-3 search_bar">
        <Form.Group controlId="search">
          <Form.Control
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>
      </Form>

      <Table className="table_details_admin">
  <thead>
    <tr>
      <th className="admin_tbl_th">No</th>
      <th className="admin_tbl_th">Name</th>
      <th className="admin_tbl_th">Email</th>
      <th className="admin_tbl_th">Topic</th>
      <th className="admin_tbl_th">Description</th>
      <th className="admin_tbl_th">Response</th>
      <th className="admin_tbl_th">Status</th>
      <th className="admin_tbl_th">Actions</th>
    </tr>
  </thead>
  <tbody>
    {filteredTasks.map((task, index) => (
      <tr key={task._id}>
        <td className="admin_tbl_td" data-label="No">{index + 1}</td>
        <td className="admin_tbl_td" data-label="Name">{task.customername}</td>
        <td className="admin_tbl_td" data-label="Email">{task.email}</td>
        <td className="admin_tbl_td" data-label="Topic">{task.topic}</td>
        <td className="admin_tbl_td" data-label="Description">{task.description}</td>
        <td className="admin_tbl_td" data-label="Response">{task.responce}</td>
        <td className="admin_tbl_td" data-label="Status">{task.ticketstatus}</td>
        <td className="admin_tbl_td table_actions" data-label="Actions">
          {/* <Button variant="primary" onClick={() => updateTask(task)}>
            <i className="bi bi-pencil-square"></i>
          </Button> */}
          <Button variant="danger" onClick={() => deleteTask(task)}>
            <i className="bi bi-trash3"></i>
            Delete
          </Button>
        </td>
      </tr>
    ))}
  </tbody>
</Table>


      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default TasksList;
