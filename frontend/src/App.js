import React, { useContext, useState } from "react";
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
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import LoginForm from "./component/authentication/LoginForm";
import LoginWrapper from "./component/authentication/LoginWrapper";
import RegisterForm from "./component/authentication/RegisterForm";
import NewCategory from "./component/adminDashboard/Menu/NewCategory";
import { MenuDashboard } from "./component/adminDashboard/Menu/MenuDashboard";
import { EditCategory } from "./component/adminDashboard/Menu/EditCategory";
import { EditMenu } from "./component/adminDashboard/Menu/EditMenu";
import NewMenu from "./component/adminDashboard/Menu/NewMenu";
import { TakeoutOrDinein } from "./component/menu/TakeoutOrDinein";
import { Menu } from "./component/menu/Menu";
import { UserMenu } from "./component/menu/UserMenu";
import { Cart } from "./component/menu/Cart";

// import UserDashboard from "./component/userDashboard/UserDashboard";


function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={
          <LoginWrapper>
            <Home />
          </LoginWrapper>
        }>
        </Route>
      </Route>
      {/*<Route path="/admindashboard" element={<AdminDashboard />}></Route>*/}
      {/*<Route path="/admindashboard/table" element={<AdminTable />}></Route>*/}
      {/*<Route path="/admindashboard/reservation" element={<AdminReservation />}></Route>*/}
      
      {/*USER DASHBOARD*/}
      <Route path="/userDashboard/" element={<UserDashboard />}>
        <Route path="reservation" element={<UserReservation />} />
        <Route path="newreservation" element={<AddReservation />} />
      </Route>
      
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/shoppingcart" element={<ShoppingCart />}></Route> 

      <Route path="/login" element={<LoginForm />}></Route>
      <Route path="/register" element={<RegisterForm />}></Route>
      {/*ADMIN DASHBOARD*/}
      <Route path="/adminDashboard/" element={<AdminDashboard />}>
        <Route path="menuDashboard" element={<MenuDashboard />}/>
        <Route path="newCategory" element={<NewCategory />}/>
        <Route path="editCategory/:id" element={<EditCategory />}/>
        <Route path="editMenu/:id" element={<EditMenu />}/>
        <Route path="newMenu" element={<NewMenu />}/>
        <Route path="table" element={<AdminTable />}/>
        <Route path="reservation" element={<AdminReservation />}/>
      </Route>

      <Route path="/dine/" element={<Outlet />}>
        <Route path="" element={<TakeoutOrDinein/>}/>
        <Route path="menu" element={<UserMenu />}/>
        <Route path="cart" element={<Cart />}/>
      </Route>
    </Routes>
  );
}

export default App;
