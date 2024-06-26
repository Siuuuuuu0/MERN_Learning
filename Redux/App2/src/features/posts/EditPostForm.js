import { useState } from "react";
import React from 'react';
import { useDispatch, useSelector } from "react-redux"; 
import { selectAllUsers } from "../users/usersSlice";
import { selectPostById, updatePost, deletePost } from "./postSlice";
import { useNavigate, useParams } from "react-router-dom";

const EditPostForm = () => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 

  const {postId} = useParams();

  const post = useSelector((state)=>selectPostById(state, Number(postId)));
  const users = useSelector(selectAllUsers); 

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body); 
  const [userId, setUserId] = useState(post?.userId); 
  const [requestStatus, setRequestStatus] = useState('idle'); 


  if(!post){
    return (
        <section>
            <h2>Post not found</h2>
        </section>
    )
  }  

  const onTitleChanged = e=>setTitle(e.target.value); 
  const onContentChanged = e => setContent(e.target.value); 
  const onAuthorChanged = e=> setUserId(Number(e.target.value)); 


  const canSave = [title, content, userId].every(Boolean)&&requestStatus === 'idle'; 

  const onSavePostClicked =() =>{
    if(canSave){
        try{
            setRequestStatus('pending'); 
            dispatch(updatePost({title, body : content, userId, id : post.id, reactions : post.reactions})).unwrap(); //unwrap from redux toolkit to a returned promise, return a new promise which has the action payload or an error if rejected action

            setTitle(''); 
            setContent(''); 
            setUserId(''); 
            navigate(`/post/${post.id}`); //ADD THE SLASH IN TEH START, NOT POST/:ID BUT /POST/:ID
        }catch(err){
            console.error(`Error : ${err.message}`); 
        }finally{
            setRequestStatus('idle');
        }
    }

  }; 

  const usersOptions = users.map(user=>(
    <option key={user.id} value={user.id}>
        {user.name}
    </option>
  ));

  const onDeletePostClicked =() =>{
    if(canSave){
        try{
            setRequestStatus('pending'); 
            dispatch(deletePost({id : post.id})).unwrap(); //unwrap from redux toolkit to a returned promise, return a new promise which has the action payload or an error if rejected action

            setTitle(''); 
            setContent(''); 
            setUserId(''); 
            navigate('/');
        }catch(err){
            console.error(`Error : ${err.message}`); 
        }finally{
            setRequestStatus('idle');
        }
    }

  }; 

  return (
    <section>
        <h2>Edit Post</h2>
        <form>
            <label htmlFor="postTitle">Post Title:</label>
            <input
                type="text"
                id="postTitle"
                name="postTitle"
                value={title}
                onChange={onTitleChanged}
            />
            <label htmlFor="postAuthor">Author:</label>
            <select id='postAuthor' value={userId} onChange={onAuthorChanged}>
                <option value=""></option>
                {usersOptions}
            </select>
            <label htmlFor="postContent">Content:</label>
            <textarea
                id="postContent"
                name="postContent"
                value={content}
                onChange={onContentChanged}
            />
            <button
                type="button"
                onClick={onSavePostClicked}
                disabled={!canSave}
            >Save Post</button>
            <button 
                type="button"
                onClick={onDeletePostClicked}
            >Delete Post</button>
        </form>
    </section>
  )
}

export default EditPostForm