import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const PARKS_URL = `${API_BASE}`;
const NPS_API_KEY = process.env.NPS_API_KEY;
const NPS_API_BASE = process.env.NPS_API_URL;

const api = axios.create({ withCredentials: true });

export const findPosts = async () => {
    const response = await api.get(`${PARKS_URL}`);
    const posts = response.data;
    return posts;
}

export const findParks = async (query) => {
    const response = await api.get(`${NPS_API_BASE}?api_key=${NPS_API_KEY}&query=${query}`);
    const parks = response.data;
    return parks;
}



