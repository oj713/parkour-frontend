import { createSlice } from "@reduxjs/toolkit";

const templatepost = {}

const postsSlice = createSlice({
    name: 'posts',
    initialState: [],
    reducers: {
        postlikeToggle(state, action) {
            const post = state.find(post => post._id === action.payload._id)
            post.likes = post.liked ? post.likes - 1 : post.likes + 1
            post.liked = !post.liked
        },
        createPost(state, action) {
            state.unshift({
              ...action.payload,
              ...templatepost,
              _id: (new Date()).getTime(),
            })
          },
          deletepost(state, action) {
            const index = state.findIndex(post =>
                  post._id === action.payload);
            state.splice(index, 1);
          }
     }
});

export default postsSlice.reducer;
export const { postlikeToggle, createPost, deletepost } = postsSlice.actions;