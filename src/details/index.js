import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { findPostsByParkId } from '../services/posts-service';
import ParkDetails from './ParkDetails';
import PostsList from '../postsList';
import { findUsersByDisplayName, findRangersByPark } from '../services/users-services';
import ParkRangers from './ParkRangers';
import ParkActivities from './ParkActivities';
import ParkRelated from './ParkRelated';

function Details() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get('name');

  const [parkApi, setParkApi] = useState();
  const [parkDb, setParkDb] = useState();
  const [parkPosts, setParkPosts] = useState([]);
  const [rangers, setRangers] = useState([]);
  const [hasParkProfile, setHasParkProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  // doesn't work correctly, search feature is poor
  const NPS_API = `${process.env.REACT_APP_NPS_API_BASE}/parks?q=${name.split(" ")[0]}&api_key=${process.env.REACT_APP_NPS_API_KEY}`;

  let currentUser = useSelector(state => state.auth.currentUser)
  let [canPostToBoard, setCanPostToBoard] = useState(false)

  useEffect(() => {
    axios.get(NPS_API)
      .then(response => {
        const result = response.data;
        const parks = result.data;
        const park = parks.filter(park => park.name === name)[0];
        if (park) {
          setParkApi(park);
        } else {
          setError({message: 'Park not found'});
        }
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  useEffect(() => {
    if (parkApi) {
      findUsersByDisplayName(parkApi.name)
        .then(response => {
          if (response.length == 0) {
            setHasParkProfile(false);
            setLoading(false);
          } else {
            setParkDb(response[0]);
            setHasParkProfile(true);
          }
        })
        .catch(error => {
          setError(error);
        })
    }
  }, [parkApi]);

  useEffect(() => {
    if (parkDb && hasParkProfile) {
      findPostsByParkId(parkDb._id)
        .then(response => {
          setParkPosts(response);
        })
        .catch(error => {
          setError(error);
        })
      findRangersByPark(parkDb._id)
        .then(response => {
          setRangers(response);
          setLoading(false);
        })
        .catch(error => {
          setError(error);
        })
      setCanPostToBoard(currentUser && 
      (currentUser.role === "hikers" || 
      (currentUser.role === "rangers" && currentUser.parkId === parkDb._id)))
    }
  }, [parkDb])


  return (
    loading ? <div className = "loading">Loading...</div>
      :
      error ? <div className = "loading">Error: {error.message} </div>
        :
        <>
          <div className='row'>
            <div className='col'>
              <ParkDetails park={parkApi} username={hasParkProfile ? parkDb.username : null} />
              {hasParkProfile &&
              <PostsList postFunction = {async () => {return parkPosts}}
                createPost = {{render: canPostToBoard, parkInfo: parkDb}}
                parkInfo={parkDb} />
              }
            </div>
            <div className = "d-none d-sm-block col-1 d-lg-none"></div>
            <div className='d-none d-lg-block col-3 ps-0'>
              {hasParkProfile &&
              <div className='mainPane bg-brown2'>
                <ParkRangers rangers={rangers} />
              </div>
              }
              <div className='mainPane bg-brown2'>
                <ParkActivities activities={parkApi.activities} />
              </div>
              <div className='mainPane bg-brown2'>
                <ParkRelated topics={parkApi.topics} />
              </div>
            </div>
          </div>
        </>
  );
}

export default Details;
