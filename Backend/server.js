const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./Config/db.js");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

//Link Routs
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
const SpecialcollectionRoute=require("./Routes/Specialorderroutes.js");

dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());

//Routes
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
app.use("/orders",SpecialcollectionRoute)

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

