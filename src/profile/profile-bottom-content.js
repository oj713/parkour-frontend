import React from 'react';
import PostsList from '../postsList'
import NavTabs from '../assets/navigation-tabs'
import { Route, Routes } from 'react-router-dom'
import temppostslist from '../postsList/posts-list-temp.json';
import CreatePostComponent from './create-post.js';
import LocationTag from '../assets/location-tag';
import ProfileHead from './profile-header';

const profileUser = {
  "_id": "456",
  "userName": "Yosemite",
  "handle": "yosemite",
  "profileimage": "https://cdn.aarp.net/content/dam/aarp/travel/destinations/2020/09/1140-yosemite-hero.imgcache.rev.web.1044.600.jpg",
  "role": { "type": "park" }
}

const ProfileBottomHalf = () => {
  /* These are pretty arbitrary feel free to edit */
  let roleTabs = []
  switch (profileUser.role.type) {
    case "park":
      roleTabs = [{ "name": "Board", "link": "" }, { "name": "Posts", "link": "posts" }, { "name": "Rangers", "link": "rangers" }]
      break
    case "ranger":
      roleTabs = [{ "name": "Posts", "link": "" }, { "name": "Park", "link": "park" }]
      break;
    default:
      roleTabs = [{ "name": "Posts", "link": "" }, { "name": "Likes", "link": "likes" }]
      break;
  }
  const subtabs = [
    ...roleTabs,
    { "name": "Following", "link": "following" }, { "name": "Followers", "link": "followers" }]

  /* probably best to move all the filtering stuff to the database query side of things */
  const posts = temppostslist
  const getPosts = () => {
    return posts.filter(post => post.user._id === profileUser._id)
  }

  return (
    <div>
      <ProfileHead />
      <NavTabs tabs={subtabs} />
      <CreatePostComponent />

      <Routes>
        <Route path="/" element={
          profileUser.role.type === "park" ?
            <PostsList posts={posts.filter(post => post.park._id === profileUser._id)} showParkHeaders={false} /> :
            <PostsList posts={getPosts()} showParkHeaders={true} />} />
        <Route path="/posts" element={
          <PostsList posts={getPosts()} showParkHeaders={false} />
        } />
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