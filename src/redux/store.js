import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./features/auth/authSlice";
import {postReducer} from "./features/post/postSlice";
import {commentsReducer} from "./features/comments/commentSlice";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer,
        comments: commentsReducer
    },
})