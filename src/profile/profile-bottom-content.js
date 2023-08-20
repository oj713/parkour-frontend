import React, {useState, useEffect} from 'react';
import PostsList from '../postsList'
import NavTabs from '../assets/navigation-tabs'
import { Route, Routes } from 'react-router-dom'
import CreatePostComponent from './create-post.js';
import {findPostsByUserId, findPostsByParkId} from '../services/posts-service'
import LocationTag from '../assets/location-tag';

const ProfileBottomHalf = ({user}) => {
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

  console.log(user.role)
  
  return (
    <div>
      <NavTabs tabs={subtabs} />
      <CreatePostComponent />

        <Routes>
          <Route path="/" element={
            user.role === "park" ? 
            <PostsList postFunction = {async () => {return await findPostsByParkId(user._id)}}
            parkInfo = {user} showParkHeaders = {false}/> :
            <PostsList postFunction = {async () => {return await findPostsByUserId(user._id)}}
            userInfo = {user} showParkHeaders = {true}/> 
          } />
          <Route path="/posts" element={
            <PostsList postFunction = {async () => {return await findPostsByUserId(user._id)}}
            userInfo = {user} showParkHeaders = {true}/> } />
          <Route path="/park" element={<h1>Park</h1>} />
          <Route path="/rangers" element={<h1>Rangers</h1>} />
          <Route path="/following" element={<h1>Following</h1>} />
          <Route path="/followers" element={<h1>Followers</h1>} />
        </Routes>
      </div>
    )
}

export default ProfileBottomHalf;