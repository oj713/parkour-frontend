import { createAsyncThunk } from "@reduxjs/toolkit";
import * as userService from "./users-services";



export const fetchUsers = async (params) => {
    try {
        const users = await userService.getUsers(params);
        return users;
    } catch (error) {
        throw error;
    }
};

export const findUserByUsernameThunk = createAsyncThunk(
    "users/findUserByUsername",
    async () => await userService.findUserByUsername()
);

export const findUsersByDisplayNameThunk = createAsyncThunk(
    "users/findUsersByDisplayName",
    async () => await userService.findUsersByDisplayName()
);

export const findRangersByParkThunk = createAsyncThunk(
    "users/findRangersByPark",
    async (parkId) => await userService.findRangersByPark(parkId)
);