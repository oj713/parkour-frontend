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
        }

        const filterRangers = async () => {
            await fetchRangersForPark();
            
            setFiltRang(rangers.filter(rang => rang.parkId === parkId))
        }

        doFilters()
        realParkId()

        if (parkId) {
            fetchRangersForPark();
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
        <div className = "mainPane">
            <h2 className = "green2">Users</h2>
            <ul className = "list-group">
                {filtRang.length == 0 && filtered.length == 0 &&
                <p className = "brown-4"> No users found. </p>}
                {filtered.map(post => (
                    <a key={post._id} href={`/profile/${post.username}`} className="profile-link">
                        <SearchResult post={post} />
                    </a>
                ))}
                
                {filtRang.length > 0 && <h3 className = "brown-4">Ranger Matches</h3>}
                {filtRang.map(post => (
                    <a key={post._id} href={`/profile/${post.username}`} className="profile-link">
                        <SearchResult post={post} />
                    </a>
                ))}

            </ul>
        </div>
    );
}

export default UserResults;