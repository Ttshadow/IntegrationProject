import { BiFoodMenu, BiCommentDots } from "react-icons/bi";
import { ImPriceTag } from "react-icons/im";
import { BsCartFill, BsCalendarCheckFill } from "react-icons/bs";
import { SiAirtable } from "react-icons/si";
import { FiArrowLeftCircle, FiArrowRightCircle, FiLogOut } from "react-icons/fi";
import {NavLink, Link} from "react-router-dom";
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

    const [activePage, setActivePage] = useState(false) ;
    const handleClick = (event) => {
        event.preventDefault();
        if (!event.target.classList.value.includes("active")) {
            event.target.classList.add('active') ;
            if (activePage)
              activePage.classList.remove("active") ;
            setActivePage(event.target) ;
          }
        console.log("clicked");
    }
return(
<>
    <div id="side_bar">
        <ProSidebar collapsed={isOpen}>
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
                        <Link to="/" />
                    </MenuItem>
                    <MenuItem icon={<BiFoodMenu />}>
                        Menu
                        <Link to="/" />
                    </MenuItem>
                    <MenuItem icon={<BsCartFill />}>
                        Orders
                        <Link to="/" />
                    </MenuItem>
                    <MenuItem icon={<ImPriceTag />}>Promotions</MenuItem>
                    <MenuItem icon={<BsCalendarCheckFill />}>Reservations</MenuItem>
                    <MenuItem icon={<BiCommentDots />}>
                        Reviews
                        <NavLink to='/review' onClick={handleClick}/>
                    </MenuItem>
                </Menu>
            </SidebarContent>
            <SidebarFooter>
                <Menu iconShape="circle">
                    <MenuItem icon={<FiLogOut />}>Log out</MenuItem>
                </Menu>
            </SidebarFooter>
        </ProSidebar>
    </div>
</>
)
}

export default SideBar;