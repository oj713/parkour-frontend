import React from 'react';
import {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import PostsList from '../postsList'
import NavTabs from '../assets/navigation-tabs'
import { Route, Routes } from 'react-router-dom'
import {findPostsByUserId, findPostsByParkId} from '../services/posts-service'
import { findParkById } from '../services/users-services';

const ProfileBottomHalf = ({user}) => {
  let {currentUser} = useSelector(state => state.auth)

  let roleTabs = []
  switch (user.role) {
    case "parks":
      roleTabs = [{ "name": "Board", "link": "" }, { "name": "Rangers", "link": "rangers" }]
      break
    case "rangers":
      roleTabs = [{ "name": "Posts", "link": "" }]
      break;
    default:
      roleTabs = [{ "name": "Posts", "link": "" }, {"name": "Likes", "link": "likes"}, { "name": "Following", "link": "following" }]
      break;
  }
  const subtabs = [
    ...roleTabs,
    { "name": "Followers", "link": "followers" }]
    
  // is hiker OR is ranger's park
  const canPostToBoard = currentUser && 
    (currentUser.role === "hikers" || 
    (currentUser.role === "rangers" && currentUser.parkId === user._id))

  // if own profile. parks don't have a posts tab
  const canPostToPosts = currentUser && currentUser._id === user._id

  return (
    <div>
      <NavTabs tabs={subtabs} />
        <Routes>
          <Route path="/" element={
            user.role === "parks" ? 
            <PostsList postFunction = {async () => {return await findPostsByParkId(user._id)}}
              createPost = {{render: canPostToBoard, parkInfo: user}}
              parkInfo = {user} showParkHeaders = {false}/> 
              :
            <PostsList postFunction = {async () => {return await findPostsByUserId(user._id)}}
              createPost = {{render: canPostToPosts, 
                parkInfo: currentUser && currentUser.role === "rangers" ?
                    {_id: currentUser.parkId} : null}}
                userInfo = {user} showParkHeaders = {true}/> 
          } />
          <Route path="/rangers" element={<h1>Rangers</h1>} />
          <Route path="/following" element={<h1>Following</h1>} />
          <Route path="/followers" element={<h1>Followers</h1>} />
        </Routes>
      </div>
    )
}

export default ProfileBottomHalf;