import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaRegClipboard } from 'react-icons/fa';
import { CgLogOut } from 'react-icons/cg';
import { logoutThunk } from "../services/auth-thunks";

const Navigation = () => {

    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ignore, parkour, active] = pathname.split("/");
    const { currentUser } = useSelector((state) => state.auth);

    const logoutHandler = async () => {
        try {
            await dispatch(logoutThunk());
            navigate("/home");
        } catch (e) {
            alert(e);
        }
    }

    return (
        <div className="list-group position-fixed m-3 p-3 bg-brown2">
            <Link
                key='home'
                to='/home'
                className={`list-group-item d-flex align-items-center bg-brown1 ${active === 'home' ? "active" : ""}`}>
                <FaHome className="me-2" />
                <span className="d-none d-md-block">
                    Home
                </span>
            </Link>
            {currentUser ? (
                <>
                    <Link
                        key='profile'
                        to='/profile'
                        className={`list-group-item d-flex align-items-center bg-brown1 ${active === 'profile' ? "active" : ""}`}>
                        <FaUser className="me-2" />
                        <span className="d-none d-md-block">
                            Profile
                        </span>
                    </Link>
                    <Link
                        key='logout'
                        to='/home'
                        className={`list-group-item d-flex align-items-center bg-brown1 ${active === 'profile' ? "active" : ""}`}
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
                        className={`list-group-item d-flex align-items-center bg-brown1 ${active === 'login' ? "active" : ""}`}>
                        <FaUser className="me-2" />
                        <span className="d-none d-md-block">
                            Login
                        </span>
                    </Link>
                    <Link
                        key='register'
                        to='/register'
                        className={`list-group-item d-flex align-items-center bg-brown1 ${active === 'login' ? "active" : ""}`}>
                        <FaRegClipboard className="me-2" />
                        <span className="d-none d-md-block">
                            Register
                        </span>
                    </Link>
                </>

            }
        </div>
    );
};

export default Navigation;
