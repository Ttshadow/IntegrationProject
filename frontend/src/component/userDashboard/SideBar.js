import { MdRateReview } from "react-icons/md";
import { ImProfile, ImCalendar } from "react-icons/im";
import { RiFileHistoryFill } from "react-icons/ri";
import { FiArrowLeft, FiArrowRight, FiLogOut } from "react-icons/fi";
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
  import "./userSidebar.css";
import 'react-pro-sidebar/dist/css/styles.css';


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
                    <p>{isOpen ? "User" : "User Dashboard"}</p>
                </div>
                <div className="closemenu" onClick={toggle}>
                    {isOpen ? <FiArrowRight /> : <FiArrowLeft />}
                </div>
            </SidebarHeader>
            <SidebarContent>
                <Menu iconShape="circle">
                    <MenuItem icon={<ImProfile />}>
                        Profile
                        <Link to="/" />
                    </MenuItem>
                    <MenuItem icon={<RiFileHistoryFill />}>
                        Order History
                        <Link to="/" />
                    </MenuItem>
                    <MenuItem icon={<ImCalendar />}>
                        Reservations
                        <Link to="/" />
                    </MenuItem>
                    <MenuItem active={window.location.pathname === "/admindashboard/leavecomment"} icon={<MdRateReview />}>
                        Leave a Review
                        <Link to="leavecomment" />
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