import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaRegClipboard } from 'react-icons/fa';
import { CgLogOut } from 'react-icons/cg';
import { logoutThunk } from "../services/auth-thunks";
import {ReactComponent as ParkourLogo} from "../assets/Logo/parkour-logo.svg";

const Navigation = () => {

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

    const treeIcon = {
        "position": "relative",
        "top": ".2em"
    }

    return (
        <div className = "position-fixed m-0 p-0 d-none d-lg-block z-3" style = {{"width":"17%"}}>
        <div className = "green2 m-3 mb-0">
            <h2><ParkourLogo className = "up-2"/>Parkour</h2>
        </div>
        <div className="mt-0 p-0 mainPane list-group rounded navBar">
            <Link
                key='home'
                to='/'
                className={`list-group-item d-flex align-items-center ${active === 'home' || active == "" ? "active" : ""}`}>
                <ParkourLogo style = {treeIcon} className = "h5"/>
                <span className="d-none d-md-block">
                    Parkour
                </span>
            </Link>
            {currentUser ? (
                <>
                    <Link
                        key='profile'
                        to='/profile'
                        className={`list-group-item d-flex align-items-center ${active === 'profile' && extra == null ? "active" : ""}`}>
                        <FaUser className="me-2" />
                        <span className="d-none d-md-block">
                            Profile
                        </span>
                    </Link>
                    <Link
                        key='logout'
                        to='/'
                        className={`list-group-item d-flex align-items-center ${active === 'logout' ? "active" : ""}`}
                        onClick={logoutHandler}>
                        <CgLogOut className="me-2" />
                        <span className="d-none d-md-block">
                            Logout
                        </span>
                    </Link>
                </>
            ) :
                <>
                    <Link
                        key='login'
                        to='/login'
                        className={`list-group-item d-flex align-items-center ${active === 'login' ? "active" : ""}`}>
                        <FaUser className="me-2" />
                        <span className="d-none d-md-block">
                            Login
                        </span>
                    </Link>
                    <Link
                        key='register'
                        to='/register'
                        className={`list-group-item d-flex align-items-center ${active === 'register' ? "active" : ""}`}>
                        <FaRegClipboard className="me-2" />
                        <span className="d-none d-md-block">
                            Register
                        </span>
                    </Link>
                </>

            }
        </div>
        </div>
    );
};

export default Navigation;
