import { createSlice } from "@reduxjs/toolkit";

const initialState = null



const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers:{
        getTask: (state, action) => { 
           return state = action.payload;  
        },

    }
})



export const {getTask} = taskSlice.actions
export default taskSlice.reducer
