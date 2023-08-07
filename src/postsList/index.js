import React from "react";
import temppostslist from './posts-list-temp.json';
import ParkourPost from "./ParkourPost";

const PostsList = () => {
    const posts = temppostslist;
    return (
        <ul class = "list-group">
            {posts.map(post => <ParkourPost post={post} />)}
        </ul>
    )
}

export default PostsList;
