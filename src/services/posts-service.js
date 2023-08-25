import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_BASE;
const POSTS_API = `${API_BASE}/posts`

export const createPost = async post => {
    const response = await axios.post(POSTS_API, post);
    return response.data;
}

export const findPostsByParkId = async parkId => {
  const response = await axios.get(`${POSTS_API}?parkId=${parkId}`);
  return response.data;
}

export const findPostsByUserId = async userId => {
  const response = await axios.get(`${POSTS_API}?userId=${userId}`);
  return response.data;
}

export const findPosts = async () => {
  const response = await axios.get(POSTS_API);
  return response.data;
}

export const updatePost = async post => {
  const response = await axios.put(`${POSTS_API}/${post._id}`, post);
  return response.data;
}

export const deletePost = async postId => {
  const response = await axios.delete(`${POSTS_API}/${postId}`);
  return response.data;
}

export const findPostById = async postId => {
  const response = await axios.get(`${POSTS_API}/${postId}`);
  return response.data;
}

export const findPostsByIds = async postIds => {
  const postPromises = postIds.map(postId => findPostById(postId));
  const posts = await Promise.all(postPromises);
  return posts;
}