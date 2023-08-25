import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import SearchResult from "./userSearchResult"
import { fetchUsers, findRangersByParkThunk } from '../services/users-thunks';



const UserResults = () => {
    const { pathname, search } = useLocation();
    const dispatch = useDispatch();
    const queryParams = new URLSearchParams(search);
    const queryValue = queryParams.get("query");
    

    const [users, setUsers] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [parkId, setParkId] = useState([]);
    const [rangers, setRangers] = useState([]);
    const [filtRang, setFiltRang] = useState([]);
    const [loading, setLoading] = useState(true);

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

        const doFilters = async () => {
            await getUsersData();
            setFiltered(users.filter(user => user.username === queryValue || user.displayName === queryValue));
            
        };

        const fetchRangersForPark = async () => {
            try {
                await doFilters();
                const fetchedRangers = await dispatch(findRangersByParkThunk(parkId));
                setRangers(fetchedRangers.payload);
            } catch (error) {
                console.error('Error fetching rangers:', error);
            }
        };

        const realParkId = async () => {
            await getUsersData();
            const parkUser = users.find(user => user.username === queryValue || user.displayName === queryValue);
            if (parkUser) {
                setParkId(parkUser._id);
            }
            console.log(parkId)
        }

        const filterRangers = async () => {
            await fetchRangersForPark();
            
            setFiltRang(rangers.filter(rang => rang.parkId === parkId))
        }

        doFilters()
        realParkId()

        if (parkId) {
                console.log(parkId)
            fetchRangersForPark();
            console.log(parkId)
                filterRangers();
            }
        
    }, [queryValue], parkId);

    

    if (loading) {
        return <div>Loading...</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }
    
    return (
        <div>
            <ul>
                {filtered.map(post => <SearchResult
                    key={post._id}
                    post={post} />)}
                {filtRang.map(post => <SearchResult
                    key={post._id}
                    post={post} />)}

            </ul>
        </div>
    );
}

export default UserResults;