import React from "react";
import temppostslist from './posts-list-temp.json' 
import ParkourPost from "./ParkourPost";


const PostsList = ({posts = temppostslist, showParkHeaders = true}) => {
    return (
        <ul class = "list-group">
            {posts.map(post => 
            <ParkourPost post={post} showParkHeaders = {showParkHeaders}/>)}
        </ul>
    )
}

export default PostsList;
