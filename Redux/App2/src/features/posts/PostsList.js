import {useSelector} from 'react-redux'; 
import {React} from 'react'; 
import { selectAllPosts, getPostsError, getPostsStatus} from './postSlice';
import PostsExcerpt from './PostsExcerpt';

const PostsList = () => {
    const postsStatus  = useSelector(getPostsStatus); 
    const error = useSelector(getPostsError); 
    const posts = useSelector(selectAllPosts);

    // useEffect(()=>{
    //     if(postsStatus==='idle') dispatch(fetchPosts()); 
    // }, [postsStatus, dispatch]); 

    let content; 
    if(postsStatus==='loading'){
        content = <p>Loading...</p>;
    }else if (postsStatus==='succeeded'){
        //slice creates a shallow copy and then we compare by date
        const orderedPosts = posts.slice().sort((a, b)=>b.date.localeCompare(a.date)); 
        content = orderedPosts.map(post=> <PostsExcerpt key={post.id} post={post} />); 
    }else if (postsStatus==='failed'){
        content = <p>{error}</p>
    }

    return (
        <section>
            {/* <h2>Posts</h2> */}
            {content}
        </section>
    )
}

export default PostsList; 


