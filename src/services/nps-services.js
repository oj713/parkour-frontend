import axios from "axios";

const NPS_API_BASE = process.env.REACT_APP_NPS_API_BASE;
const NPS_API_KEY = process.env.REACT_APP_NPS_API_KEY;


export const findParks = async query => {
    const response = await axios.get(`${NPS_API_BASE}/parks?${query ? `q=${query}&` : '' }api_key=${NPS_API_KEY}`);
    const parks = response.data;
    return parks;
}

export const findNewsreleases = async query => {
    const response = await axios.get(`${NPS_API_BASE}/newsreleases?limit=15&${query ? `q=${query}&` : '' }api_key=${NPS_API_KEY}`);
    const newsletters = response.data;
    return newsletters;
}