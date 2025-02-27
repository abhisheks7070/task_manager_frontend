import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice.js'

// Create the Redux store
const store = configureStore({
  reducer: {
    user: userReducer, // Add reducer to the store
  },
});

export default store;