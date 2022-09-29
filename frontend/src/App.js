import React, { useEffect, useState } from "react";
import MainLayout from "./component/MainLayout";
import AdminTable from "./pages/AdminTable";
import Home from "./component/home/Home";

import UserDashboard from "./component/userDashboard/UserDashboard";
import AdminDashboard from "./component/adminDashboard/AdminDashboard";
import AdminReservation from "./pages/AdminReservation";
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
import Order from "./component/adminDashboard/Order";
import TakeOutOrder from "./component/order/TakeOutOrder";
import DineInOrder from "./component/order/DineInOrder";
import Comment from "./component/adminDashboard/Comment";
import LeaveComment from "./component/userDashboard/LeaveComment";
import Profile from "./component/userDashboard/Profile";
import ShowProfile from "./component/userDashboard/ShowProfile";
import UserInfo from "./component/adminDashboard/UserInfo";
import StripeContainer from "./component/order/StripeContainer";
import PaymentSuccess from "./component/order/PaymentSuccess";
import Promotion from "./component/adminDashboard/Promotion";
import OrderHistory from "./component/userDashboard/OrderHistory";
// import UserDashboard from "./component/userDashboard/UserDashboard";


function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />}></Route>
        <Route path="takeoutorder" element={<StripeContainer />}></Route>
        <Route path="dineinorder" element={<DineInOrder />}></Route>
        <Route path="paymentsuccess" element={<PaymentSuccess />}></Route>
        <Route path="/newreservation" element={<LoginWrapper><AddReservation /></LoginWrapper>} />
        <Route path="/dine/" element={<LoginWrapper><Outlet /></LoginWrapper>}>
          <Route path="" element={<TakeoutOrDinein/>}/>
          <Route path="menu" element={<UserMenu />}/>
          <Route path="cart" element={<Cart />}/>
        </Route>
      </Route>
      {/*<Route path="/admindashboard" element={<AdminDashboard />}></Route>*/}
      {/*<Route path="/admindashboard/table" element={<AdminTable />}></Route>*/}
      {/*<Route path="/admindashboard/reservation" element={<AdminReservation />}></Route>*/}

      {/*USER DASHBOARD*/}
      <Route path="/userdashboard/" element={<UserDashboard />}>
        <Route path="leavecomment" element={<LeaveComment />}/>
        <Route path="reservation" element={<UserReservation />} />
        <Route path="/userdashboard/profile/edit" element={<Profile />}/>
        <Route path="profile" element={<ShowProfile />}/>
        <Route path="history" element={<OrderHistory />} />
      </Route>


      <Route path="/login" element={<LoginForm />}></Route>
      <Route path="/register" element={<RegisterForm />}></Route>

      {/*ADMIN DASHBOARD*/}
      <Route path="/adminDashboard/" element={<AdminDashboard />}>
        <Route path="menuDashboard" element={<MenuDashboard />}/>
        <Route path="newCategory" element={<NewCategory />}/>
        <Route path="editCategory/:id" element={<EditCategory />}/>
        <Route path="editMenu/:id" element={<EditMenu />}/>
        <Route path="newMenu" element={<NewMenu />}/>
        <Route path="order" element={<Order />}/>
        <Route path="promotion" element={<Promotion />}/>
        <Route path="table" element={<AdminTable />}/>
        <Route path="reservation" element={<AdminReservation />}/>
        <Route path="comment" element={<Comment />}/>
        <Route path="userinfo" element={<UserInfo />}/>
      </Route>

      <Route path="/dine/" element={<Outlet />}>
        <Route path="" element={<TakeoutOrDinein/>}/>
        <Route path="menu" element={<UserMenu />}/>
        <Route path="cart" element={<Cart />}/>
      </Route>


      {/* <Route path="/userdashboard" element={<UserDashboard />}></Route> */}
      {/* <Route path="*" element={<Navigate to="/" />} /> */}
    </Routes>
  );
}

export default App;