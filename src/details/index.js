import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { findPostsByParkId } from '../services/posts-service';
import ParkDetails from './ParkDetails';
import PostsList from '../postsList';
import { findUsersByDisplayName, findUsersByRangerStation } from '../services/users-services';

function Details() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');

  const [parkApi, setParkApi] = useState();
  const [parkDb, setParkDb] = useState();
  const [parkPosts, setParkPosts] = useState([]);
  const [rangers, setRangers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const NPS_API = `${process.env.REACT_APP_NPS_API_BASE}/parks?q=${id}&api_key=${process.env.REACT_APP_NPS_API_KEY}`;

  useEffect(() => {
    axios.get(NPS_API)
      .then(response => {
        const result = response.data;
        const park = result.data[0];
        setParkApi(park);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (parkApi) {
      findUsersByDisplayName(parkApi.fullName)
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
      findUsersByRangerStation(parkDb._id)
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
              <PostsList posts={parkPosts} parkInfo = {parkDb}/>
            </div>
            <div className='col-3'>
              <div className='mainPane'>
                <h2>Park Rangers</h2>
                {rangers.map(ranger => 
                  <h3>{ranger.displayName}</h3>
                )}
              </div>
            </div>
          </div>
        </>
  );
}

export default Details;
