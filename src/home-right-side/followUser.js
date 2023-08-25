import React from "react";
import { Link } from "react-router-dom";

const FollowUser = ({ user }) => {

    return (
        <li className="list-group-item subPane">
            <div className="flex-wrap whitespace-nowrap">
                <div className="pe-2">
                    
                    <img className="rounded-circle" height={48} width={48} src={user.profileImage} />
                </div>
                <div className="flex-1 up-2">
                    <div>
                        
                    <Link style={{ textDecoration: 'none', color: 'inherit' }}
                        to={`/profile/${user.username}`}
                    >
                        <h3>{user.displayName}</h3>
                    </Link>

                    </div>
                    <div className="up-2">
                        
                        @{user.username}</div>
                </div>
                <div>
                    
                </div>
            </div>

        </li>
    )
}

export default FollowUser;