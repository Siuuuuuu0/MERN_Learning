import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { sub } from 'date-fns';
import { apiSlice } from "../api/apiSlice";

const postsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = postsAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints : builder =>({
        getPosts : builder.query({
            query : () => '/posts', 
            transformResponse : responseData => {
                let min = 1; 
                const loadedPosts = responseData.map(post=>{
                    if(!post?.date) post.date = sub(new Date(), {minutes : min++}).toISOString();
                    if(!post?.reactions) post.reactions = {
                        thumbsUp : 0, 
                        wow : 0, 
                        heart : 0, 
                        rocket :0, 
                        coffee :0
                    }
                    return post; 
                }); 
                return postsAdapter.setAll(initialState, loadedPosts); //normalizes the data(has an array of ids and of entities with all the objects inside)
            }, 
            providesTags : (result, error, arg) =>[ //first entry we identify as list, any time we invalidate any of tags, it will re-auto-fetch all the posts
                {type : 'Post', id:'LIST'}, //we also provide an object for each individual post
                ...result.ids.map(id=>({type : 'Post', id}))
            ]
        }), 
        getPostsByUserId : builder.query({
            query : id=>`/posts/?userId=${id}`, 
            transformResponse : responseData => {
                let min=1; 
                const loadedPosts = responseData.map(post =>{
                    if(!post?.date) post.date = sub(new Date(), {minutes : min++}).toISOString();
                    if(!post?.reactions) post.reactions = {
                        thumbsUp : 0, 
                        wow : 0, 
                        heart : 0, 
                        rocket :0, 
                        coffee :0
                    }
                    return post; 
                }); 
                return postsAdapter.setAll(initialState, loadedPosts); 
            }, 
            providesTags : (result, error, arg) => [
                ...result.ids.map(id=>({type : 'Post', id}))
                ]
        }), 
        addNewPost : builder.mutation({
            query : initialPost =>({
                url : '/posts', 
                method : 'POST', 
                body : {
                    ...initialPost, 
                    userId : Number(initialPost.userId), 
                    date : new Date().toISOString(), 
                    reaction : {
                        thumbsUp : 0, 
                        wow : 0, 
                        heart : 0, 
                        rocket :0, 
                        coffee :0
                    }
                }
            }), 
            invalidatesTags : [
                {type : 'Post', id:'LIST'}
            ]
        }), 
        updatePost : builder.mutation({
            query : initialPost => ({
                url : `/posts/${initialPost.id}`, 
                method : 'PUT', 
                body : {
                    ...initialPost, 
                    date : new Date().toISOString()
                }
            }), 
            invalidatesTags : (result, error, arg)=>[
                {type : 'Post', id : arg.id}
            ]
        }),
        deletePost : builder.mutation({
            query : ({id}) => ({
                url : `/posts/${id}`, 
                method : 'DELETE', 
                body : {id}
            }), 
            invalidatesTags : (result, error, arg)=>[
                {type : 'Post', id : arg.id}
            ]
        }), 
        addReaction : builder.mutation({//doesnt have invalidatesTag, has optimistic update
            query : ({postId, reactions})=>({
                url : `posts/${postId}`, 
                method : 'PATCH', 
                body : {reactions}
            }), 
            async onQueryStarted({
                postId, reactions
            }, {
                dispatch, queryFulfilled
            }) {
                const patchResult = dispatch(
                    extendedApiSlice.util.updateQueryData('getPosts', undefined, draft =>{
                        const post = draft.entities[postId]
                        if(post) post.reactions = reactions
                    })//optimisctic result, ie the reaction is firstly displayed and only then the request is passed to the server, 
                    //so if the request didnt pass it will undo the result
                )
                try{
                    await queryFulfilled
                }catch{
                    patchResult.undo()
                }
            }
        })
    })
})

export const {
    useGetPostsQuery, 
    useGetPostsByUserIdQuery,
    useAddNewPostMutation, 
    useUpdatePostMutation, 
    useDeletePostMutation, 
    useAddReactionMutation
} = extendedApiSlice;

export const selectPostsResult = extendedApiSlice.endpoints.getPosts.select();//returns query result object
//doesnt issue the query

//getSelectors creates these selectors and we rename them with aliases using destructuring

const selectPostsData = createSelector(//input funtion and output function
    selectPostsResult, 
    postsResult => postsResult.data
)

export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
    // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors(state=> selectPostsData(state)??initialState) //nulisshoperator (ie is what on the left is null return what on the right)
