import React, {useState, useEffect} from 'react'
import ProfileHead from './profile-header';
import ProfileBottomHalf from './profile-bottom-content';
import {useSelector} from 'react-redux'
import { findUserByUsername } from '../services/users-services';

function Profile({username = null}) {
  let {currentUser} = useSelector(state => state.auth)

  let [user, setUser] = useState()
  let [loading, setLoading] = useState(true)
  let [error, setError] = useState()

  useEffect(() => {
    if (!username) {
      if (!currentUser) {setError("No user logged in.")} 
      else {setUser(currentUser)}
      setLoading(false)
      return
    }
    findUserByUsername(username).then(response => {
      setUser(response)
      setLoading(false)
    }).catch (e => {
      setError(`User @${username} not found`)
      setLoading(false)
    })
   }, [username])

  useEffect(() => {
    if (!username && currentUser) {
      setUser(currentUser)
    }
  }, [currentUser])

  return (
    loading ? <div className = "loading">Loading...</div> : error ? 
    <div className = "subPane mt-4"> Error: {error} <a href="#/">Back to Home</a> </div> : 
    <div className = "row">
      <div className = "mainPane addPadding p-0 overflow-hidden col">
        <ProfileHead user = {user}/>
        <ProfileBottomHalf user = {user}/>
      </div>
      <div className = "d-none d-sm-block col-1 col-lg-3"></div>
    </div>
  )
}

export default Profile