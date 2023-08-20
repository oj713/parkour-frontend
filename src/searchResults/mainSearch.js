import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import SearchResult from "./searchResult"
import ParkourPost from "../postsList/ParkourPost"
import results from "../postsList/posts-list-temp.json";
import { findPostsThunk } from "../services/search-thunks.js"





const MainResults = () => {
    const { pathname, search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const queryValue = queryParams.get("query");
    const posts = results.filter(post => post.park.name == queryValue);
    //const parkdata = parks.filter(post => post.parkCode == "abli");
    //const { posts, loading } = useSelector(state => state.posts)
    const dispatch = useDispatch();
    useEffect(() => {
        switch(queryValue){
            case "this":
        
        }
        dispatch(findPostsThunk)
    }, [])



    return (
        <ul class="list-group">
            {/*{posts.map((post, index) => (*/}
            {/*    // Example: Render only posts with the category 'technology'*/}
            {/*    {*/}
            {/*        post.title === 'Result Title' && (*/}
            {/*            <div key={index} className="post">*/}
            {/*                <SearchResult post={post} />*/}
            {/*            </div>*/}
            {/*        )*/}
            {/*    }*/}
            {/*)},*/}
            {/*{parks.map(post => <SearchResult post={post} />)}*/}
            {posts.map(post => <ParkourPost post={post} />)}
        </ul>
    )
}

export default MainResults;