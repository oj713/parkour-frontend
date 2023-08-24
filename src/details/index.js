import React, { useState, useEffect } from 'react';
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const NPS_API = `${process.env.REACT_APP_NPS_API_BASE}/parks?q=${name}&api_key=${process.env.REACT_APP_NPS_API_KEY}`;

  useEffect(() => {
    axios.get(NPS_API)
      .then(response => {
        const result = response.data;
        const parks = result.data;
        console.log(parks)
        console.log(name);
        const park = parks.filter(park => park.name === name)[0];
        console.log(park);
        if (park) {
          console.log('here')
          setParkApi(park);
        } else {
          setError({message: 'Park not found'});
        }
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (parkApi) {
      findUsersByDisplayName(parkApi.name)
        .then(response => {
          setParkDb(response[0]);
        })
        .catch(error => {
          setError(error);
        })
    }
  }, [parkApi]);

  useEffect(() => {
    if (parkDb) {
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
        })
        .catch(error => {
          setError(error);
        })
    }
  }, [parkDb])


  return (
    loading ? <p>Loading...</p>
      :
      error ? <p>Error: {error.message}</p>
        :
        <>
          <div className='row'>
            <div className='col-8'>
              <ParkDetails park={parkApi} />
              {/* <PostsList posts={parkPosts} parkInfo={parkDb} /> */}
            </div>
            <div className='col-4 mt-2'>
              <div className='row subPane bg-brown2 w-75 '>
                <ParkRangers rangers={rangers} />
              </div>
              <div className='row subPane bg-brown2 w-75'>
                <ParkActivities activities={parkApi.activities} />
              </div>
              <div className='row subPane bg-brown2 w-75'>
                <ParkRelated topics={parkApi.topics} />
              </div>
            </div>
          </div>
        </>
  );
}

export default Details;
