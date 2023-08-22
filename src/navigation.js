import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaHome, FaUser } from 'react-icons/fa';
import { CgLogOut } from 'react-icons/cg';
import { logout } from "./services/auth-services";

const Navigation = () => {

    const { pathname } = useLocation();
    const [ignore, parkour, active] = pathname.split("/");
    const { currentUser } = useSelector((state) => state.auth);

    return (
        <div className="list-group mainPane">
            <Link
                key='home'
                to='/home'
                className={`subPane list-group-item text-capitalize ${active === 'home' ? "active" : ""
                    }`}>
                <span className="icon float-start me-2"><FaHome /></span>
                <span className="text d-lg-none d-xl-block d-none ms-1">
                    Home
                </span>
            </Link>
            {currentUser ? (
                <>
                   <Link
                        key='profile'
                        to='/profile'
                        className={`subPane list-group-item text-capitalize ${active === 'profile' ? "active" : ""
                            }`}>
                        <span className="icon float-start me-2"><FaUser /></span>
                        <span className="text d-lg-none d-xl-block d-none ms-1">
                            Profile
                        </span>
                    </Link>
                    <Link
                        key='logout'
                        to='/home'
                        className={`subPane list-group-item text-capitalize ${active === 'profile' ? "active" : ""
                            }`}
                        onClick={logout}
                            >
                        <span className="icon float-start me-2"><CgLogOut /></span>
                        <span className="text d-lg-none d-xl-block d-none ms-1">
                            Logout
                        </span>
                    </Link>
                </>
            ) :
                <Link
                    key='login'
                    to='/login'
                    className={`subPane list-group-item text-capitalize ${active === 'login' ? "active" : ""
                        }`}>
                    <span className="icon float-start me-2"><FaUser /></span>
                    <span className="text d-lg-none d-xl-block d-none ms-1">
                        Login
                    </span>
                </Link>
            }
        </div >
    );
};

export default Navigation