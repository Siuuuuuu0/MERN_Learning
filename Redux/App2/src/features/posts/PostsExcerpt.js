import React from 'react';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';
import { Link } from 'react-router-dom';
import React from 'react';

const PostsExcerpt = ({post}) => {
  return (
    <article>
        <h2>{post.title}</h2>
        <p className='excerpt'>{post.body.substring(0, 75)}</p>
        <p className='postCredit'>
            <Link to={`post/${post.id}`}>View Post</Link>
            <PostAuthor userId={post.userId}/>
            <TimeAgo timestamp={post.date} />
        </p>
        <ReactionButtons post={post} />
    </article>
  )
}
// PostsExcerpt = React.memo(PostsExcerpt); WITH let PostsExcert NOT const PostsExcerpt
//it allows the component to not rerender if the props it received did not change
//earlier when we added reactions, everything was rerendering, now only the specific post
//but, state normalization
export default PostsExcerpt;