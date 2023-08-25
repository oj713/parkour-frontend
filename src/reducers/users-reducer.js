import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers, findRangersByParkThunk } from '../services/users-thunks';


const initialState = {
    users: [],
    loading: false,
    error: null,
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchUsers.fulfilled]:
            (state, { payload }) => {
                state.loading = false
                state.users = payload
            },
        [fetchUsers.pending]:
            (state) => {
                state.loading = true
                state.users = []
            },
        [fetchUsers.rejected]:
            (state, action) => {
                state.loading = false
                state.error = action.error
            },
        [findRangersByParkThunk.fulfilled]:
            (state, { payload }) => {
                state.loading = false
                state.users = payload
            },
        [findRangersByParkThunk.pending]:
            (state) => {
                state.loading = true
                state.users = []
            },
        [findRangersByParkThunk.rejected]:
            (state, action) => {
                state.loading = false
                state.error = action.error
            },

    }
});

export const selectUsers = (state) => state.users.users;  // Define the selectUsers selector here

export const selectFilteredUsers = (state, queryValue) => {
    return state.users.users.filter(
        (user) =>
            user.username === queryValue || user.displayName === queryValue
    );
};

export const selectLoading = (state) => state.users.loading;
export const selectError = (state) => state.users.error;

export default usersSlice.reducer;
