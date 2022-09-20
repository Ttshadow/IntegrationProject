import React, { useEffect, useState } from "react";
import MainLayout from "./component/MainLayout";
import Home from "./component/home/Home";
import Reservation from "./component/reservation/Reservation";
import ShoppingCart from "./component/shoppingCart/ShoppingCart";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import AdminDashboard from "./component/adminDashboard/AdminDashboard";
import LoginForm from "./component/authentication/LoginForm";
import LoginWrapper from "./component/authentication/LoginWrapper";
import RegisterForm from "./component/authentication/RegisterForm";
import NewCategory from "./component/adminDashboard/Menu/NewCategory";
import { MenuDashboard } from "./component/adminDashboard/Menu/MenuDashboard";
import { EditCategory } from "./component/adminDashboard/Menu/EditCategory";
import { EditMenu } from "./component/adminDashboard/Menu/EditMenu";
import NewMenu from "./component/adminDashboard/Menu/NewMenu";
import { TakeoutOrDinein } from "./component/menu/TakeoutOrDinein";
import { UserDashboard } from "./component/userDashboard/UserDashboard";
import { Menu } from "./component/menu/Menu";
import { UserMenu } from "./component/menu/UserMenu";
import { Cart } from "./component/menu/Cart";
import Order from "./component/adminDashboard/Order";
import CustomerOrder from "./component/order/CustomerOrder";

// import UserDashboard from "./component/userDashboard/UserDashboard";


function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />}></Route>
        <Route path="/order" element={<CustomerOrder />}></Route>
        {/* <Route path="/menu" element={<Menu />}></Route>
            <Route path="/reservation" element={<Reservation />}></Route>
            <Route path="/shoppingcart" element={<ShoppingCart />}></Route> */}
      </Route>
      {/* <Route path="/userdashboard" element={<UserDashboard />}></Route>
          <Route path="*" element={<Navigate to="/" />} /> */}

      <Route path="/login" element={<LoginForm />}></Route>
      <Route path="/register" element={<RegisterForm />}></Route>

      <Route path="/adminDashboard/" element={<AdminDashboard />}>
        <Route path="menuDashboard" element={<MenuDashboard />}/>
        <Route path="newCategory" element={<NewCategory />}/>
        <Route path="editCategory/:id" element={<EditCategory />}/>
        <Route path="editMenu/:id" element={<EditMenu />}/>
        <Route path="newMenu" element={<NewMenu />}/>
        <Route path="order" element={<Order />}/>
      </Route>

      <Route path="/dine/" element={<Outlet />}>
        <Route path="" element={<TakeoutOrDinein/>}/>
        <Route path="menu" element={<UserMenu />}/>
        <Route path="cart" element={<Cart />}/>
      </Route>

      {/* <Route path="/userDashboard/" element={<UserDashboard />}>
      </Route> */}
      {/* <Route path="/userdashboard" element={<UserDashboard />}></Route> */}
      {/* <Route path="*" element={<Navigate to="/" />} /> */}
    </Routes>
  );
}

export default App;
