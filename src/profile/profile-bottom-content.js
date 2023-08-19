import React, {useState, useEffect} from 'react';
import PostsList from '../postsList'
import NavTabs from '../assets/navigation-tabs'
import { Route, Routes } from 'react-router-dom'
import CreatePostComponent from './create-post.js';
import {findPostsByUserId, findPosts} from '../services/posts-service'
import LocationTag from '../assets/location-tag';

const ProfileBottomHalf = (user) => {
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

  console.log(user)
  
  return (
    <div>
      <NavTabs tabs={subtabs} />
      <CreatePostComponent />

        <Routes>
          <Route path="/" element={
            <PostsList showParkHeaders = {false}/> } />
          <Route path="/:username/posts" element={
            <PostsList //postFunction = {async () => {findPostsByUserId(user._id)}}
              user = {user}
              showParkHeaders = {true}/>} />
          <Route path="/likes" element={<h1>Likes</h1>} />
          <Route path="/rangers" element={<h1>Rangers</h1>} />
          <Route path="/park" element={<h1>Park</h1>} />
          <Route path="/following" element={<h1>Following</h1>} />
          <Route path="/followers" element={<h1>Followers</h1>} />
        </Routes>
      </div>
    )
}

export default ProfileBottomHalf;