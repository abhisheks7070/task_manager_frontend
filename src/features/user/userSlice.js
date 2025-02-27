import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    data: null,
    error: ""
}

//generating pending, fulfilled or rejected action types

export const fetchUser = createAsyncThunk("user/fetchUser",async ()=>{
    
        
        const res = await axios.get(import.meta.env.VITE_AUTH_URL,
            {
                headers:{
                    Authorization: localStorage.getItem("token")
                }
            }
        )
       
        return res.data
   
})

const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder)=>{
        builder.addCase(fetchUser.pending, (state)=>{
            state.loading = true
            state.error = ""
        })
        
        builder.addCase(fetchUser.fulfilled, (state, action)=>{
            state.loading = false
            state.data = action.payload
        })
        
        builder.addCase(fetchUser.rejected, (state, action)=>{
            state.loading = false,
            state.data = [],
            state.error = action.error.message
        })
    }
})




export default userSlice.reducer
