import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "./auth-services";


export const loginThunk = createAsyncThunk(
    "user/login", async credentials => {
        const user = await authService.login(credentials);
        return user;
    }
);
export const profileThunk = createAsyncThunk(
    "auth/profile", async () => {
        const response = await authService.profile();
        return response.data;
    });
export const logoutThunk = createAsyncThunk(
    "auth/logout", async () => {
        const response = await authService.logout();
        console.log(response)
        return response;
    });
export const updateUserThunk = createAsyncThunk(
    "user/updateUser", async user => {
        await authService.updateUser(user);
        return user;
    });

export const registerThunk = createAsyncThunk(
    "user/register", async newUser => {
        const user = await authService.register(newUser);
        return user;
    }
)
