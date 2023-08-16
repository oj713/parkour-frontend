import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ParkDetails from './ParkDetails';

function Details() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');

  const [park, setPark] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const NPS_API = `https://developer.nps.gov/api/v1/parks?q=${id}&api_key=BW8ajGbeYQYXIIDFzJgC4FdVXhY7zl0ITUTm3V8d`;

  useEffect(() => {
    axios.get(NPS_API)
      .then(response => {
        const result = response.data;
        const park = result.data[0];
        setPark(park);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    loading ? <p>Loading...</p>
      :
      error ? <p>Error: {error.message}</p>
      :
      <ParkDetails park={park} />
  );
}

export default Details;
