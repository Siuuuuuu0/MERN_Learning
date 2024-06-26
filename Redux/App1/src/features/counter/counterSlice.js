//slice -> splitting redux state objects into multiple slices of state, its a collection of reducer actions and logic
//for example comments slice and posts slice for a blog, as logic handdled separately
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    count : 0
}
export const counterSlice = createSlice({
    name : 'counter', 
    initialState, 
    reducers : {
        increment : (state) => {state.count +=1; }, 
        decrement : (state) => {state.count -=1; },
        reset : (state)=>{state.count = 0;}, 
        incrementByAmount  : (state, action)=>{state.count+=action.payload;}
    }//we name all of our actions
}) 
export const {increment, decrement, reset, incrementByAmount} = counterSlice.actions; 
export default counterSlice.reducer; 