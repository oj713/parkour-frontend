import React, {useState, useEffect} from 'react'
import ProfileHead from './profile-header';
import ProfileBottomHalf from './profile-bottom-content';
import {useSelector} from 'react-redux'
import {useLocation} from 'react-router-dom'
import { findUserByUsername } from '../services/users-services';

function Profile({username = null}) {
  let currentUser = useSelector(state => state.auth.currentUser)

  let [user, setUser] = useState()
  let [loading, setLoading] = useState(true)
  let [error, setError] = useState()

  useEffect(() => {
    if (!username) {
      if (!currentUser) {setError("No user logged in.")} else {setUser(currentUser)}
      setUser(currentUser)
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

  return (
    loading ? <h3>Loading...</h3> : error ? 
    <div className = "subPane mt-4"> Error: {error} <a href="#/home">Back to Home</a> </div> : 
    <div>
      <div className = "mainPane">
        <ProfileHead />
        {/* delete this <p> later */ }
        <p> Current profile: {user.username}</p> 
        <ProfileBottomHalf user = {user}/>
      </div>
    </div>
  )
}

export default Profile