import axios from "axios";
const API_BASE = 'Parkour Posts';
const PARKS_URL = `${API_BASE}`;

const api = axios.create({ withCredentials: true });

export const findPostsByParkName = async ({ park }) => {
    const response = await api.get(`${PARKS_URL}`, { park });
    const post = response.data;
    return post;
}

export const findPostsByState = async ({ state }) => {
    const response = await api.get(`${PARKS_URL}`, { state });
    const post = response.data;
    return post;
}

export const findPostsByRegion = async ({ region }) => {
    const response = await api.get(`${PARKS_URL}`, { region });
    const post = response.data;
    return post;
}

export const findPostsByFeature = async ({ feature }) => {
    const response = await api.get(`${PARKS_URL}`, { feature });
    const post = response.data;
    return post;
}

