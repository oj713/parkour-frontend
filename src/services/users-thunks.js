import { createAsyncThunk } from "@reduxjs/toolkit";
import * as userService from "./users-services";


export const findUserByUsernameThunk = createAsyncThunk(
    "users/findUserByUsername",
    async () => await userService.findUserByUsername()
);