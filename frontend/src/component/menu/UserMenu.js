import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { UseFetchCategories } from "../adminDashboard/Menu/UseFetchCategories";
import { MenuCardGroup } from "./MenuCardGroup";

export function UserMenu(){
    const categories = UseFetchCategories('/admindashboard/category');
    const [key, setKey] = useState();
    return (
        <div>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
                
                >
                    <Tab eventKey={0} title="All">
                        <MenuCardGroup selectCategory={0} />
                    </Tab>
                    {categories?.map((category)=>{
                    return (
                    <Tab eventKey={category.id} title={category.name} key={category.id}>
                        <MenuCardGroup selectCategory = {category.id} />
                    </Tab>
                    )
                })
                }
                
            </Tabs>
        </div>
    )
}