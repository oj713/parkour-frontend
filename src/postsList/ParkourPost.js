import React from "react";
import "./index.css";
import { RxCross2 } from "react-icons/rx";
import RangerIcon from "../assets/ranger-icon";
import ParkIcon from "../assets/park-icon";
import LocationTag from "../assets/location-tag";
import {IoFootstepsSharp} from "react-icons/io5";
import {ReactComponent as ParkourLogo} from "../assets/Logo/parkour-logo.svg";
import {ReactComponent as ParkourLogoOutline} from "../assets/Logo/parkour-logo-outline.svg";

// replace later 
const currentUser = {
    "_id": "456",
    "userName": "Yosemite",
    "handle": "yosemite",
    "profileimage": "https://cdn.aarp.net/content/dam/aarp/travel/destinations/2020/09/1140-yosemite-hero.imgcache.rev.web.1044.600.jpg",
    "role": {"type": "park"}
}

// adapted from https://www.slingacademy.com/article/javascript-how-to-convert-date-time-to-time-ago/
const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return interval + 'y';
    }

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + 'm';
    }

    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + 'd';
    }

    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + 'h';
    }

    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + 'm';
    }

    return 'just now';
}
// adapted from https://stackoverflow.com/questions/9461621/format-a-number-as-2-5k-if-a-thousand-or-more-otherwise-900
const formatter = Intl.NumberFormat('en', {notation: "compact"})

const ParkourPost = (
    {post, showParkHeaders}
) => {

const isPark = post.user.role.type === "park";
const isRanger = post.user.role.type === "ranger" && 
    post.user.role.station === post.park._id;

// if current user wrote the post
// if current user is a ranger and the post is in their park but NOT a park post
// if current user is a park and the post is in their park
const canDelete = currentUser._id === post.user._id ||
    (currentUser.role.type === "ranger" && !isPark &&
    currentUser.role.station === post.park._id) ||
    (currentUser.role.type === "park" && 
    currentUser._id === post.park._id)

const showParkHeader = showParkHeaders && !isPark

const gradientBackground = (image) => {
    return {
    "background": `linear-gradient(rgba(0, 0, 0, .1), rgba(0, 0, 0, .6)),
    url('${image}') no-repeat center / cover`
    }
}

const handleDelete = (id) => {
    window.confirm("Are you sure you want to delete this post?")
}

return (
    <li className = "list-group-item subPane p-0">
    {showParkHeader &&
    <div style = {gradientBackground(post.park.profileimage)}>
        <h3 className = "white ms-1 me-1">{post.park.name} National Park</h3>
    </div>
    }
    <div style = {isPark ? gradientBackground(post.user.profileimage) : {"padding-bottom":"0"}}>
        {canDelete &&
        <div className = "float-end">
            <button className = {`btn m-0 p-0 ${isPark ? "white" : "red"}`} onClick = {() => handleDelete(post._id)}>
                <RxCross2 className = "up-2 m-0"/>
            </button>
        </div>
        }
        <div className = "d-flex flex-wrap text-nowrap">
            {post.user.role.type !== "park" &&
            <div className = "d-flex align-items-center flex-grow-1">
                <div className = "pe-2 mb-2">
                    <img className="rounded-circle object-fit-cover" height={48} width = {48} src={post.user.profileimage}/>
                </div>
                <div className = "up-2">
                    <div>
                        <h3>{post.user.userName}</h3> 
                        {isRanger && <RangerIcon/>}
                    </div> 
                    <div className = "up-2">@{post.user.handle} • {timeAgo(post.content.date)}</div>
                </div>
            </div>
            }
            {isPark &&
            <div className = "white flex-grow-1 mb-2">
                <h3 className = "ms-2 me-1">{post.user.userName}</h3><ParkIcon/>
                • {timeAgo(post.content.date)}
            </div>
            }
            {post.content.location && 
            <div>
                <LocationTag location = {post.content.location} parkhandle = {post.park.handle}/>
            </div>
            }
            </div>
        </div>
        <div>
            <div className = "p-2 pt-0">
                {post.content.text}
                {post.content.attachment && 
                    <img className = "round mt-2" src = {post.content.attachment} width = "100%"/>}   
            </div>
            <div className = "d-flex flex-wrap align-items-center ps-2 pe-2 pt-0">
                {post.content.likedByPark && <div><i><ParkourLogo style = {{"height":"1.5em"}}/>Liked by Park</i></div>}
                <div className = "text-end flex-grow-1 text-nowrap brown-4">
                    <a href = "/post/123/" className = "btn brown-4 ps-4 me-0">
                        <IoFootstepsSharp className = "icon up-2"/>
                        Comments {formatter.format(post.content.comments)}
                    </a>
                    <button className = "btn brown-4 p-0 me-0">
                        {post.liked ? 
                        <ParkourLogo className = "icon green2"/> : 
                        <ParkourLogoOutline className = "icon"/>}
                        Likes {formatter.format(post.content.likes)}
                    </button>
                </div>
            </div>
        </div>
    </li>
)
}

export default ParkourPost;