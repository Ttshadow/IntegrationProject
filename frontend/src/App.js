import React, { useContext, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./component/MainLayout";
import HomePage from "./pages/HomePage";
import AdminTable from "./pages/AdminTable";
import Home from "./component/home/Home";

import UserDashboard from "./component/userDashboard/UserDashboard";
import AdminDashboard from "./component/adminDashboard/AdminDashboard";
import AdminReservation from "./pages/AdminReservation";
import ShoppingCart from "./component/shoppingCart/ShoppingCart";
import UserReservation from "./pages/UserReservation";
import AddReservation from "./component/userDashboard/reservation/AddReservation"
import Menu from "./component/menu/Menu";


function App() {
  return (
    
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />}></Route>
          {/*  <Route path="/menu" element={<Menu />}></Route>
            <Route path="/reservation" element={<Reservation />}></Route>
            <Route path="/shoppingcart" element={<ShoppingCart />}></Route>*/}
          </Route>
        {/*<Route path="/admindashboard" element={<AdminDashboard />}></Route>*/}
          <Route path="/admindashboard/table" element={<AdminTable />}></Route>
          <Route path="/admindashboard/reservation" element={<AdminReservation />}></Route>
          {/*FOR USERDASHBOARD*/}
          <Route path="/userdashboard/reservation" element={<UserReservation />}></Route>
          <Route path="/userdashboard/newreservation" element={<AddReservation />}></Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
  );
}

export default App;
