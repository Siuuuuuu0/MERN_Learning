import React from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { increment, decrement, reset, incrementByAmount } from './counterSlice';
import { useState } from 'react';

const Counter = () => {
    const [incrementAmount, setIncrementAmount] = useState(0); 
    const addValue = Number(incrementAmount) || 0; //no not a number returned, step for safety
    const count = useSelector((state)=>state.counter.count); //is a hook that allows you to extract data from the Redux store state using a selector function. The selector function takes the entire state as an argument and returns the part of the state you need.
    const dispatch = useDispatch(); //useDispatch is a hook that returns a reference to the dispatch function from the Redux store. This function is used to dispatch actions to the Redux store, triggering state changes.
    const resetAll =() =>{
        setIncrementAmount(0); 
        dispatch(reset()); 
    }
    return (
        <section>
            <p>{count}</p>
            <div>
                <button onClick={()=>dispatch(increment())}>+</button>
                <button onClick={()=>dispatch(decrement())}>-</button>
            </div>
            <input 
                type='text' 
                value={incrementAmount}
                onChange={(e)=>setIncrementAmount(e.target.value)}
            />
            <div>
                <button onClick={()=>dispatch(incrementByAmount(addValue))}>Add Amount</button> {/*addValue = increment amount*/}
                <button onClick={resetAll}>Reset</button> {/*()=>resetAll()  OR resetAll WITH NO PARENTHESIS*/}
            </div>
        </section>
    )
}

export default Counter