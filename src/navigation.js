import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaHome, FaCompass, FaBell, FaEnvelope, FaBookmark, FaList, FaUser, FaBars } from 'react-icons/fa';

const Navigation = () => {

    const { pathname } = useLocation();
    const [ignore, parkour, active] = pathname.split("/");

    const {currentUser} = useSelector((state) => state.auth);
    const finalLink = currentUser ? "profile" : "login"

    const links = ["home", "explore", "notifications", "messages", "bookmarks", finalLink];
    const getIcon = (link) => {
        switch (link) {
            case "home":
                return <FaHome />;
            case "explore":
                return <FaCompass />;
            case "notifications":
                return <FaBell />;
            case "messages":
                return <FaEnvelope />;
            case "bookmarks":
                return <FaBookmark />;
            case "profile":
            case "login":
                return <FaUser />;
            default:
                return null;
        }
    }

    return (
        <div className="list-group mainPane">
            {links.map((link) => (
                <Link
                    key={link}
                    to={`/${link}`}
                    className={`subPane list-group-item text-capitalize ${active === link ? "active" : ""
                        }`}
                >
                    <span className="icon float-start me-2">{getIcon(link)}</span>
                    <span className="text d-lg-none d-xl-block d-none ms-1">
                        {link}
                    </span>
                </Link>
            ))}
        </div>
    );
};

export default Navigation