import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const USERS_URL = `${API_BASE}/users`;

const api = axios.create({ withCredentials: true });

export const login = async ({ username, password }) => {
    const response = await api.post(`${USERS_URL}/login`, { username, password });
    const user = response.data;
    return user;
};

export const logout = async () => {
    const status = await api.post(`${USERS_URL}/logout`);
    return status;
};

export const profile = async () => {
    const response = await api.post(`${USERS_URL}/profile`);
    return response;
};
export const updateUser = async user => {
    const response = await api.put(`${USERS_URL}/${user._id}`, user);
    return response.data;
};

export const register = async newUser => {
    const response = await api.post(`${USERS_URL}`, newUser);
    const user = response.data;
    return user;
}
