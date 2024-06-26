import { useSelector } from "react-redux";
import { selectUserById } from "./usersSlice";
import { useParams, Link } from "react-router-dom";
import { selectAllPosts } from '../posts/postSlice'; 
import React from 'react'

const UsersPage = () => {
  const {userId} = useParams(); 
  const user = useSelector(state=>selectUserById(state, Number(userId)));

  const postsForUser = useSelector(state=>{
    const allPosts = selectAllPosts(state); 
    return allPosts.filter(post=>post.userId===Number(userId)); //filter returns a new array every time and useSelector runs every time an action is dispatched, 
    //when we dispatch the increase count, the useSelector runs again and the component rerenders if a new reference value is returned
    //and we return a new array each time
    //-> we create a memoized selector
  })

  const postTitles = postsForUser.map(post=> (
    <li key={post.id}>
        <Link to={`/post/${post.id}`}>{post.title}</Link>
    </li>
  )); 

  return (
    <section>
        <h2>{user?.name}</h2>
        <ol>{postTitles}</ol>
    </section>
  )
}

export default UsersPage