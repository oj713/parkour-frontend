import ProfileHeader from './profile-header';
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { updateUserThunk, profileThunk, logoutThunk } from "../services/auth-thunks";

const EditProfileScreen = ({finishEditing}) => {
    const { currentUser } = useSelector((state) => state.auth);
    const [profile, setProfile] = useState(currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const save = async () => { 
        finishEditing()
        await dispatch(updateUserThunk(profile))
    };
    useEffect(() => {
        const loadProfile = async () => {
            const { payload } = await dispatch(profileThunk());
            setProfile(payload);
        };
        loadProfile();
    }, []);
    return (
        <div className = "m-2 mt-0 green2">
            <h2 className = "white">Edit Profile</h2>
            {profile && (<div>
                <div>
                    <label>Profile Name</label>
                    <input className="form-control w-50" type="text" value={profile.displayName}
                        onChange={(event) => {
                            const newProfile = {
                                ...profile, displayName: event.target.value,
                            };
                            setProfile(newProfile);
                        }} />
                </div>
                <div className = "my-2">
                    <label>Biography</label>
                    <input className="form-control w-50" type="text" value={profile.profileBio}
                        onChange={(event) => {
                            const newProfile = {
                                ...profile, profileBio: event.target.value,
                            };
                            setProfile(newProfile);
                        }} />
                </div>
            </div>
            )}
            <button className="m-2 btn parkour-btn orange-btn ms-0"
                onClick={() => {
                    if(window.confirm("Are you sure you want to log out?")) {
                        dispatch(logoutThunk());
                        navigate("/login");
                    }
                }}>                   Logout</button>
            <button className="m-2 btn parkour-btn orange-btn ms-0" onClick={save}>Save  </button>
        </div>
    );
};
export default EditProfileScreen;