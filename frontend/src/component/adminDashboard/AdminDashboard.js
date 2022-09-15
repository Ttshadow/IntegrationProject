import { Outlet } from "react-router-dom";
import { MenuDashboard } from "./MenuDashboard";
import SideBar from './SideBar';

function AdminDashboard() {

    return(
        <>
        <SideBar />
        <Outlet />
        </>
        
    )
}
export default AdminDashboard;