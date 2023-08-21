import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import SearchResult from "./searchResult"

import ParkourPost from "../postsList/ParkourPost";
import { findPosts, findPostsByUserId } from "../services/posts-service";
import PostList from "../postsList/";
import { findPostsThunk } from "../services/search-thunks.js"





const MainResults = ({ postFunction = findPosts,
    parkInfo = null, userInfo = null, showParkHeaders = true
}) => {
    const { pathname, search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const queryValue = queryParams.get("query");
    let [posts, setPosts] = useState([]);
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState(null);
    //const filtered = posts.filter(post => post.park.username == queryValue);
    //setPosts(posts.filter(post => post.parkInfo.name == queryValue))
    const handlePostDelete = id => {
        setPosts(posts.filter(post => post._id !== id))
    }

    useEffect(() => {
        postFunction().then(response => {
            setPosts(response);
            setLoading(false);
        })
            .catch(error => {
                setError(error);
                setLoading(false);
            })
    }, [userInfo, parkInfo, postFunction])

    return (
        loading ? <h3>Loading...</h3> : error ? <h3>Error: {error}</h3> :
            <ul className="list-group">
                {posts.map(post =>
                    <ParkourPost key={post._id} postInfo={post} parkInfo={parkInfo}
                        userInfo={userInfo} showParkHeaders={showParkHeaders}
                        onDelete={handlePostDelete} />)}
            </ul>
    )
}
//    const { pathname, search } = useLocation();
//    const queryParams = new URLSearchParams(search);
//    const queryValue = queryParams.get("query");
//    const posts = PostList//.filter(post => post.park.name == queryValue);
//    //const parkdata = parks.filter(post => post.parkCode == "abli");
//    //const { posts, loading } = useSelector(state => state.posts)
//    const dispatch = useDispatch();
//    useEffect(() => {
//        switch(queryValue){
//            case "this":
        
//        }
//        dispatch(findPostsThunk)
//    }, [])


export default MainResults;