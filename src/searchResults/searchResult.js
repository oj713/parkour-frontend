import React from "react";
import { RxCross2 } from "react-icons/rx";
import RangerIcon from "../assets/ranger-icon";
import LocationTag from "../assets/location-tag";
import { IoFootstepsSharp } from "react-icons/io5";
import { ReactComponent as ParkourLogo } from "../assets/Logo/parkour-logo.svg";
import { ReactComponent as ParkourLogoOutline } from "../assets/Logo/parkour-logo-outline.svg";

const SearchResult = (
    { post = {
        "_id": 123,
        "location": "High Ridge Trail",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed egestas feugiat massa id pellentesque. Nulla semper neque id urna hendrerit, sit amet luctus eros vehicula.",
        "attachment": "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFya3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
    } }
) => {
    return (
        <li className="list-group-item subPane">
            <div className="float-end">

            </div>
            <div className="flex-wrap whitespace-nowrap">
                <div className="flex-1 up-2">

                </div>

            </div>
            <div className="p-2">
                <div className="">
                    <div class="badge badge-primary text-wrap" style={{"width": "6rem", "color": "darkgreen"}}>
                        <h3>{post.title} {post.parkCode}</h3>
                    </div>
                    
                    
                {
                        <img className="round mt-2" src={post.attachment} width="20%" />}

                    <div class="badge badge-primary text-wrap" style={{ "width": "24rem", "color": "darkgreen" }}>
                        <h3>{post.description}</h3>
                    </div>
                </div>
            </div>

        </li>
    )
}

export default SearchResult;