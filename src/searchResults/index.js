import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaHome, FaCompass, FaBell, FaEnvelope, FaBookmark, FaList, FaUser, FaBars } from 'react-icons/fa';
import { AiOutlineSearch } from "react-icons/ai";
import MainResults from "./mainSearch";
import UserResults from "./userSearch"
import PostsList from "../postsList";
import { findUserByUsernameThunk } from "../services/users-thunks";
import states from "./states";
import activities from "./activities";



const addedStates = [];
const addedActivities = [];
const apiUrl = 'https://developer.nps.gov/api/v1/'//process.env.NPS_API_KEY;
const apiKey = 'BW8ajGbeYQYXIIDFzJgC4FdVXhY7zl0ITUTm3V8d'//process.env.NPS_API_URL;


function Search() {
    
    const { pathname, search } = useLocation();
    const navigate = useNavigate();
    const [ignore, parkour, active] = pathname.split("/");

    const queryParams = new URLSearchParams(search);
    let queryValue = queryParams.get("query");

    
    let parkState = '';
    let parkChoice = '';
    let parkActivity = '';


    let [searchInput, setSearchInput] = useState(queryValue ? queryValue : '');

    const [parks, setParks] = useState([]);

    const dispatch = useDispatch();

    let parkSearch = parks.sort((a, b) => {

        if (a.name === queryValue && b.name !== queryValue) {
            return -1;
        }
        else if (a.name !== queryValue && b.name === queryValue) {
            return 1;
        }
        else {
            return 0;
        }

    });
    

    const populateDropdown = async () => {
        const stateDropdown = document.getElementById('stateDropdown');
        const activityDropdown = document.getElementById('activityDropdown');
        const parkDropdown = document.getElementById('parkDropdown');
        const userPark = document.getElementById('userPark');
        if (stateDropdown === null) {
            return;
        }

        // Populate the dropdown with state options
        states.forEach(state => {
            if (!addedStates.includes(state.code)) {
                const option = document.createElement('option');
                option.value = state.code;
                option.textContent = state.name;
                stateDropdown.appendChild(option);
                addedStates.push(state.code);
            }
        });
        activities.forEach(activity => {
            if (!addedActivities.includes(activity)) {
                const option = document.createElement('option');
                option.value = activity;
                option.textContent = activity;
                activityDropdown.appendChild(option);
                addedActivities.push(activity);
            }
        });

        
    }
    populateDropdown();

    function checkDropdowns() {
        const stateDropdown = document.getElementById('stateDropdown');
        const activityDropdown = document.getElementById('activityDropdown');

        if (stateDropdown === null) {
            return;
        }

        parkState = stateDropdown.value;
        parkActivity = activityDropdown.value;


    }

    

    const fetchParks = async () => {
        
        checkDropdowns();
        let parkString = apiUrl + "parks?api_key=" + apiKey + "&limit=500&q=" + queryValue;

        try {
            const response = await fetch(
                parkString
            );
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setParks(data.data);
        } catch (error) {
            console.error('Error fetching park data:', error);
        }
       

        
    };
    useEffect(() => {

        fetchParks();
        filterParks();
        
        
    }, []);

    let parkSort = parkSearch;
    

    const filterParks = () => {
        checkDropdowns();
        const activityDropdown = document.getElementById('activityDropdown');
        if (activityDropdown === null) {
            return;
        }
        if (parkActivity !== '' && parkActivity !== 'Activities') {

            parkSort = parkSearch.filter(park => park.activities.some(activity => activity.name === parkActivity));

        }

        if (parkChoice !== '' && parkChoice !== 'Park') {
            parkSort = parkSort.filter(park => park.name === parkChoice);
        }
        if (parkState !== '' && parkState !== 'State') {

            parkSort = parkSort.filter(park => park.addresses.some(address => address.stateCode === parkState));

        }
    }
    

    const searchEnterHandler = () => {
        const search = {
            user: searchInput
        }

        setSearchInput("");
        navigate(`/search?query=${searchInput}`);
        queryValue = searchInput;
        
        fetchParks();
        filterParks();
        
    }

    const userSearchHandler = () => {
        const search = {
            user: searchInput
        }
        setSearchInput("");
        navigate(`/search?query=${search}`);
        window.history.pushState(null, "", `/search?query=${search}`);

    }


    // gradient background styling for parks headers
    // TODO : coalesce this function to central location
    const gradientBackground = (image) => {
        return {
        "background": `linear-gradient(rgba(0, 0, 0, .2), rgba(0, 0, 0, .7)),
        url('${image}') no-repeat center / cover`
        }
    }

    const [showPopup, setShowPopup] = useState(false);

    function togglePopup() {
        setShowPopup(!showPopup);
    }

    // Get a reference to the select element
    filterParks();
    return (
        <>
            <div className = "position-fixed bottom-0 start-0 m-4 parkour-btn popup-icon red-bg  rounded-circle" 
            onClick = {togglePopup}>
                <h2>?</h2>
            </div>
            <div className = {`${showPopup ? "show" : ""} position-fixed bottom-0 start-0 m-4 red-bg white popup p-2`} onClick = {togglePopup}>
                <b>Recommended search term: "Yosemite"</b>
                <br/>
                <br/>
                <h3>Search Disclaimer:</h3> 
                <br/>
                The search functionality for Parkour was implemented by a teammate and is currently imperfect. The teammate implemented search so that it reads in all users and parks and filters the results in the frontend. This is an obviously flawed approach that lacks scalability. There are additional issues with poor filtering and incorrect result persistence. To be fixed!
                <br/>
            </div>
            <div class="mainPane">
                <div className="position-relative pe-3">
                    <div className="position-relative">
                        <AiOutlineSearch className="fs-3 ms-3 position-absolute top-50 start-1 translate-middle-y" />
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
                    <div className="row my-2">

                        <div class="dropdown col-6">
                            <select class="form-select btn btn-success" style={{ "background-color": "darkolivegreen" }} id="stateDropdown">
                                <option selected>State</option>

                            </select>
                        </div>
      

                        <div class="dropdown col-6">
                            <select class="form-select btn btn-success" style={{ "background-color": "darkolivegreen" }} id="activityDropdown">
                                <option selected>Activities</option>

                            </select>
                        </div>
                    </div>

                </div>
                    
                <ul className = "list-group">
                    {parkSort.length == 0 && 
                    <div className = "brown-4 m-2">
                        Sorry, no park results found. Please try a different search term!
                    </div>}
                    {parkSort.map((park) => (
                        <li className = "list-group-item subPane p-0 addPadding" key={park.id}>
                            <div style = {park.images[0] && gradientBackground(park.images[0].url)}>
                                <h2><a href={`/#/details?name=${encodeURIComponent(park.name)}`} className="details-link result-title white ms-1 me-1" >{park.fullName}</a></h2>
                            </div>
                                
                            <div>
                                <p><a className = "green1" href={park.url}>{park.url}</a></p>
                                <p>{park.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
                {/*<MainResults />*/}
            </div>
            <div className = "d-block d-lg-none">
                <UserResults/>
            </div>
        </>
    )
}

export default Search