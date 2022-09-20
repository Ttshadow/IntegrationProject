import { Tab, Tabs } from "react-bootstrap";
import { Outlet } from "react-router-dom";

export function Menu(){


    return (
        <Outlet />
        //<Tabs
        //     defaultActiveKey="profile"
        //     id="uncontrolled-tab-example"
        //     className="mb-3"
        //     >
        //     <Tab
        //      eventKey="home" title="Home">
        //         {takeout}
        //     </Tab>
        // </Tabs>
    )
}