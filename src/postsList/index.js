import React, {useState, useEffect} from "react";
import ParkourPost from "./ParkourPost";
import { findPosts, findPostsByUserId } from "../services/posts-service";
import CreatePostComponent from './create-post.js';

/* Generates a list of posts
    postFunction: function to find posts. Function must be derived from 
        posts-service.js. No arguments, returns an async function that outputs a list of posts.
    parkInfo: park object. Pass in if all posts are from the same park (e.g. Profile Board, search results)
    userInfo: user object. Pass in if all posts are from the same user (e.g. Profile)
    showParkHeaders: boolean. If true, shows park headers. If false, hides park headers. 
        Best practice to always show except for Profile Board. 
*/

const PostsList = ({postFunction = findPosts, 
    createPost = {render: false, parkInfo: null},
    parkInfo = null, userInfo = null, showParkHeaders = true}) => {

    let [posts, setPosts] = useState([]);
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState(null);

    const handlePostDelete = id => {
        setPosts(posts.filter(post => post._id !== id))
    }

    const handlePostCreate = post => {
        setPosts([...posts, post])
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
        <>
        {createPost.render && <CreatePostComponent parkInfo = {createPost.parkInfo}
            onCreate = {handlePostCreate}/> }
        <ul className = "list-group">
            {posts.length > 0 ? 
            posts.slice(0).reverse().map(post => 
            <ParkourPost key = {post._id} postInfo={post} parkInfo = {parkInfo} 
                userInfo = {userInfo} showParkHeaders = {showParkHeaders}
                onDelete = {handlePostDelete}/>)
            : 
            <div class="brown-4 m-3"><h3>Nothing yet!</h3></div>
            }
        </ul>
        </>
    )
}

export default PostsList;
