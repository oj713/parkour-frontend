import { createAsyncThunk } from "@reduxjs/toolkit";
import * as searchService from "./search-services";

export const findPostByParkNameThunk = createAsyncThunk(
    "posts/findPostByParkName",
    async () => await searchService.findPostsByParkName()
);

export const findPostByStateThunk = createAsyncThunk(
    "posts/findPostByState",
    async () => await searchService.findPostsByState()
);

export const findPostByRegionThunk = createAsyncThunk(
    "posts/findPostByRegion",
    async () => await searchService.findPostsByRegion()
);

export const findPostByFeatureThunk = createAsyncThunk(
    "posts/findPostByParkName",
    async () => await searchService.findPostsByFeature()
);


