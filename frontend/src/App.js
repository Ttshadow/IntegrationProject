import React, { useContext, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./components/home/Home";
import GlobalStyles from "./components/GlobalStyles";
import Event from "./components/event/Event";
import AboutUs from "./components/about/AboutUs";
import EventDetails from "./components/event/EventDetails";
import UserDashboard from "./components/userDashboard/UserDashboard";


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
