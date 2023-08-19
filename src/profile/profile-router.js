import React, {Route, Routes} from 'react-router-dom'
import Profile from '.'
import {useLocation} from 'react-router-dom'

const ProfileRouter = () => {
    const {pathname} = useLocation()
    let [ignore, profile, username] = pathname.split('/')
    // if profile-bottom-content changes so must this
    if (["posts", "rangers", "park", "following", "followers"].includes(username)) {username = null}

    return (
        <Routes>
            <Route path="/*" element={<Profile username = {null}/>} />
            <Route path={`/${username}/*`} element={<Profile username = {username}/>} />
        </Routes>
    )
}

export default ProfileRouter;