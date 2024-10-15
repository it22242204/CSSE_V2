const Employee = require("../Model/EmployeManegmentModel");

const getAllEmployee = async (req, res, next) => {
  let emp;
  // Get all Employee
  try {
    emp = await Employee.find();
  } catch (err) {
    console.log(err);
  }
  // not found
  if (!emp) {
    return res.status(404).json({ message: "Employee not found" });
  }
  // Display all emp
  return res.status(200).json({ emp });
};

// data Insert
const addEmployee = async (req, res, next) => {
  const { name, gmail, address, phone } = req.body;

  let emp;

  try {
    emp = new Employee({
      name,
      gmail,
      address,
      phone,
    });
    await emp.save();
  } catch (err) {
    console.log(err);
  }
  // not insert emps
  if (!emp) {
    return res.status(404).json({ message: "unable to add Employee" });
  }
  return res.status(200).json({ emp });
};

//Get by Id
const getById = async (req, res, next) => {
  const id = req.params.id;

  let emp;

  try {
    emp = await Employee.findById(id);
  } catch (err) {
    console.log(err);
  }
  // not available emps
  if (!emp) {
    return res.status(404).json({ message: "Employee Not Found" });
  }
  return res.status(200).json({ emp });
};

//Update emp Details
const updateEmployee = async (req, res, next) => {
  const id = req.params.id;
  const { name, gmail, address, phone } = req.body;

  let emps;

  try {
    emps = await Employee.findByIdAndUpdate(id, {
      name: name,
      gmail: gmail,
      address: address,
      phone: phone,
    });
    emps = await emps.save();
  } catch (err) {
    console.log(err);
  }
  if (!emps) {
    return res
      .status(404)
      .json({ message: "Unable to Update Employee Details" });
  }
  return res.status(200).json({ emps });
};

//Delete emp Details
const deleteEmployee = async (req, res, next) => {
  const id = req.params.id;

  let emp;

  try {
    emp = await Employee.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
  if (!emp) {
    return res
      .status(404)
      .json({ message: "Unable to Delete Employee Details" });
  }
  return res.status(200).json({ emp });
};

exports.getAllEmployee = getAllEmployee;
exports.addEmployee = addEmployee;
exports.getById = getById;
exports.updateEmployee = updateEmployee;
exports.deleteEmployee = deleteEmployee;
