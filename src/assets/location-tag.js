import React from "react";
import {MdLocationPin} from "react-icons/md";

const LocationTag = (
    {location, parkhandle}
) => {
    return (
    <a href = {null} className = "parkour-btn orange-btn btn">
        <MdLocationPin className = "icon up-2"/>
        {location}
    </a>
    )
}

export default LocationTag;