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

        

        // Populate the dropdown with state options
        states.forEach(state => {
            const option = document.createElement('option');
            option.value = state.code;
            option.textContent = state.name;
            stateDropdown.appendChild(option);
            console.log(state.name);
        });
        activities.forEach(activity => {
            const option = document.createElement('option');
            option.value = activity;
            option.textContent = activity;
            activityDropdown.appendChild(option);
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
    window.onload = populateDropdown;

    //useEffect(() => {
    //    // Fetch data based on the queryValue when the component mounts
    //    if (queryValue) {
    //        const search = {
    //            user: queryValue
    //        }
    //        dispatch(findUserByUsernameThunk(search));
    //    }
    //}, [queryValue, dispatch]);
    const fetchParks = async () => {
        const parkDropdown = document.getElementById('parkDropdown');
        checkDropdowns();
        let parkString = apiUrl + "parks?api_key=" + apiKey + "&limit=500&q=" + queryValue;
        if (parkState !== '' && parkState !== 'State') {
            parkString += "&stateCode=" + parkState;
        }
        if (parkActivity !== '' && parkActivity !== 'Activities') {
            parkString += parkActivity;
        }
        try {
            const response = await fetch(
                parkString
            );



            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            //data = await response.json();
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
        //populateDropdown();
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
                                <h2>{park.fullName}</h2>
                                <p>{park.url}</p>
                                <p>{park.description}</p>
                                
                                
                            </li>
                        ))}
                    </ul>
                    <MainResults />
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