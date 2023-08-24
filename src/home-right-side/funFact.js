import React from "react";
import { RxCross2 } from "react-icons/rx";
import RangerIcon from "../assets/ranger-icon";
import LocationTag from "../assets/location-tag";
import { IoFootstepsSharp } from "react-icons/io5";
import { ReactComponent as ParkourLogo } from "../assets/Logo/parkour-logo.svg";
import { ReactComponent as ParkourLogoOutline } from "../assets/Logo/parkour-logo-outline.svg";

const FunFacts = (
    {
        post = {
            "_id": 123,
            "title": "title",
            "info": "info"
        }
    }
) => {
    return (
        <li className="list-group-item bg-brown1 border rounded mt-2">
            <h4>
                
                {post.title}
                
            </h4>
            <div>
                {post.info}
            </div>

        </li>
    )
}

export default FunFacts;