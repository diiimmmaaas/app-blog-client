import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {instance} from "../../../utils/axios";

const initialState = {
    posts: [],
    popularPosts: [],
    loading: false,
};

export const createPost = createAsyncThunk("posts/createPost", async (params) => {
    try {
        const {data} = await instance.post("/posts", params)
        return data
    } catch (error) {
        console.log(error);
    }
})

export const getAllPosts = createAsyncThunk("posts/getAllPosts", async () => {
    try {
        const {data} = await instance.get("/posts")

        return data
    } catch (error) {
        console.log(error);
    }
})

export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
    try {
        const {data} = await instance.delete(`/posts/${id}`)

        return data
    } catch (error) {
        console.log(error);
    }
})

export const updatePost = createAsyncThunk("posts/updatePost", async (updatedPost) => {
    try {
        const {data} = await instance.put(`/posts/${updatedPost.id}`, updatedPost)

        return data
    } catch (error) {
        console.log(error);
    }
})

export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {

    },
    extraReducers: {
        // Create post
        [createPost.pending] : (state) => {
            state.loading = true
        },
        [createPost.fulfilled] : (state, action) => {
            state.loading = false
            state.posts.push(action.payload)
        },
        [createPost.rejected] : (state) => {
            state.loading = false
        },
        // Get all posts
        [getAllPosts.pending] : (state) => {
            state.loading = true
        },
        [getAllPosts.fulfilled] : (state, action) => {
            state.loading = false
            state.posts = action.payload.posts
            state.popularPosts = action.payload.popularPosts
        },
        [getAllPosts.rejected] : (state) => {
            state.loading = false
        },
        // Delete post
        [deletePost.pending] : (state) => {
            state.loading = true
        },
        [deletePost.fulfilled] : (state, action) => {
            state.loading = false
            state.posts = state.posts.filter( post => post.id !== action.payload.id )
        },
        [deletePost.rejected] : (state) => {
            state.loading = false
        },
        // Update post
        [updatePost.pending] : (state) => {
            state.loading = true
        },
        [updatePost.fulfilled] : (state, action) => {
            state.loading = false
            const index = state.posts.findIndex((post) => post.id === action.payload.id)
            state.posts[index] = action.payload
        },
        [updatePost.rejected] : (state) => {
            state.loading = false
        },
    }
});

export const postReducer = postSlice.reducer;