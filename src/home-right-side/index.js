import React, { useState, useEffect } from "react";
import factlist from "./funFact.json";
import FollowUser from "./followUser";
import FunFacts from "./funFact.js";
import { useSelector } from "react-redux";
import { getUsers } from "../services/users-services";


const RightSide = () => {

    const { currentUser } = useSelector(state => state.auth);
    const [ followSuggestions, setFollowSuggestions ] = useState([]);

    useEffect(() => {
        if (currentUser && currentUser.role === 'hikers') {

            getUsers().then(response => {
                setFollowSuggestions(response.filter(user => 
                    !currentUser.following.some(userFollowing => userFollowing.item === user._id)).slice(0, 3)
                )
            }).catch(error => { alert(error) })
        }
    }, [])
    return (
        
        <ul class="list-group">
            {currentUser && currentUser.role === 'hikers' &&
                <li className="list-group-item bg-brown2 mt-4">
                    <h4>Who to follow </h4>
                    {followSuggestions.map(user => <FollowUser user={user} />)}
                </li>
            }
            <li className="list-group-item bg-brown2 mt-4">
                <h4>Fun Facts </h4>
                {factlist.map(post => <FunFacts post={post} />)}
            </li>
        </ul>
    )
}

export default RightSide;