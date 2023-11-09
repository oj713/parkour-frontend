import React, { useState, useEffect } from "react";
import factlist from "./funFact.json";
import FollowUser from "./followUser";
import FunFacts from "./funFact.js";
import { useSelector } from "react-redux";
import { getUsers } from "../services/users-services";
import SearchResult from "../searchResults/userSearchResult.js";


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
        <div className = "m-0 p-0">
            {currentUser && currentUser.role === 'hikers' &&
                <div className="mainPane">
                    <h4 className = "brown-4">Who to follow </h4>
                    {followSuggestions.map(user => <SearchResult post={user} />)}
                </div>
            }
            <div className="mainPane">
                <h4 className = "brown-4">Fun Facts </h4>
                {factlist.map(post => <FunFacts post={post} />)}
            </div>
        </div>
    )
}

export default RightSide;