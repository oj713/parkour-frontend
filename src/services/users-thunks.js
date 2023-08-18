import { createAsyncThunk } from "@reduxjs/toolkit";
import * as userService from "./user-services";


export const findUserByUsernameThunk = createAsyncThunk(
    "users/findUserByUsername",
    async () => await userService.findUserByUsername()
);