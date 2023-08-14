import React from "react";
import results from "./mainResults.json"
import SearchResult from "./searchResult"


const MainResults = () => {
    const posts = results;
    return (
        <ul class="list-group">
            {posts.map(post => <SearchResult post={post} />)}
        </ul>
    )
}

export default MainResults;