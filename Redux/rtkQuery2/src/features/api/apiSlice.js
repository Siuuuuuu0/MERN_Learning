import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'; 
export const apiSlice = createApi({
    reducerPath :'api', //optipnal if you name it 'api'
    baseQuery : fetchBaseQuery({baseUrl : 'http://localhost:3500'}), 
    tagTypes : ['Post'], 
    endpoints : builder =>({})
})