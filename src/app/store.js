import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice.js'
import taskReducer from '../features/user/taskSlice.js'

// Create the Redux store
const store = configureStore({
  reducer: {
    user: userReducer, // Add reducer to the store
    task: taskReducer, // Add reducer to the store
  },
});

export default store;