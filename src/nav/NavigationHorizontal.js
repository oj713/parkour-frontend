import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaRegClipboard } from 'react-icons/fa';
import { CgLogOut } from 'react-icons/cg';
import { logoutThunk } from "../services/auth-thunks";
import {ReactComponent as ParkourLogo} from "../assets/Logo/parkour-logo.svg";

const NavigationHorizontal = () => {

    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [parkour, active, extra] = pathname.split("/");
    const { currentUser } = useSelector((state) => state.auth);

    const logoutHandler = async () => {
        try {
            await dispatch(logoutThunk());
            navigate("/");
        } catch (e) {
            alert(e);
        }
    }

    function linkItem(loc, toLoc, Icon, cond) {
        return (
            <Link
                key={loc.toLowerCase()}
                to={`/${toLoc.toLowerCase()}`}
                className = {`white p-3 align-items-center ${cond ? "active" : ""}`}>
                {Icon}
                <span> <b>{loc}</b> </span>
            </Link>
        )
    }

    const treeIcon = {
        "position": "relative",
        "top": ".1em",
        "fontSize":"1.5em"
    }

    return (
        <>
        <div className="position-fixed navBar z-3 d-flex flex-row bg-brown2 p-0">
            <Link
                key = "home"
                to = ""
                className = {`green2 p-3 pt-2 pb-0 d-flex align-items-center 
                ${active == "home" || active == "" ? "active" : ""}`}>
                <ParkourLogo style = {treeIcon} className = "h5"/>
                <h3 style={{"fontSize":"1.3em"}}>Parkour</h3>
            </Link>
            <div className = "flex-grow-1 display-block"></div>
            {currentUser ? (
                <>
                    {linkItem("Profile", "profile", <FaUser className = "me-2"/>, active == "profile" && extra == null)}
                    {linkItem("Logout", "", <CgLogOut className = "me-2"/>, active == "logout")}
                </>
            ) :
                <>
                    {linkItem("Login", "login", <FaUser className = "me-2"/>, active == "login")}
                    {linkItem("Register", "register", <FaRegClipboard className = "me-2"/>, active == "register")}
                </>
            }
        </div>
        <div className = "m-3 mb-5 display-block"></div>
        </>
    );
};

export default NavigationHorizontal;
