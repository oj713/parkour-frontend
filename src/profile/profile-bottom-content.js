import React from 'react';
import { useSelector } from 'react-redux';
import PostsList from '../postsList'
import NavTabs from '../assets/navigation-tabs'
import { Route, Routes } from 'react-router-dom'
import {findPostsByUserId, findPostsByParkId} from '../services/posts-service'

const ProfileBottomHalf = ({user}) => {
  let {currentUser} = useSelector(state => state.auth)

  /* These are pretty arbitrary feel free to edit */
  let roleTabs = []
  switch (user.role) {
    case "park":
      roleTabs = [{ "name": "Board", "link": "" }, { "name": "Posts", "link": "posts" }, { "name": "Rangers", "link": "rangers" }]
      break
    case "ranger":
      roleTabs = [{ "name": "Posts", "link": "" }, { "name": "Park", "link": "park" }]
      break;
    default:
      roleTabs = [{ "name": "Posts", "link": "" }]
      break;
  }
  const subtabs = [
    ...roleTabs,
    { "name": "Following", "link": "following" }, { "name": "Followers", "link": "followers" }]
  
  // can post to board if user is logged in, they are posting to a park. Parks can't post outside their own board. 
  const canPostToBoard = currentUser && user.role === "park" && 
  (currentUser.role !== "park" || currentUser._id === user._id)

  const canPostToPosts = currentUser && currentUser._id === user._id

  return (
    <div>
      <NavTabs tabs={subtabs} />
        <Routes>
          <Route path="/" element={
            user.role === "park" ? 
            <PostsList postFunction = {async () => {return await findPostsByParkId(user._id)}}
              createPost = {{render: canPostToBoard, parkInfo: user}}
              parkInfo = {user} showParkHeaders = {false}/> :
            <PostsList postFunction = {async () => {return await findPostsByUserId(user._id)}}
              createPost = {{render: canPostToPosts, parkInfo: null}}
              userInfo = {user} showParkHeaders = {true}/> 
          } />
          <Route path="/posts" element={
            <PostsList postFunction = {async () => {return await findPostsByUserId(user._id)}}
              createPost = {{render: canPostToPosts, parkInfo: user}}
              userInfo = {user} showParkHeaders = {true}/> 
          }/>
          <Route path="/park" element={<h1>Park</h1>} />
          <Route path="/rangers" element={<h1>Rangers</h1>} />
          <Route path="/following" element={<h1>Following</h1>} />
          <Route path="/followers" element={<h1>Followers</h1>} />
        </Routes>
      </div>
    )
}

export default ProfileBottomHalf;