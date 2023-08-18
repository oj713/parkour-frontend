import React, {useState, useEffect} from "react";
import "./index.css";
import { RxCross2 } from "react-icons/rx";
import RangerIcon from "../assets/ranger-icon";
import ParkIcon from "../assets/park-icon";
import LocationTag from "../assets/location-tag";
//import {IoFootstepsSharp} from "react-icons/io5";
import {ReactComponent as ParkourLogo} from "../assets/Logo/parkour-logo.svg";
import {ReactComponent as ParkourLogoOutline} from "../assets/Logo/parkour-logo-outline.svg";
import { findUserHeaderById } from "../services/users-services";


// replace later
const currentUser = {
    "_id": "1",
    "username": "yosemite",
    "password": "123",
    "displayName": "Yosemite",
    "profileImage": "https://cdn.aarp.net/content/dam/aarp/travel/destinations/2020/09/1140-yosemite-hero.imgcache.rev.web.1044.600.jpg",
    "profileBio": "California park with valleys, waterfalls, sequoias, hiking trails & more.",
    "role": "park",
    "followers": [],
    "following": []
}

// // replace 
// const user = { // get this from userId
//     "_id": "2",
//     "username": "hiker",
//     "password": "123",
//     "displayName": "Hiker Name",
//     "profileImage": "https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX3360859.jpg",
//     "profileBio": "Just a normal hiker.",
//     "role": "hiker",
//     "followers": [],
//     "following": []
// }

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
    {post, parkInfo, userInfo, showParkHeaders}
) => {

// gradient background styling for parks headers
const gradientBackground = (image) => {
    return {
    "background": `linear-gradient(rgba(0, 0, 0, .1), rgba(0, 0, 0, .6)),
    url('${image}') no-repeat center / cover`
    }
}

// delete post handler
const handleDelete = (id) => {
    window.confirm("Are you sure you want to delete this post?")
}

// VARIABLES AND RETREIVING INFORMATION --------------------------

const likedByUser = post.likes.includes(currentUser._id)
//const likedByPark = post.likes.includes(park._id) consider replacing backend?

// base information
const [isLoading, setIsLoading] = useState(true)
const [error, setError] = useState()
const [park, setPark] = useState(parkInfo)
const [user, setUser ] = useState(userInfo)

// derived information
const [isPark, setIsPark] = useState()
const [isRanger, setIsRanger] = useState()
const [canDelete, setCanDelete] = useState()

useEffect(() => {
    if (!park) {
        findUserHeaderById(post.parkId)
        .then ( response => {
            setPark(response)
        })
        .catch(error => {
            setError(error)
            setIsLoading(false)
        })
    }
}, [])

useEffect(() => {
    if (!user) {
        findUserHeaderById(post.userId)
        .then ( response => {
            setUser(response)
        })
        .catch(error => {
            setError(error)
            setIsLoading(false)
        })
    }
}, []) 

useEffect(() => {
    if (park && user) {
        console.log(park, "user", user)
        setIsPark(user.role === "park")

        setIsRanger(user.role === "ranger" && 
            user.rangerStation === park._id)

        // if current user wrote the post
        // if current user is a ranger and the post is in their park but NOT a park post
        // if current user is a park and the post is in their park
        setCanDelete(currentUser._id === user._id ||
            (currentUser.role === "ranger" && !isPark &&
            currentUser.rangerStation === park._id) ||
            (currentUser.role === "park" && 
            currentUser._id === park._id))

        setIsLoading(false)
    }
}, [park, user])

return (
isLoading ? <></> : error ? <p> Error: {error} </p> :
<li className = "list-group-item subPane p-0">
    {showParkHeaders && !isPark &&
    <div style = {gradientBackground(park.profileImage)}>
        <h3 className = "white ms-1 me-1">{park.displayName} National Park</h3>
    </div>
    }
    <div style = {isPark ? gradientBackground(user.profileImage) : {"paddingBottom":"0"}}>
        {canDelete &&
        <div className = "float-end">
            <button className = {`btn m-0 p-0 ${isPark ? "white" : "red"}`} onClick = {() => handleDelete(post._id)}>
                <RxCross2 className = "up-2 m-0"/>
            </button>
        </div>
        }
        <div className = "d-flex flex-wrap text-nowrap">
            {user.role !== "park" &&
            <div className = "d-flex align-items-center flex-grow-1">
                <div className = "pe-2 mb-2">
                    <img className="rounded-circle object-fit-cover" height={48} width = {48} src={user.profileImage}/>
                </div>
                <div className = "up-2">
                    <div>
                        <h3>{user.displayName}</h3> 
                        {isRanger && <RangerIcon/>}
                    </div> 
                    <div className = "up-2">@{user.username} • {timeAgo(post.datePosted)}</div>
                </div>
            </div>
            }
            {isPark &&
            <div className = "white flex-grow-1 mb-2">
                <h3 className = "ms-2 me-1">{user.displayName}</h3><ParkIcon/>
                • {timeAgo(post.datePosted)}
            </div>
            }
            {post.location && 
            <div>
                <LocationTag location = {post.location} parkhandle = {park.username}/>
            </div>
            }
            </div>
        </div>
        <div>
            <div className = "p-2 pt-0">
                {post.text}
                {post.attachment && 
                    <img className = "round mt-2" src = {post.attachment} width = "100%"/>}   
            </div>
            <div className = "d-flex flex-wrap align-items-center ps-2 pe-2 pt-0">
                {post.likedByPark && <div><i><ParkourLogo style = {{"height":"1.5em"}}/>Liked by Park</i></div>}
                <div className = "text-end flex-grow-1 text-nowrap brown-4">
                    {/* <a href = "/post/123/" className = "btn brown-4 ps-4 me-0">
                        <IoFootstepsSharp className = "icon up-2"/>
                        Comments {formatter.format(post.content.comments)}
                    </a> */}
                    <button className = "btn brown-4 p-0 me-0">
                        {likedByUser ? 
                        <ParkourLogo className = "icon green2"/> : 
                        <ParkourLogoOutline className = "icon"/>}
                        Likes {formatter.format(post.likes.length)}
                    </button>
                </div>
            </div>
        </div>
    </li>
)
}

export default ParkourPost;