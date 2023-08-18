import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import SearchResult from "./searchResult"
import results from "./mainResults.json";
import {findPostByParkNameThunk, findPostByStateThunk, findPostByRegionThunk, findPostByFeatureThunk} from "../services/search-thunks.js"


const MainResults = () => {
    const { pathname, search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const queryValue = queryParams.get("query");
    const posts = results;

    //const { posts, loading } = useSelector(state => state.posts)
    const dispatch = useDispatch();
    useEffect(() => {
        switch(queryValue){
            case "this":
        
        }
        dispatch(findPostByParkNameThunk)
    }, [])
    return (
        <ul class="list-group">
            {posts.map(post => <SearchResult post={post} />)}
        </ul>
    )
}

export default MainResults;