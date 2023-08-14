import React from "react";
import {ReactComponent as ParkourLogo} from "./Logo/parkour-logo.svg";


const ParkIcon = () => {
    const TreeIcon = {
        "height": "1.3em",
        "position": "relative",
        "bottom": ".25em"
    }
    return (
    <span className = "roundIconFrame orange1-bg">
        <ParkourLogo className = "white" style = {TreeIcon}/>
    </span>
    )
}

export default ParkIcon;