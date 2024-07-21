import { useNavigate } from "react-router-dom";
import logout from "../assets/logout.svg";
import React from "react";
import "../styles/Header.css"
import { clearLocalStorage, getUserName } from "../assets/utilities";


const Header: React.FC = () => {
    const name = getUserName();
    const navigate = useNavigate();
    const handlelogout = () => {
        clearLocalStorage()
        navigate("/");
    }

    return (
        <>
            <div className="header-username">
                <img className="header-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGvkLE9Ne2P3N_ZK-5vyXO4RKE3BDEe_26oA&usqp=CAU" alt="#" />
                <h3 className="user-p">{name}</h3>
                <img className='logout-logo' src={logout} onClick={handlelogout} alt="" />
            </div>
        </>
    )
}

export default Header;