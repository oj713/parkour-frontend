import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaHome, FaCompass, FaBell, FaEnvelope, FaBookmark, FaList, FaUser, FaBars } from 'react-icons/fa';
import { AiOutlineSearch } from "react-icons/ai";
import MainResults from "./mainSearch";
import UserResults from "./userSearch"
import { findUserByUsernameThunk } from "../services/users-thunks";
const apiUrl = 'https://developer.nps.gov/api/v1/'//process.env.NPS_API_KEY;
const apiKey = 'BW8ajGbeYQYXIIDFzJgC4FdVXhY7zl0ITUTm3V8d'//process.env.NPS_API_URL;

function Search() {
    const { pathname, search } = useLocation();
    const navigate = useNavigate();
    const [ignore, parkour, active] = pathname.split("/");

    const queryParams = new URLSearchParams(search);
    const queryValue = queryParams.get("query");

    let [searchInput, setSearchInput] = useState('');
    const [parks, setParks] = useState([]);

    const dispatch = useDispatch();

    //useEffect(() => {
    //    // Fetch data based on the queryValue when the component mounts
    //    if (queryValue) {
    //        const search = {
    //            user: queryValue
    //        }
    //        dispatch(findUserByUsernameThunk(search));
    //    }
    //}, [queryValue, dispatch]);
    useEffect(() => {
        const queryParams = new URLSearchParams(search);
        const queryValue = queryParams.get("query");
        const fetchParks = async () => {
            const parkString = apiUrl + "parks?api_key=" + apiKey + "&q=" + queryValue;
            console.log(parkString)
        try {
            const response = await fetch(
                parkString
            );



            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            let data = await response.json();
            //data = await response.json();
            setParks(data.data);
        } catch (error) {
            console.error('Error fetching park data:', error);
        }
    };

        fetchParks();
    }, []);

   const parkSearch = parks.sort()//.filter(post => post.name == queryValue);

    const searchEnterHandler = () => {
        const search = {
            user: searchInput
        }
        //var url = apiUrl;
        //url += '?apikey=' + apiKey;
        //url += '&s=' + searchInput;
        //fetch(url)
        //    .then(res => res.json())
        //    .then(json => {
        //        this.setState({})
        //    })
        //dispatch(findUserByUsernameThunk(search));
        //setSearchInput("");
        navigate(`/search?query=${searchInput}`);
        window.history.pushState(null, "", `/search?query=${searchInput}`);

    }

    const userSearchHandler = () => {
        const search = {
            user: searchInput
        }
        navigate(`/search?query=${searchInput}`);
        window.history.pushState(null, "", `/search?query=${searchInput}`);

    }
    return (
        <div>
            <div class="row">
                <div class="mainPane col-8">

                    <div className="col-11 position-relative">
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
                        <div className="row">
                        <div class="dropdown col-3">
                                <select class="form-select btn btn-success" style={{ "background-color": "darkgreen" }}>
                                    <option selected>Region</option>
                                    <option value="1">Northeast</option>
                                    <option value="2">Southeast</option>
                                    <option value="3">Midwest</option>
                                    <option value="4">Southwest</option>
                                    <option value="5">Mountain West</option>
                                    <option value="6">West Coast</option>
                                    <option value="7">Non-continental</option>
                                </select>
                            </div>
                            <div class="dropdown col-3">
                                <select class="form-select btn btn-success" style={{ "background-color": "darkgreen" }}>
                                    <option selected>State</option>
                                    <option value="1">Alabama</option>
                                    <option value="2">Alaska</option>
                                    <option value="3">Arkansas</option>
                                    <option value="4">Scroll Full List</option>
                                </select>
                            </div>
                            <div class="dropdown col-3">
                                <select class="form-select btn btn-success" style={{ "background-color": "darkgreen" }}>
                                    <option selected>Park</option>
                                    <option value="1">Acadia</option>
                                    <option value="2">Arches</option>
                                    <option value="3">Badlands</option>
                                    <option value="4">Scroll Full List</option>

                                </select>
                                </div>
      
                            <div class="dropdown col-3">
                                <select class="form-select btn btn-success" style={{"background-color":"darkgreen"}}>
                                    <option selected>Feature</option>
                                    <option value="1">Coastline</option>
                                    <option value="2">Mountain</option>
                                    <option value="3">Canyon</option>
                                    <option value="4">Lake</option>
                                </select>
                            </div>
                        </div>

                    </div>
                    
                    <ul>
                        {parkSearch.map((park) => (
                            <li key={park.id}>
                                <h2>{park.fullName}</h2>
                                <p>{park.url}</p>
                                <p>{park.description}</p>
                                
                            </li>
                        ))}
                    </ul>
                   <MainResults/>
                </div>
                <div class="mainPane col-3">
                    <div className="col-11 position-relative">
                        <div className="row">
                            <input placeholder="Search Users"
                                className="form-control rounded-pill ps-5 subPane"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        userSearchHandler();
                                    }
                                }}                            />
                            <AiOutlineSearch className="fs-3 col-3 position-absolute" />
                        </div>
                        <div class="row">
                        <div class="dropdown col-6">
                            <select class="form-select btn btn-success" style={{ "background-color": "darkgreen" }}>
                                <option selected>Role</option>
                                <option value="1">Visitor</option>
                                <option value="2">Ranger</option>
                            </select>
                        </div>

                        <div class="dropdown col-6">
                            <select class="form-select btn btn-success" style={{ "background-color": "darkgreen" }}>
                                <option selected>Park</option>
                                <option value="1">Acadia</option>
                                <option value="2">Arches</option>
                                <option value="3">Badlands</option>
                            </select>
                            </div>
                            </div>
                    </div>
                    <UserResults/>
                   
                </div>
            </div>

        </div>
    )
}

export default Search