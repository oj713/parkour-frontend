import React from 'react'
import ProfileBottomHalf from './profile-bottom-content';

// replace later 
const profileUser = {
  "_id": "456",
  "userName": "Yosemite",
  "handle": "yosemite",
  "profileimage": "https://cdn.aarp.net/content/dam/aarp/travel/destinations/2020/09/1140-yosemite-hero.imgcache.rev.web.1044.600.jpg",
  "role": {"type": "park"}
}

function Profile() {

  return (
    <div>
      <div class = "mainPane">
        <h2>Profile Header: {profileUser.userName}</h2>
        <ProfileBottomHalf/>
      </div>
    </div>
  )
}

export default Profile