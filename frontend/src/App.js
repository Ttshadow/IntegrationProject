import React, { useContext, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminDashboard from "./component/adminDashboard/AdminDashboard";
import NewCategory from "./component/adminDashboard/NewCategory";
import { MenuDashboard } from "./component/adminDashboard/MenuDashboard";
import { EditCategory } from "./component/adminDashboard/EditCategory";


// import UserDashboard from "./component/userDashboard/UserDashboard";


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
          {/* <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />}></Route>
            <Route path="/menu" element={<Menu />}></Route>
            <Route path="/reservation" element={<Reservation />}></Route>
            <Route path="/shoppingcart" element={<ShoppingCart />}></Route>
          </Route> */}
          <Route path="/adminDashboard/" element={<AdminDashboard />}>
            <Route path="menuDashboard" element={<MenuDashboard />}/>
            <Route path="newCategory" element={<NewCategory />}/>
            <Route path="editCategory/:id" element={<EditCategory />}/>

          </Route>
          {/* <Route path="/userdashboard" element={<UserDashboard />}></Route> */}
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
  );
}

export default App;
