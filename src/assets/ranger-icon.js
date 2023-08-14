import React from "react";
import {FaHardHat} from "react-icons/fa";

// parkInfo = {name: Yosemite, handle: yosemite}

const RangerIcon = (
    {parkInfo = null}
) => {
    const PithIcon = {
        "position": "relative",
        "bottom":".35em",
        "left": ".1em"
    }
    if (parkInfo) {
        return (
            <a href = {`/#/profile/${parkInfo.handle}`}
            className = "green-btn parkour-btn btn">
                <FaHardHat className = "white up-2 me-1"/>
                {parkInfo.name}
            </a>
        )
    } else {
        return (
        <span className = "roundIconFrame green1-bg">
            <FaHardHat className = "white" style = {PithIcon}/>
        </span>
        )
    }
}

export default RangerIcon;