import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import taskReducer from "../features/tasks/taskSlice";

// Create the Redux store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
  },
});

// Define the root state type
export type RootState = ReturnType<typeof store.getState>;

// Define the AppDispatch type
export type AppDispatch = typeof store.dispatch;