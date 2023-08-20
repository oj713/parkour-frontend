import React from "react";
import {MdLocationPin} from "react-icons/md";

const ProfileTag = (
    {location, parkhandle}
) => {
    return (
    <a href = "" className = "parkour-btn orange-btn btn">
        <MdLocationPin className = "icon up-2"/>
        {location}
    </a>
    )
}

export default ProfileTag;