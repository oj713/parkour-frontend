import { createAsyncThunk } from "@reduxjs/toolkit";
import * as searchService from "./search-services";

export const findPostsThunk = createAsyncThunk(
    "posts/findPosts",
    async () => await searchService.findPosts()
);

export const findParksThunk = createAsyncThunk(
    "parks/findParks",
    async () => await searchService.findParks()
);




