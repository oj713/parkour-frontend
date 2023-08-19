import React, {useState, useEffect} from "react";
import ParkourPost from "./ParkourPost";
import { findPosts, findPostsByUserId } from "../services/posts-service";

/* Generates a list of posts
    postFunction: function to find posts. Function must be derived from 
        posts-service.js. No arguments, returns an async function that outputs a list of posts.
    parkInfo: park object. Pass in if all posts are from the same park (e.g. Profile Board, search results)
    userInfo: user object. Pass in if all posts are from the same user (e.g. Profile)
    showParkHeaders: boolean. If true, shows park headers. If false, hides park headers. 
        Best practice to always show except for Profile Board. 
*/

const PostsList = ({postFunction = findPosts, 
    parkInfo = null, userInfo = null, showParkHeaders = true}) => {

    let [posts, setPosts] = useState([]);
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState(null);

    useEffect(() => {
        postFunction().then(response => {
        //postFunction().then(response => {
            setPosts(response); 
            setLoading(false);
        })
        .catch(error => {
            setError(error);
            setLoading(false);
        })
    }, [])

    return (
        loading ? <h3>Loading...</h3> : error ? <h3>Error: {error}</h3> :
        <ul className = "list-group">
            {posts.map(post => 
            <ParkourPost key = {post._id} post={post} parkInfo = {parkInfo} userInfo = {userInfo} showParkHeaders = {showParkHeaders}/>)}
        </ul>
    )
}

export default PostsList;
