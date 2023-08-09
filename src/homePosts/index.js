import React from "react";
import temppostslist from './park-posts.json';
import ParkPost from "./ParkPost";


const HomePosts = () => {
    const posts = temppostslist;
    return (
        <ul class="list-group">
            {posts.map(post => <ParkPost post={post} />)}
        </ul>
    )
}

export default HomePosts;