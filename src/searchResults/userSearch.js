import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import results from "./userResults.json"
import SearchResult from "./userSearchResult"
import { fetchUsers } from '../services/users-thunks';
import axios from 'axios';

const UserResults = () => {
    const { pathname, search } = useLocation();
    const dispatch = useDispatch();
    const queryParams = new URLSearchParams(search);
    const queryValue = queryParams.get("query");
    const apiUrl = 'https://developer.nps.gov/api/v1/'
    //const users = results.filter(user => user.userName == queryValue);
    let usersRole = '';
    let usersPark = '';
    

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    //const [error, setError] = useState(null);

    //const fetchUsers = async () => {
    //    console.log(queryValue)
    //    try {
            
    //        dispatch(registerThunk(newUser));
    //        navigate("/profile");
    //    } catch (e) {
    //        alert(e);
    //    }
    //};
    useEffect(() => {
        const getUsersData = async () => {
            try {
                const fetchedUsers = await fetchUsers();
                setUsers(fetchedUsers);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
                setLoading(false);
            }
        };

        getUsersData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }



    //function checkDropdowns() {
    //    const userRoles = document.getElementById('userRoles');
    //    const userPark = document.getElementById('userPark');

    //    if (userRoles === null) {
    //        return;
    //    }

    //    usersRole = userRoles.value;
    //    usersPark = userPark.value;
    //}

    //function filterResults() {
    //    checkDropdowns();
    //    const userRoles = document.getElementById('userRoles');
    //    if (userRoles === null) {
    //        return
    //    }
    //    if (usersRole !== '' && usersRole !== 'Role') {
    //        filtered = filtered.filter(user => user.role.type === usersRole)
    //    }
    //    if (usersPark !== '' && usersPark !== 'Park') {
    //        filtered = filtered.filter(user => user.rangerStation.type.name === usersPark)
    //    }
    //}

    let filtered = users.filter(user => user.username === queryValue || user.displayName === queryValue );

    return (
        <div>
            <ul>
                {filtered.map(post => <SearchResult post={post} />)}
            </ul>
        </div>
    );
}

export default UserResults;