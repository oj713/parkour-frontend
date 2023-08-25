import React from 'react';
import {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import PostsList from '../postsList'
import NavTabs from '../assets/navigation-tabs'
import { Route, Routes } from 'react-router-dom'
import {findPostsByUserId, findPostsByParkId} from '../services/posts-service'
import { findParkById } from '../services/users-services';
import { findPostsByIds } from '../services/posts-service';
import { findRangersByPark, findUsersByIds, findUserById } from '../services/users-services';
import SearchResult from '../searchResults/userSearchResult';

const ProfileBottomHalf = ({user}) => {
  let {currentUser} = useSelector(state => state.auth)

  let roleTabs = []
  switch (user.role) {
    case "parks":
      roleTabs = [{ "name": "Board", "link": "" }, { "name": "Rangers", "link": "rangers" }]
      break
    case "rangers":
      roleTabs = [{ "name": "Posts", "link": "" }, { "name": "Likes", "link": "likes" }]
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

  let [rangerParkInfo, setRangerParkInfo] = useState(null)
  let [rangersList, setRangersList] = useState([])
  let [followingList, setFollowingList] = useState([])
  let [followersList, setFollowersList] = useState([])

  useEffect(() => {
    if (currentUser && currentUser.role === "rangers") {
      findParkById(currentUser.parkId).then(response => {
        setRangerParkInfo(response)
      })
  }}, [currentUser])

  useEffect(() => {
    if (user.role === "parks") {
      findRangersByPark(user._id).then(response => {
        setRangersList(response)
      })
    }
    if (user.role === "hikers") {
      let followingIds = user.following.map(following => following.item)
      console.log("followingIds: ", followingIds)
      findUsersByIds(followingIds).then(response => {
        setFollowingList(response)
      })
    }
    findUsersByIds(user.followers).then(response => {
      setFollowersList(response)
    })
  }, [user])

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
                parkInfo: rangerParkInfo}}
                userInfo = {user} showParkHeaders = {true}/> 
          } />
          <Route path="/likes" element={
            <PostsList postFunction = {async () => {return await findPostsByIds(user.likedPosts)}}
            createPost = {{render: false, parkInfo: null}} showParkHeaders = {true}/>
          } />
          <Route path="/rangers" element={
            <ul class = "list-group">
              {rangersList.map(ranger => 
                <SearchResult key={ranger._id} post={ranger}/>)}
            </ul>
          } />
          <Route path="/following" element={
            <ul class = "list-group">
              {followingList.map(following =>
                <SearchResult key={following._id} post={following}/>)}
            </ul>
          } />
          <Route path="/followers" element={
            <ul class = "list-group">
              {followersList.map(follower =>
                <SearchResult key={follower._id} post={follower}/>)}
            </ul>
          } />
        </Routes>
      </div>
    )
}

export default ProfileBottomHalf;