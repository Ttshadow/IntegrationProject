import React, { useContext, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./component/MainLayout";
import Home from "./component/home/Home";


function App() {
  return (
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />}></Route>
            {/* <Route path="/menu" element={<Menu />}></Route>
            <Route path="/reservation" element={<Reservation />}></Route>
            <Route path="/shoppingcart" element={<ShoppingCart />}></Route> */}
          </Route>
          {/* <Route path="/admindashboard" element={<AdminDashboard />}></Route>
          <Route path="/userdashboard" element={<UserDashboard />}></Route>
          <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
  );
}

export default App;
