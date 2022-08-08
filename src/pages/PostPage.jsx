import React, {useCallback, useEffect, useState} from "react";
import Moment from "react-moment";
import {AiFillEye, AiOutlineMessage, AiTwotoneEdit, AiFillDelete} from "react-icons/ai";

import {instance} from "../utils/axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deletePost} from "../redux/features/post/postSlice";
import {toast} from "react-toastify";
import {createComment, getPostComments} from "../redux/features/comments/commentSlice";
import {CommentItem} from "../components/CommentItem";

export const PostPage = () => {
    const [post, setPost] = useState(null);
    const [comment, setComment] = useState("");

    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user} = useSelector(state => state.auth);
    const {comments} = useSelector(state => state.comments);

    const removePostHandler = () => {
        try {
            dispatch(deletePost(params.id));
            toast("Пост был удален");
            navigate("/posts");
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = () => {
        try {
            const postId = params.id
            dispatch(createComment({postId, comment}));
            setComment("")
        } catch (error) {
            console.log(error);
        }
    }

    const fetchPost = useCallback(async () => {
        const {data} = await instance.get(`/posts/${params.id}`);
        setPost(data);
    }, [params.id]);

    const fetchComments = useCallback(async () => {
        try {
            dispatch(getPostComments(params.id))
        } catch (error) {
            console.log(error);
        }
    }, [params.id, dispatch])

    useEffect(() => {
        fetchPost();
    }, [fetchPost]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    if (!post) {
        return (
            <div className={"text-xl text-center text-white py-10"}>
                Загрузка...
            </div>
        );
    }

    return (
        <div>
            <button className={"flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4"}>
                <Link className={"flex"} to={"/"}>Назад</Link>
            </button>

            <div className={"flex gap-10 py-8 px-4"}>
                <div className={"w-2/3"}>
                    <div className={"flex flex-col basis-1/4 flex-grow"}>
                        <div className={post.imgUrl ? "flex rounded-sm h-80 " : "flex rounded-sm"}>

                            {post?.imgUrl && (
                                <img className={"object-cover w-full"}
                                     src={`http://localhost:3002/${post.imgUrl}`}
                                     alt="img"/>
                            )}

                        </div>
                        <div className={"flex justify-between items-center pt-2"}>
                            <div className={"text-xs text-white opacity-50"}>{post.username}</div>
                            <div className={"text-xs text-white opacity-50"}>
                                <Moment date={post.createdAt} format={"D MMM YYYY"}/>
                            </div>
                        </div>
                        <div className={"text-white text-xl"}>{post.title}</div>
                        <p className={"text-white opacity-60 text-xs pt-4"}>{post.text}</p>

                        <div className={"flex gap-3 items-center mt-2 justify-between"}>
                            <div className={"flex gap-3 mt-4"}>
                                <button
                                    className={"flex items-center justify-center gap-2 text-xs text-white opacity-50"}>
                                    <AiFillEye/> <span>{post.views || 0}</span>
                                </button>
                                <button
                                    className={"flex items-center justify-center gap-2 text-xs text-white opacity-50"}>
                                    <AiOutlineMessage/> <span>{post.comments?.length || 0}</span>
                                </button>
                            </div>

                            {user?.id === post.author && (
                                <div className={"flex gap-3 mt-4"}>
                                    <button className={"flex items-center justify-center gap-2 text-white opacity-50"}>
                                        <Link to={`/${params.id}/edit`}>
                                            <AiTwotoneEdit/>
                                        </Link>
                                    </button>
                                    <button className={"flex items-center justify-center gap-2 text-white opacity-50"}
                                            onClick={removePostHandler}
                                    >
                                        <AiFillDelete/>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className={"w-1/3 p-8 bg-gray-700 flex flex-col rounded-sm"}>
                    <form className={"flex gap-2"} onSubmit={e => e.preventDefault()}>
                        <input type="text"
                               value={comment}
                               onChange={e => setComment(e.target.value)}
                               placeholder={"Comment"}
                               className={"text-black w-full rounded-sm bg-gray-400 border p-2 text-xs outline-none placeholder:text-gray-700"}
                        />
                        <button className={"flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4"}
                                type={"submit"}
                                onClick={handleSubmit}
                        >Отправить</button>
                    </form>

                    {
                        comments?.map( cmt => {
                            return <CommentItem key={cmt.id} cmt={cmt}/>
                        } )
                    }

                </div>
            </div>
        </div>
    );
};
