import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./component/MainLayout";
import Home from "./component/home/Home";
import Menu from "./component/menu/Menu";
import Reservation from "./component/reservation/Reservation";
import ShoppingCart from "./component/shoppingCart/ShoppingCart";
import UserDashboard from "./component/userDashboard/UserDashboard";
import AdminDashboard from "./component/adminDashboard/AdminDashboard";
import LoginForm from "./component/authentication/LoginForm";
import LoginWrapper from "./component/authentication/LoginWrapper";
import RegisterForm from "./component/authentication/RegisterForm";


function App() {

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={
          <LoginWrapper>
            <Home />
          </LoginWrapper>
        }></Route>
        {/* <Route path="/menu" element={<Menu />}></Route>
            <Route path="/reservation" element={<Reservation />}></Route>
            <Route path="/shoppingcart" element={<ShoppingCart />}></Route> */}
      </Route>
      {/* <Route path="/userdashboard" element={<UserDashboard />}></Route>
          <Route path="*" element={<Navigate to="/" />} /> */}
      <Route path="/admindashboard" element={<AdminDashboard />}></Route>
      <Route path="/login" element={<LoginForm />}></Route>
      <Route path="/register" element={<RegisterForm />}></Route>
    </Routes>
  );
}

export default App;
