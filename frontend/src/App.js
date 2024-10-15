import React from "react";
import { Route, Routes } from "react-router";
//Dilivery Management ----------------------->
//ADMIN
import DliveryData from "./Components/Admin/DiliveryManagement/Dlivery/DliveryData/DliveryData";
//--Driver
import DriverLogin from "./Components/Driver/DriverLogin/DriverLogin";
import AddDriver from "./Components/Admin/DiliveryManagement/Driver/AddDriver/AddDriver";
import DriverDetails from "./Components/Admin/DiliveryManagement/Driver/DriverDetails/DriverDetails";
import UpdateDriver from "./Components/Admin/DiliveryManagement/Driver/UpdateDriver/UpdateDriver";
//--Vehical
import AddVehical from "./Components/Admin/DiliveryManagement/Vehical/AddVehical/AddVehical";
import VehicalDetails from "./Components/Admin/DiliveryManagement/Vehical/VehicalDetails/VehicalDetails";
import UpdateVehical from "./Components/Admin/DiliveryManagement/Vehical/UpdateVehical/UpdateVehical";
//USER
import AddDilivery from "./Components/User/DeliveryManagement/AddDilivery/AddDilivery";
import MyOrder from "./Components/User/DeliveryManagement/MyOrder/MyOrder";

//Rating System ----------------------->
//USER
import AddRate from "./Components/User/RatingSystem/Add-Rates/AddRate";
import RateDetails from "./Components/User/RatingSystem/Rate/RateDetails";
import MyRate from "./Components/User/RatingSystem/MyRate/MyRate";
import UpdateRate from "./Components/User/RatingSystem/UpdateRate/UpdateRate";

//Product Management ----------------------->
//ADMIN
import AddProduct from "./Components/Admin/ProductManagement/AddProduct/AddProduct";
import AllProducts from "./Components/Admin/ProductManagement/Product/Products";
import UpdateProducts from "./Components/Admin/ProductManagement/Product/UpdateProduct";
//USER
import ViewAllProducts from "./Components/User/ProductManagement/Products/Products";
import ViewOneProduct from "./Components/User/ProductManagement/Products/ProductDetails";

//User Management ----------------------->
//ADMIN
import UserDetails from "./Components/Admin/UserManagement/UserDetails";
//USER
import UserRegister from "./Components/User/UserManagement/UserRegister/Register";
import UserLogin from "./Components/User/UserManagement/UserLogin/Login";
import UserProfiel from "./Components/User/UserManagement/UserProfile/UserProfiel";
import UserUpdateAccount from "./Components/User/UserManagement/UpdateAccount/UpdateAccount";

//Shopping Cart ----------------------->
//USER
import AddToCart from "./Components/User/ShoppingCart/Cart/AddtoCart";
import ViewCart from "./Components/User/ShoppingCart/Cart/Carts";
import EditCart from "./Components/User/ShoppingCart/Cart/EditCartItem";
import AddPayment from "./Components/User/ShoppingCart/Payment/AddPayment";

//Supplier Manegment ----------------------->
//ADMIN
import AddSupplier from "./Components/Admin/SupplierManegment/AddSupplier/AddSupplier";
import SupplierDetails from "./Components/Admin/SupplierManegment/SupplierDetails/SupplierDetails";
import UpdateSupplier from "./Components/Admin/SupplierManegment/UpdateSupplier/UpdateSupplier";
//Inventroy Manegment ----------------------->
//ADMIN
import AddInventory from "./Components/Admin/InventroyManegment/AddItem/AddItem";
import InventoryDetails from "./Components/Admin/InventroyManegment/ItemDetails/ItemDetails";
import UpdateInventory from "./Components/Admin/InventroyManegment/UpdateItem/UpdateItem";
import LowStockInventoryItem from "./Components/Admin/InventroyManegment/LowStockInventoryItem/LowStockInventoryItem";
//Employe Manegment ----------------------->
//ADMIN
import AddEmploye from "./Components/Admin/EmployeManegment/AddEmploye/AddEmploye";
import EmployeDetails from "./Components/Admin/EmployeManegment/EmployeDetails/EmployeDetails";
import UpdateEmploye from "./Components/Admin/EmployeManegment/UpdateEmploye/UpdateEmploye";
//Admin & User Functions ----------------------->
import AdminDash from "./Components/Admin/AdminDashBord/Dash/AdminDash";
import Home from "./Components/User/Home/Home";
import BeforHome from "./Components/User/Home/BeforHome";
import Accept from "./Components/Admin/DiliveryManagement/Dlivery/Accept/Accept";
import AdminLogin from "./Components/Admin/AdminLogin/AdminLogin";
import InformSupply from "./Components/Admin/InventroyManegment/InformSupply/InformSupply";

function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          {/* --------------- USER Side ---------------*/}
          <Route path="/afetrhome" element={<Home />} />
          <Route path="/" element={<BeforHome />} />
          {/*Dilivery Management*/}
          <Route path="/adddlilivey" element={<AddDilivery />} />
          <Route path="/myorder" element={<MyOrder />} />
          {/*Rating System*/}
          <Route path="/addrate" element={<AddRate />} />
          <Route path="/ratedetails" element={<RateDetails />} />
          <Route path="/myrate" element={<MyRate />} />
          <Route path="/updaterate/:id" element={<UpdateRate />} />
          {/*Product Management*/}
          {/*User Management*/}
          <Route path="/userregister" element={<UserRegister />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/userprofile" element={<UserProfiel />} />
          <Route path="/updateaccount/:id" element={<UserUpdateAccount />} />

          {/* --------------- ADMIN Side ---------------*/}
          {/*Admin Home*/}
          <Route exact path="/adminlogin" element={<AdminLogin />} />
          {/*Admin Home*/}
          <Route exact path="/admin" element={<AdminDash />} />
          {/*Dilivery Management*/}
          {/*Dlivery */}
          <Route path="/delivrydata" element={<DliveryData />} />
          <Route path="/accept/:id" element={<Accept />} />
          {/*Driver*/}
          <Route path="/adddriver" element={<AddDriver />} />
          <Route path="/driverdetails" element={<DriverDetails />} />
          <Route path="/updateedriver/:id" element={<UpdateDriver />} />
          {/*Vehical*/}
          <Route path="/addvehical" element={<AddVehical />} />
          <Route path="/vehicaldetails" element={<VehicalDetails />} />
          <Route path="/updateevehical/:id" element={<UpdateVehical />} />
          {/*Product Management*/}
          <Route exact path="/addproduct" element={<AddProduct />} />
          <Route exact path="/admin-allproducts" element={<AllProducts />} />
          <Route exact path="/update/:id" element={<UpdateProducts />} />
          <Route exact path="/viewall" element={<ViewAllProducts />} />
          <Route
            exact
            path="/viewoneproduct/:id"
            element={<ViewOneProduct />}
          />
          {/*User Management*/}
          <Route path="/userdetails" element={<UserDetails />} />
          {/*Supplier Manegment*/}
          <Route path="/addsupplier" element={<AddSupplier />} />
          <Route path="/supplierdetails" element={<SupplierDetails />} />
          <Route path="/updatesupplier/:id" element={<UpdateSupplier />} />
          {/*Inventroy Manegment*/}
          <Route path="/addinventoryitem" element={<AddInventory />} />
          <Route path="/inventoryitemdetails" element={<InventoryDetails />} />
          <Route
            path="/inventoryitelowstock"
            element={<LowStockInventoryItem />}
          />
          <Route
            path="/updateinventoryitem/:id"
            element={<UpdateInventory />}
          />
          <Route path="/infromsupply" element={<InformSupply />} />
          {/*Employe Manegment*/}
          <Route path="/addemployee" element={<AddEmploye />} />
          <Route path="/employeedetails" element={<EmployeDetails />} />
          <Route path="/updateemployee/:id" element={<UpdateEmploye />} />

          {/*Product Management*/}
          <Route exact path="/add-product" element={<AddProduct />} />
          <Route exact path="/admin-allproducts" element={<AllProducts />} />
          <Route exact path="/update/:id" element={<UpdateProducts />} />
          <Route exact path="/viewall" element={<ViewAllProducts />} />
          <Route
            exact
            path="/viewoneproduct/:id"
            element={<ViewOneProduct />}
          />
          {/*Shopping Cart*/}
          <Route path="/add-cart" element={<AddToCart />} />
          <Route path="/view-cart" element={<ViewCart />} />
          <Route path="/update-cart/:id" element={<EditCart />} />
          <Route path="/add-payment" element={<AddPayment />} />

          {/* Driver Panel */}
          <Route path="/driverlogin" element={<DriverLogin />} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
