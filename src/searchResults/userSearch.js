import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import results from "./userResults.json"
import SearchResult from "./userSearchResult"


const UserResults = () => {
    const { pathname, search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const queryValue = queryParams.get("query");
    const users = results.filter(user => user.userName == queryValue);
    return (
        <ul class="list-group">
            {users.map(post => <SearchResult post={post} />)}
        </ul>
    )
}

export default UserResults;