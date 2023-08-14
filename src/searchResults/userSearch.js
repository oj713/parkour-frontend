import React from "react";
import results from "./userResults.json"
import SearchResult from "./userSearchResult"


const UserResults = () => {
    const posts = results;
    return (
        <ul class="list-group">
            {posts.map(post => <SearchResult post={post} />)}
        </ul>
    )
}

export default UserResults;