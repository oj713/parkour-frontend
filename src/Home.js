import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
//import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { FaHome, FaCompass, FaBell, FaEnvelope, FaBookmark, FaList, FaUser, FaBars } from 'react-icons/fa';
import PostsList from "./postsList";
import RightSide from "./home-right-side";
import { AiOutlineSearch } from "react-icons/ai";
import { findUserByUsernameThunk } from "./services/users-thunks";
import { useDispatch } from "react-redux";
import {findPosts} from "./services/posts-service";


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
        <div>
            <div className="row">
                <div className="mainPane col-8">
                    <div className="col-11">
                        <div className="row">
                            <div className="position-relative">
                                <AiOutlineSearch className="fs-3 position-absolute top-50 start-1 translate-middle-y" />
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
                    </div>





                <PostsList showParksHeaders = {true} />
                </div>
            <div class="mainPane col-3">
                    <RightSide />
            </div>
            </div>

        </div>
    )
}

export default Home