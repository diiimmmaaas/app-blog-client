import React, {useEffect, useState} from "react";
import {instance} from "../utils/axios";
import {PostItem} from "../components/PostItem";

export const MyPostsPage = () => {

    const [posts, setPosts] = useState([])

    const fetchMyPosts = async () => {
        try {
            const {data} = await instance.get("/posts/user/me")
            setPosts(data)
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        fetchMyPosts()
    }, [])

    return (
        <div className={"w-1/2 mx-auto py-10 flex flex-col gap-10"}>
            {
                posts?.map( (post,index) => (<PostItem key={index} post={post}/>))
            }
        </div>
    );
};
