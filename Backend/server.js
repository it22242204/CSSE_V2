const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db.js");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

// Import Routes
const taskRoutes = require("./Routes/taskRoute.js");
const EmployeeRoute = require("./Routes/EmployeManegmentRoutes.js");
const InventoryRoute = require("./Routes/InventroyManegmentRoutes.js");
const RatingRoute = require("./Routes/RatingSystemRoutes.js");
const SupplierRoute = require("./Routes/SupplyManegmentRoutes.js");
const ProductRoute = require("./Routes/ProductManagemnetRoute.js");
const DeliveryDrive = require("./Routes/DiliveryManegmentDriveRoutes.js");
const VehicalDrive = require("./Routes/DiliveryManegmentVehicalRoutes.js");
const CartRoute = require("./Routes/CartManagementRoute.js");
const UserLoginRoute = require("./Routes/UserLoginRoute.js");
const UserRoute = require("./Routes/UserManagementRoutes.js");
const UserProfileRoute = require("./Routes/UserProfileRoute.js");
const DeliveryRoute = require("./Routes/DeliveryRoute.js");
const InformRoute = require("./Routes/informSupplyRoute.js");
const PaymentRoute = require("./Routes/PaymentRoute.js");
const RegularCollectionRoute = require("./Routes/RegularCollectionRoutes.js");
const UserRegisterPaymentRoute = require("./Routes/RegisterUserPaymentRoute.js");
const SpecialPaymentRoute = require("./Routes/SpecialPaymentRoute.js");const SpecialcollectionRoute=require("./Routes/Specialorderroutes.js");
const paymentRoutes = require('./Routes/priceRoutes.js');
const priceRoute = require("./Routes/priceRoutes.js")

// Configure environment variables
dotenv.config();

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tasks", taskRoutes);  // Existing task routes
app.use("/employee", EmployeeRoute);
app.use("/inventory", InventoryRoute);
app.use("/rates", RatingRoute);
app.use("/supplier", SupplierRoute);
app.use("/products", ProductRoute );
app.use("/drive", DeliveryDrive );
app.use("/vehical", VehicalDrive );
app.use("/carts", CartRoute);
app.use("/user", UserRoute);
app.use("/login", UserLoginRoute);
app.use("/profile", UserProfileRoute);
app.use("/deliveri", DeliveryRoute);
app.use("/payments", PaymentRoute);
app.use("/inform", InformRoute);
app.use("/regularcollection", RegularCollectionRoute);
app.use("/userregisterpayment", UserRegisterPaymentRoute);
app.use("/specialpayment", SpecialPaymentRoute);app.use('/api/payment', priceRoute);
app.use("/orders",SpecialcollectionRoute)

// Set the PORT
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
