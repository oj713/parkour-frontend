import { createAsyncThunk } from "@reduxjs/toolkit";
import * as userService from "./users-services";



export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (params) => {
        const users = await userService.getUsers(params);
        return users;
    }
);

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
    async () => await userService.findRangersByPark()
);