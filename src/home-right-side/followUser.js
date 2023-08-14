import React from "react";
import { RxCross2 } from "react-icons/rx";
import RangerIcon from "../assets/ranger-icon";
import LocationTag from "../assets/location-tag";
import { IoFootstepsSharp } from "react-icons/io5";
import { ReactComponent as ParkourLogo } from "../assets/Logo/parkour-logo.svg";
import { ReactComponent as ParkourLogoOutline } from "../assets/Logo/parkour-logo-outline.svg";

const FollowUser = (
    { post = {
        "_id": 123,
        "userName": "Name",
        "handle": "@hiker",
        "profileimage": "https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX3360859.jpg"} }
) => {

    return (
        <li className="list-group-item subPane">
            <div className="flex-wrap whitespace-nowrap">
                <div className="pe-2">
                    
                    <img className="rounded-circle" height={48} width={48} src={post.profileimage} />
                </div>
                <div className="flex-1 up-2">
                    <div>
                        
                        <h3>{post.userName}</h3>

                    </div>
                    <div className="up-2">
                        
                        {post.handle}</div>
                </div>
                <div>
                    
                </div>
            </div>

        </li>
    )
}

export default FollowUser;