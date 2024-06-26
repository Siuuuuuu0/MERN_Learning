//intension of redux is to have one single store for the application
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";//default export
export const store = configureStore({
    reducer : {
        counter : counterReducer,
    }
});
//A reducer is a fundamental concept in Redux, a state management library often used with React. In Redux, the entire application state is represented by a single JavaScript object, and the only way to change this state is by dispatching actions. 
//A reducer is a pure function that takes the current state and an action as arguments, and returns a new state based on that actio
//Reducers are pure functions, meaning they do not have side effects. Given the same inputs (state and action), they always return the same output (new state).
//Reducers should never mutate the state directly. Instead, they should return a new state object that reflects the changes.
//in larger applications, you often have multiple reducers, each managing different parts of the state. Redux provides a combineReducers function to combine these smaller reducers into a single root reducer.