import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
//import { useHistory } from "react-router";
import { FaHome, FaCompass, FaBell, FaEnvelope, FaBookmark, FaList, FaUser, FaBars } from 'react-icons/fa';
import RightSide from "../home-right-side";
import { AiOutlineSearch } from "react-icons/ai";
import Feed from "./Feed";

function Home() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [ignore, parkour, active] = pathname.split("/");


    let [searchInput, setSearchInput] = useState('');

    const searchEnterHandler = () => {
        const search = {
            user: searchInput
        }
        //dispatch(findUserByUsernameThunk(search));
        setSearchInput("");
        navigate(`/search?query=${searchInput}`);
    }

    return (
            <div className="row">
                <div className="col mainPane">
                    <div className="row pe-3">
                        <div className="position-relative">
                            <AiOutlineSearch className="fs-3 ms-3 position-absolute top-50 translate-middle-y" />
                            <input
                                placeholder="Search Parkour"
                                className="form-control rounded-pill ps-5 subPane"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        searchEnterHandler();
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <Feed />
                    </div>
                </div>
                <div className = "d-none d-lg-block col-3">
                    <RightSide/>
                </div>
                <div className = "d-none d-sm-block col-1 d-lg-none"></div>
            </div>
    )
}

export default Home