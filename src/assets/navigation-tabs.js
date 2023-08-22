import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavTabs = (
    {tabs = [
        {name: "Board", link: null},
        {name: "Rangers 35", link: "rangers"},
        {name: "Following 123", link: "following"},
        {name: "Followers 234", link: "followers"}
    ]}
) => {
    const hrStyle = {
        "border":"2px solid",
        "borderRadius" : "2px",
        "opacity" : "100"
    }
    const {pathname} = useLocation()
    let active = pathname.split("/").pop()
    if (!["posts", "rangers", "park", "following", "followers"].includes(active)) {active = ""}
    return (
        <div>
        <ul className="nav d-flex flex-nowrap overflow-auto nav-pills white">
            {tabs.map(tab => 
                <Link key={tab.name} className={`${active === tab.link ? "active" : ""} btn parkour-btn rounded-pill nav-link`} to={tab.link}>
                    {tab.name}
                </Link>
            )}
        </ul>
        <hr className = "m-2 brown-4" style = {hrStyle}/>
        </div>
    )
}

export default NavTabs;