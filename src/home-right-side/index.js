import React from "react";
import followlist from './whoToFollow.json';
import factlist from "./funFact.json";
import FollowUser from "./followUser";
import FunFacts from "./funFact.js";
import { useSelector } from "react-redux";


const RightSide = () => {

    const { currentUser } = useSelector(state => state.auth);
    return (
        <ul class="list-group">
            {currentUser &&
                <li>
                    <h4>Who to follow </h4>
                    {followlist.map(post => <FollowUser post={post} />)}
                </li>
            }
            <li>
                <h4>Fun Facts </h4>
                {factlist.map(post => <FunFacts post={post} />)}
            </li>
        </ul>
    )
}

export default RightSide;