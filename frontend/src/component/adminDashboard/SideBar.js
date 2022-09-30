import { BiFoodMenu, BiCommentDots } from "react-icons/bi";
import { ImPriceTag } from "react-icons/im";
import { BsCartFill, BsCalendarCheckFill } from "react-icons/bs";
import { SiAirtable } from "react-icons/si";
import { FiArrowLeftCircle, FiArrowRightCircle, FiLogOut, FiUsers } from "react-icons/fi";
import {Link} from "react-router-dom";
import React, { useState } from "react";
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarContent
  } from "react-pro-sidebar";
  import "react-pro-sidebar/dist/css/styles.css";
import "./sidebar.css";

function SideBar(){
    const[isOpen, setIsOpen] = useState(false);
    const toggle = () => {isOpen ? setIsOpen(false) : setIsOpen(true);};

return(
<>
    <div id="side_bar">
        <ProSidebar collapsed={isOpen} toggled="true">
            <SidebarHeader>
                <div className="maintext">
                    <p>{isOpen ? "Admin" : "Admin Dashboard"}</p>
                </div>
                <div className="closemenu" onClick={toggle}>
                    {isOpen ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
                </div>
            </SidebarHeader>
            <SidebarContent>
                <Menu iconShape="circle">
                    <MenuItem icon={<SiAirtable />}>
                        Tables
                        <Link to="/admindashboard/table" />
                    </MenuItem>
                    <MenuItem icon={<BiFoodMenu />}>
                        Menu
                        <Link to="menuDashboard" />
                    </MenuItem>
                    <MenuItem icon={<BsCartFill />}>
                        Orders
                        <Link to="/admindashboard/order" />
                    </MenuItem>
                    <MenuItem icon={<ImPriceTag />}>
                        Promotions
                        <Link to="/admindashboard/promotion" />
                    </MenuItem>
                    <MenuItem icon={<BsCalendarCheckFill />}>
                        Reservations
                        <Link to="/admindashboard/reservation" />
                    </MenuItem>
                    <MenuItem icon={<BiCommentDots />}>
                        Reviews
                        <Link to="/admindashboard/comment" />
                    </MenuItem>
                    <MenuItem icon={<FiUsers />}>
                        Users
                        <Link to="/admindashboard/userinfo" />
                    </MenuItem>

                    {/*TEMP FOR USERDASHBOARD*/}
                
                </Menu>
            </SidebarContent>
            <SidebarFooter>
                <Menu iconShape="circle">
                    <MenuItem icon={<FiLogOut />}  >
                        Back to Home
                        <Link to="/" />
                    </MenuItem>
                </Menu>
            </SidebarFooter>
        </ProSidebar>
    </div>
</>
)
}

export default SideBar;