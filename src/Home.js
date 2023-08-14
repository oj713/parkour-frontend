import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaHome, FaCompass, FaBell, FaEnvelope, FaBookmark, FaList, FaUser, FaBars } from 'react-icons/fa';
import ParkPosts from "./homePosts";
import RightSide from "./home-right-side";
import { AiOutlineSearch } from "react-icons/ai";

function Profile() {
    return (
        <div>
            <div class="row">
            <div class="mainPane col-8">
                
                <div className="col-11 position-relative">
                    <div className="row">
                    <input placeholder="Search Parkour"
                        className="form-control rounded-pill ps-5 subPane" />
                    <AiOutlineSearch className="fs-3 col-1 position-absolute"/>
                    </div>
                    </div>
                <ParkPosts />
                </div>
            <div class="mainPane col-3">
                    <RightSide />
            </div>
            </div>

        </div>
    )
}

export default Profile