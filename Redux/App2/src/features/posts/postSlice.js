import {createSlice, createAsyncThunk, createSelector} from '@reduxjs/toolkit'; //nanoid generates a random id
import { sub } from 'date-fns';
import axios from 'axios'; 
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';


const initialState = {
    posts : [], 
    status : 'idle', //idle || loading || succeeded || failed
    error : null, 
    count : 0
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () =>{
    const response = await axios.get(POSTS_URL); 
    return response.data; 
});//first arg = string used as prefix for the generated actiom type, callback shoukd return a promise with data or rejected promise

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) =>{
    const response = await axios.post(POSTS_URL, initialPost); 
    return response.data; 
});

export const updatePost  = createAsyncThunk('posts/updatePost', async (initialPost) =>{
    const {id} = initialPost; 
    try{
        const response = await axios.put(`${POSTS_URL}/${id}`, initialPost); 
        return response.data; 
    }
    catch(err){
        //bc of the fake API
        // console.error(err); //if we update a post that we added ourselves, it will not update as it does exist in the fake API
        return initialPost; //so we return the initial post
        //only for testing
    }
});

export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost) =>{
    const {id} = initialPost; 
    try{
        const response = await axios.delete(`${POSTS_URL}/${id}`); 
        if(response?.status===200) return initialPost; 
        return `${response?.status}: ${response?.statusText}`;
    }catch(err){
        return err.message; 
    } 
})

const postsSlice = createSlice({
    name : 'posts', 
    initialState, 
    reducers : {
        //reducer to handle new Reactions
        reactionAdded(state, action){
            const {postId, reaction} = action.payload; 
            const existingPost = state.posts.find(post=>post.id===postId); 
            if(existingPost){
                existingPost.reactions[reaction]++; //immerjs so we can write like this
            }
        }, 
        increaseCount(state, action){
            state.count++; 
        }
    },
    extraReducers(builder){ //extra reducers bc sometimes the slice has to respond to reducers not defined
        //builder object that helps define additional case rducers for actions defined outside of the slice, like the fetch posts
        builder
        .addCase(fetchPosts.pending, (state, action)=>{
            state.status = 'loading'; 
        })
        .addCase(fetchPosts.fulfilled, (state, action)=>{
            state.status = 'succeeded'; 
            let min =1; 
            const loadedPosts = action.payload.map(post=>{
                post.date = sub(new Date(), {minutes : min++}).toISOString(); //just so that each post has a different time
                post.reactions={ //same, as no API for reactions
                    thumbsUp : 0, 
                    wow : 0, 
                    heart : 0, 
                    rocket : 0, 
                    coffee : 0
                }; 
                return post; 
            }); 
            state.posts = loadedPosts; //immerjs

        })
        .addCase(fetchPosts.rejected, (state, action)=>{
            state.status='failed'; 
            state.error = action.error.message; 
        })
        .addCase(addNewPost.fulfilled, (state, action)=>{
            action.payload.userId=Number(action.payload.userId); 
            action.payload.date = new Date().toISOString(); 
            action.payload.reactions = {
                thumbsUp : 0, 
                wow : 0, 
                heart : 0, 
                rocket : 0, 
                coffee : 0
            };
            state.posts.push(action.payload); 
        })
        .addCase(updatePost.fulfilled, (state, action)=>{ //status code 500, update not passed
            if(!action.payload?.id){
                return;
            }
            const {id} = action.payload; 
            action.payload.date = new Date().toISOString(); 
            const posts = state.posts.filter(post => post.id!==id); 
            state.posts = [...posts, action.payload]; 
        })
        .addCase(deletePost.fulfilled, (state, action)=>{
            if(!action.payload?.id) return; 
            const {id} = action.payload; 
            const posts = state.posts.filter(post => post.id!==id); 
            state.posts = posts; 
        })
    }
}); 
export default postsSlice.reducer; 
export const {increaseCount, reactionAdded} = postsSlice.actions; //createSlice automatically genertaes an action creator function with the same name
export const selectAllPosts = (state)=>state.posts.posts; //object and posts inside the object 
//we made the selector bc if we change something, we do need to change it everywhere, only in the selector
export const getPostsStatus = (state)=>state.posts.status;
export const getPostsError = (state)=>state.posts.error;
export const getPostsCount = (state)=>state.posts.count;
export const selectPostById = (state, postId)=>
    state.posts.posts.find(post => post.id===postId);
export const selectPostsByUser = createSelector( //one or more input functions inside brackets => values returned are the dependencies
    [selectAllPosts, (state, userId)=>userId], 
    (posts, userId) =>posts.filter(post => post.userId === userId) // only if posts or userId changes its the only time we will get smtg new from the selector
); //now we do not rerender the userpage every time
//thunk -> prog term that means a piece of code that does some delayed work




// postAdded : {
//     reducer(state, action){
//         state.posts.push(action.payload); //we can write like, as Immer.js which Redux uses will not mutate the state.post as it might seem(new state.posts is created)
//     //this 'state.post mutation' only works createSlice
//     }, 
//     prepare(title, content, userId){ //This is an optional function that allows you to customize the payload of the action.
//         return {
//             payload : {
//                 id : nanoid(), 
//                 title, 
//                 content, 
//                 date : new Date().toISOString(),
//                 userId, 
//                 reactions : {
//                     thumbsUp : 0, 
//                     wow : 0, 
//                     heart : 0, 
//                     rocket : 0, 
//                     coffee : 0
//                 }
//             }
//         }
//     }
// }, 