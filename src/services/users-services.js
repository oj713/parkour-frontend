import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const USERS_URL = `${API_BASE}/users`;
const RANGERS_URL = `${API_BASE}/rangers`;

const api = axios.create({ withCredentials: true });


export const getUsers = async (params) => {
    try {
        const response = await axios.get(`${API_BASE}/users`, { params });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const findUserByUsername = async  username  => {
    const response = await api.get(`${USERS_URL}?username=${username}`);
    const user = response.data;
    return user;
}

export const findRangersByPark = async parkId => {
    const response = await api.get(`${RANGERS_URL}?rangerStation=${parkId}`);
    const users = response.data;
    return users;
}

export const findUsersByDisplayName = async displayName => {
    const response = await api.get(`${USERS_URL}?displayName=${displayName}`);
    const users = response.data;
    return users;
}

export const findParksHeaders = async id => {
    const response = await api.get(`${API_BASE}/parksheaders`)
    const parksHeaders = response.data;
    return parksHeaders;
}

export const findParkById = async id => {
    const response = await api.get(`${API_BASE}/parks/${id}`)
    const park = response.data;
    return park;
}

export const findUserById = async id => {
    const response = await api.get(`${API_BASE}/users/${id}`)
    const user = response.data;
    return user;
}
