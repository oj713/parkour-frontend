import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const USERS_URL = `${API_BASE}/users`;

const api = axios.create({ withCredentials: true });

export const findUserByUsername = async  username  => {
    const response = await api.get(`${USERS_URL}?username=${username}`);
    const user = response.data;
    return user;
}

export const findUsersByRangerStation = async parkId => {
    const response = await api.get(`${USERS_URL}?rangerStation=${parkId}`);
    const users = response.data;
    return users;
}

export const findUsersByDisplayName = async displayName => {
    const response = await api.get(`${USERS_URL}?displayName=${displayName}`);
    const users = response.data;
    return users;
}

