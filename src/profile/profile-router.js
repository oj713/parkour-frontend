import React, {Route, Routes, useLocation} from 'react-router-dom'
import Profile from '.'
import {useSelector } from "react-redux"
import { useNavigate } from "react-router"

const ProfileRouter = () => {
    const navigate = useNavigate();
    const {pathname} = useLocation()
    const { currentUser } = useSelector((state) => state.auth);
    let [ignore, profile, username] = pathname.split('/')
    if (currentUser && username == currentUser.username) {
        navigate("/profile")
    }
    // if profile-bottom-content changes so must this
    if (["posts", "rangers", "likes", "following", "followers"].includes(username)) {username = null}

    return (
        <Routes>
            <Route path="/*" element={<Profile username = {null}/>} />
            <Route path={`/${username}/*`} element={<Profile username = {username}/>} />
        </Routes>
    )
}

export default ProfileRouter;