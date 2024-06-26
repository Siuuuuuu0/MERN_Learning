import React from 'react'
import { useEffect} from 'react'; 
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
import {format} from 'date-fns';

const EditPost = () => {
  const {id} = useParams(); 
  const navigate = useNavigate();
  const editTitle = useStoreState((state)=>state.editTitle); 
  const editBody = useStoreState((state)=>state.editBody);
  const editPost = useStoreActions((actions)=>actions.editPost); 
  const setEditTitle = useStoreActions((actions)=>actions.setEditTitle); 
  const setEditBody = useStoreActions((actions)=>actions.setEditBody); 
  const getPostById = useStoreState((state)=>state.getPostById);
  const post = getPostById(id);

  const handleEdit = (id) =>{
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = {id, title : editTitle, datetime, body : editBody}; 
    editPost(updatedPost); 
    navigate('/'); 
  }

  useEffect(()=>{
    if(post){
        setEditTitle(post.title); 
        setEditBody(post.body); 
    }
  }, [post, setEditBody, setEditTitle])

  return (
    <main className='NewPost'>
        {editTitle && 
        <> {/*need for parent element */}
            <h2>New Post</h2>
            <form className='newPostForm' onSubmit={(e)=>e.preventDefault()}> {/*handleSubmit will receive the event anyways*/}
                <label htmlFor='postTitle'>Title</label>
                <input 
                    id='postTitle'
                    type='text'
                    required
                    value={editTitle}
                    onChange={(e)=>setEditTitle(e.target.value)}
                />
                <label htmlFor='postBody'>Post:</label>{/*htmlFor associates a label with an input element*/}
                <input 
                    id='postBody'
                    required
                    value={editBody}
                    onChange={(e)=>setEditBody(e.target.value)}
                />
                <button type='submit' onClick={() => handleEdit(post.id)}>Submit</button>
            </form>
        </>
        }
        {!editTitle &&
            <>
                <h2>Post not found</h2>
                <p>Well, that's disappointing</p>
                <p>
                    <Link to='/'>Visit Our Homepage</Link>
                </p>
            </>
        }
    </main>
        
  )
}

export default EditPost