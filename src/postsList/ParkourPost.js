import React from "react";
import { RxCross2 } from "react-icons/rx";
import RangerIcon from "../assets/ranger-icon";
import LocationTag from "../assets/location-tag";
import {IoFootstepsSharp} from "react-icons/io5";
import {ReactComponent as ParkourLogo} from "../assets/Logo/parkour-logo.svg";
import {ReactComponent as ParkourLogoOutline} from "../assets/Logo/parkour-logo-outline.svg";

const ParkourPost = (
    {post = {
        "_id": 123,
        "userName": "Name",
        "handle": "@hiker",
        "time": "2h",
        "location": "High Ridge Trail",
        "profileimage": "https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX3360859.jpg",
        "liked": false,
        "likedByPark": true,
        "comments": 37,
        "likes": 23344,
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed egestas feugiat massa id pellentesque. Nulla semper neque id urna hendrerit, sit amet luctus eros vehicula.",
        "attachment": "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFya3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
    }}
) => {
return (
    <li className = "list-group-item subPane">
        <div className = "float-end">
            <button className = "btn m-0 p-0 red">
                <RxCross2 className = "up-2 m-0"/>
            </button>
        </div>
        <div className = "flex-wrap whitespace-nowrap">
            <div className = "pe-2">
                <img className="rounded-circle" height={48} width = {48} src={post.profileimage}/>
            </div>
            <div className = "flex-1 up-2">
                <div>
                    <h3>{post.userName}</h3> 
                    <RangerIcon park = "Yosemite" 
                    handle = "yosemite" isCurrent = {true}/>
                </div> 
                <div className = "up-2">{post.handle} • {post.time}</div>
            </div>
            <div>
                <LocationTag location = {post.location} parkhandle = "yosemite"/>
            </div>
        </div>
        <div className = "p-2">
            {post.content}
            {post.attachment && 
                <img className = "round mt-2" src = {post.attachment} width = "100%"/>}   
        </div>
        <div className = "flex-wrap align-center p-2 pt-0">
            {post.likedByPark && <div><i><ParkourLogo/>Liked by Park</i></div>}
            <div className = "text-align-right flex-1 whitespace-nowrap brown-4">
                <a href = "/post/123/" className = "btn brown-4 ps-4 me-0">
                    <IoFootstepsSharp className = "icon up-2"/>
                    Comments {post.comments}
                </a>
                <button className = "btn brown-4 p-0 me-0">
                    {post.liked ? 
                    <ParkourLogo className = "icon"/> : 
                    <ParkourLogoOutline className = "icon"/>}
                    Likes {post.likes}
                </button>
            </div>
        </div>
    </li>
)
}

export default ParkourPost;