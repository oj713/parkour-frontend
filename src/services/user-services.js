import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const USERS_URL = `${API_BASE}/users`;

const api = axios.create({ withCredentials: true });

export const findUserByUsername = async ({ username }) => {
    const response = await api.get(`${USERS_URL}`, { username });
    const user = response.data;
    return user;
}

