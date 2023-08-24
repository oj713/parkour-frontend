import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import results from "./userResults.json"
import SearchResult from "./userSearchResult"
import { findUsersByDisplayname, findUserByUsername, findRangersByPark } from '../services/users-services';
import axios from 'axios';

const UserResults = () => {
    const { pathname, search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const queryValue = queryParams.get("query");
    const apiUrl = 'https://developer.nps.gov/api/v1/'
   // const users = results.filter(user => user.userName == queryValue);
    let usersRole = '';
    let usersPark = '';
    

    const [users, setUsers] = useState([]);
    let filtered = users;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUsers = async (params) => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`${apiUrl}/users`, { params });
            setUsers(response.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);



    function checkDropdowns() {
        const userRoles = document.getElementById('userRoles');
        const userPark = document.getElementById('userPark');

        if (userRoles === null) {
            return;
        }

        usersRole = userRoles.value;
        usersPark = userPark.value;
    }

    function filterResults() {
        checkDropdowns();
        const userRoles = document.getElementById('userRoles');
        if (userRoles === null) {
            return
        }
        if (usersRole !== '' && usersRole !== 'Role') {
            filtered = filtered.filter(user => user.role.type === usersRole)
        }
        if (usersPark !== '' && usersPark !== 'Park') {
            filtered = filtered.filter(user => user.rangerStation.type.name === usersPark)
        }
    }

    return (
        <ul class="list-group">
            {users.map(user => (
                <div key={user._id}>
                    <p>Username: {user.username}</p>
                    <p>Display Name: {user.displayName}</p>
                    {/* Display other user properties */}
                </div>
            ))}
        </ul>
    )
}

export default UserResults;