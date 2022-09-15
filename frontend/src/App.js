import React, { useContext, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./component/MainLayout";
import Home from "./component/home/Home";
import Menu from "./component/menu/Menu";
import Reservation from "./component/reservation/Reservation";
import ShoppingCart from "./component/shoppingCart/ShoppingCart";
import UserDashboard from "./component/userDashboard/UserDashboard";
import AdminDashboard from "./component/adminDashboard/AdminDashboard";


function App() {



  function handleClick(){
    fetch('diningtable', {
      method: 'GET',
    })
    .then((data) => data.json())
    .then((json) => {console.log(json);})
    }
  return (
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />}></Route>
            <Route path="/menu" element={<Menu />}></Route>
            <Route path="/reservation" element={<Reservation />}></Route>
            <Route path="/shoppingcart" element={<ShoppingCart />}></Route>
          </Route>
          <Route path="/admindashboard" element={<AdminDashboard />}></Route>
          <Route path="/userdashboard" element={<UserDashboard />}></Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
  );
}

export default App;
