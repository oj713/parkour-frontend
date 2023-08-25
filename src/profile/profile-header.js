import ParkIcon from '../assets/park-icon';
import { BiSolidEdit } from 'react-icons/bi';
import React, { useState } from 'react';
import EditProfileScreen from './edit-profile';


const ProfileHead = () => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        // Set the state to indicate that the user is editing
        setIsEditing(true);
    };

    return (
        <div>
            <div className="position-relative mb-2">
                <img
                    src="https://cdn.aarp.net/content/dam/aarp/travel/destinations/2020/09/1140-yosemite-hero.imgcache.rev.web.1044.600.jpg"
                    className="w-100 h-auto"
                    style={{ maxHeight: "150px" }}
                />
                <button
                    onClick={handleEditClick} // Handle the edit button click
                    className="parkour-btn orange-btn btn position-absolute top-0 end-0 z-index-above"
                >
                    <BiSolidEdit /> Edit Park
                </button>
                <div>
                    <h1 className="position-absolute bottom-0 start-0 text-white z-index-above">
                        Yosemite <ParkIcon />
                    </h1>
                </div>
            </div>
            <div className="position-relative" style={{ marginTop: "40px" }}>
                <button className="parkour-btn green-btn btn position-absolute bottom-0 end-0 z-index-above">
                    Follow +
                </button>
                {isEditing && <EditProfileScreen />} {/* Render the edit profile screen when editing */}
            </div>
        </div>
    );
};
export default ProfileHead;