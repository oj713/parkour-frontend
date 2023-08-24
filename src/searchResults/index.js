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

    let [searchInput, setSearchInput] = useState('');
    const [parks, setParks] = useState([]);

    const dispatch = useDispatch();
    

    function populateDropdown() {
        const stateDropdown = document.getElementById('stateDropdown');
        const activityDropdown = document.getElementById('activityDropdown');
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

    function checkDropdowns() {
        const stateDropdown = document.getElementById('stateDropdown');
        const activityDropdown = document.getElementById('activityDropdown');

        parkState = stateDropdown.value;
        parkActivity = activityDropdown.value;
        //parkSearch = parkSearch.filter(park => park.addresses[0].stateCode === parkState);

    }



    // Call the function to populate the dropdown when the window loads
    

    const fetchParks = async () => {
        const parkDropdown = document.getElementById('parkDropdown');
        //populateDropdown();
        checkDropdowns();
        let parkString = apiUrl + "parks?api_key=" + apiKey + "&limit=500&q=" + queryValue;
        if (parkState !== '' && parkState !== 'State') {
            parkString += "&stateCode=" + parkState;
        }

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
        parks.forEach(park => {
            const option = document.createElement('option');
            option.value = park.name;
            option.textContent = park.name;
            
            parkDropdown.appendChild(option);
            
        })

        
    };
    useEffect(() => {

        fetchParks();
        
    }, []);

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
        setSearchInput("");
        navigate(`/search?query=${searchInput}`);
        window.history.pushState(null, "", `/search?query=${searchInput}`);
        queryValue = searchInput;
        
        fetchParks();
        checkDropdowns();
    }

    const userSearchHandler = () => {
        const search = {
            user: searchInput
        }
        setSearchInput("");
        navigate(`/search?query=${searchInput}`);
        window.history.pushState(null, "", `/search?query=${searchInput}`);

    }




    // Get a reference to the select element
    populateDropdown();
    return (

        <div>
            <div class="row">
                <div class="mainPane col-8">

                    <div className="col-11 position-relative">
                        <div className="row">
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
                        </div>
                        <div className="row">

                            <div class="dropdown col-3">
                                <select class="form-select btn btn-success" style={{ "background-color": "darkgreen" }} id="stateDropdown">
                                    <option selected>State</option>

                                </select>
                            </div>

                            <div class="dropdown col-3">
                                <select class="form-select btn btn-success" style={{ "background-color": "darkgreen" }} id="parkDropdown">
                                    <option selected>Park</option>


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
                            <div class="dropdown col-3">
                                <select class="form-select btn btn-success" style={{ "background-color": "darkgreen" }} id="activityDropdown">
                                    <option selected>Activities</option>

                                </select>
                            </div>
                        </div>

                    </div>
                    
                    <ul>
                        {parkSearch.map((park) => (
                            <li key={park.id}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    {park.images[0] && (
                                        <img className="rounded-circle" height={48} width={48} src={park.images[0].url} alt={park.fullName} />
                                    )}
                                    <h2>{park.fullName}</h2>
                                </div>
                                
                                <p><a href={park.url}>{park.url}</a></p>
                                <p>{park.description}</p>
                                
                                
                            </li>
                        ))}
                    </ul>
                    {/*<MainResults />*/}
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