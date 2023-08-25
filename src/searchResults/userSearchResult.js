import React from "react";
import { RxCross2 } from "react-icons/rx";
import RangerIcon from "../assets/ranger-icon";
import LocationTag from "../assets/location-tag";
import { IoFootstepsSharp } from "react-icons/io5";
import { ReactComponent as ParkourLogo } from "../assets/Logo/parkour-logo.svg";
import { ReactComponent as ParkourLogoOutline } from "../assets/Logo/parkour-logo-outline.svg";
import ParkIcon from "../assets/park-icon";

const SearchResult = (
    { post = {
        "_id": 123,
        "location": "High Ridge Trail",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed egestas feugiat massa id pellentesque. Nulla semper neque id urna hendrerit, sit amet luctus eros vehicula.",
        "attachment": "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFya3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
    } }
) => {
    const gradientBackground = (image) => {
        return {
        "background": `linear-gradient(rgba(0, 0, 0, .1), rgba(0, 0, 0, .6)),
        url('${image}') no-repeat center / cover`
        }
    }

    const isRanger = post.role === "rangers"
    const isPark = post.role === "parks"

    return (
        <li className="list-group-item subPane"
            style = {isPark ? gradientBackground(post.profileImage) : {"paddingBottom":"0"}}>
            <div className = "d-flex flex-wrap text-nowrap">
                {!isPark && //user.role !== "parks" &&
                <div className = "d-flex flex-wrap align-items-center">
                    <div className = "pe-2 mb-2 text-center">
                        <img className="rounded-circle object-fit-cover" height={48} width = {48} src={post.profileImage}/>
                    </div>
                    <a href = {`#/profile/${post.username}`}>
                        <div className = "up-2 green2">
                            <div>
                                <h3>{post.displayName}</h3> 
                                {isRanger && <RangerIcon/>}
                            </div> 
                            <div className = "up-2">@{post.username}</div>
                        </div>
                    </a>
                </div>
                }
                {isPark &&
                <div className = "white mb-2">
                    <a href = {`#/profile/${post.username}`} className = "white">
                        <h3 className = "ms-2 me-1">{post.displayName}</h3><ParkIcon/>
                    </a>
                </div>
                }
            </div>
        </li>
    )
}

export default SearchResult;