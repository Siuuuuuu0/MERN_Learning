import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'; 

export const apiSlice = createApi({
    baseQuery : fetchBaseQuery({baseUrl : 'http://localhost:3500'}), 
    tagTypes : ['Note', 'User'], //used for cached data, when we invalidate types, we refer to this 
    endpoints : builder =>({}) //we provide extended slices that we will attach to this api
});

