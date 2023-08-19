import React, {useState, useEffect} from 'react'
import ProfileHead from './profile-header';
import ProfileBottomHalf from './profile-bottom-content';
import {useSelector} from 'react-redux'
import {useLocation} from 'react-router-dom'
import { findUserByUsername } from '../services/users-services';

function Profile() {
  const {pathname} = useLocation()
  const [ignore, profile, username] = pathname.split('/')
  let currentUser = useSelector(state => state.auth.currentUser)

  let [user, setUser] = useState()
  let [loading, setLoading] = useState(true)
  let [error, setError] = useState()

  useEffect(() => {
    if (!username) {
      setUser(currentUser)
      setLoading(false)
      return
    }
    findUserByUsername(username).then(response => {
      setUser(response)
      setLoading(false)
    }).catch (e => {
      setError(e)
      setLoading(false)
    })
   }, [username])

  return (
    loading ? <h3>Loading...</h3> : error ? <h3> Error: {error} </h3> : 
    <div>
      <div class = "mainPane">
        <ProfileHead />
        <p> Current profile: {user.username}</p>
        <ProfileBottomHalf userInfo = {user}/>
      </div>
    </div>
  )
}

export default Profile