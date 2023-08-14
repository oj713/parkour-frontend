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
        <li className="list-group-item subPane">
            <div>
                
                {post.title}
                
            </div>
            <div>
                {post.info}
            </div>

        </li>
    )
}

export default FunFacts;