import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {instance} from "../../../utils/axios";

const initialState = {
    comments: [],
    loading: false,
};

export const createComment = createAsyncThunk("comments/createComment", async ({postId, comment}) => {
    try {
        const {data} = await instance.post(`/comments/${postId}`, {postId, comment});
        return data;
    } catch (error) {
        console.log(error);
    }
});

export const getPostComments = createAsyncThunk("comment/getPostComments", async (postId) => {
    try {
        const {data} = await instance.get(`/posts/comments/${postId}`);
        return data;
    } catch (error) {
        console.log(error);
    }
})

export const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers: {
        // Create post
        [createComment.pending]: (state) => {
            state.loading = true;
        },
        [createComment.fulfilled]: (state, action) => {
            state.loading = false;
            state.comments.push(action.payload)
        },
        [createComment.rejected]: (state) => {
            state.loading = false;
        },
        // Get post comments
        [getPostComments.pending]: (state) => {
            state.loading = true;
        },
        [getPostComments.fulfilled]: (state, action) => {
            state.loading = false;
            state.comments = action.payload
        },
        [getPostComments.rejected]: (state) => {
            state.loading = false;
        },
    },
});

export const commentsReducer = commentsSlice.reducer;