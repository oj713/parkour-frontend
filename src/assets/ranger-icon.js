import React from "react";
import {FaHardHat} from "react-icons/fa";

const RangerIcon = (
    {park, handle, isCurrent}
) => {
    const PithIcon = {
        "position": "relative",
        "bottom":".4em",
        "left": ".1em"
    }
    if (isCurrent) {
        return (
        <span className = "roundIconFrame green1-bg">
            <FaHardHat className = "white" style = {PithIcon}/>
        </span>
        )
    } else {
        return (
            <a href = {`/#/profile/${handle}`}
            className = "green-btn parkour-btn btn">
                <FaHardHat className = "white up-2 me-1"/>
                {park}
            </a>
        )
    }
}

export default RangerIcon;