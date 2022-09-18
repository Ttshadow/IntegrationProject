import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function TakeoutOrDinein(){
    const navigate = useNavigate();

    function selectDinein(){
        sessionStorage.setItem("isTakeout", false);
        navigate(`menu`);
    }
    function selectTakeout(){
        // takeout = 'takeout';
        sessionStorage.setItem("isTakeout", true);
        navigate(`menu`);
    }
    return (
        <div className="row">
                <h2 className="text-center">Start Your Order</h2>
                <div className="text-center">
                    <Button className="btn btn-dark btn-lg me-2 col-5" onClick={selectDinein}>DINE-IN</Button>
                    <Button className="btn btn-dark btn-lg col-5" onClick={selectTakeout}>TAKE-OUT</Button>
                </div>
            
        </div>
        
    )
}