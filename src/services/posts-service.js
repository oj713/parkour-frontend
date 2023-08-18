import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_BASE;
const POSTS_API = `${API_BASE}/posts`

const createPost = async post => {
    const response = await axios.post(POSTS_API, post);
    return response.data;
}

export const findPostsByParkId = async parkId => {
  const response = await axios.get(`${POSTS_API}?parkId=${parkId}`);
  return response.data;
}