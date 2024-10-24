import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import taskService from "./taskService";
import { RootState } from "app/store";
import { Task } from "./taskService";

export interface TaskState {
  tasks: Task[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: TaskState = {
  tasks: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Define a type for task data
interface CreateTaskData {
  title: string; // Add other properties as per your task structure
  description: string;
}

export const createTask = createAsyncThunk<Task, CreateTaskData, { state: RootState }>(
  "tasks/create",
  async (taskData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      if (!token) {
        return thunkAPI.rejectWithValue("Authentication token is missing or invalid.");
      }
      return await taskService.createTask(taskData, token);
    } catch (error) {
      let message = 'An error occurred.';
      if (error instanceof Error) {
        message = error.message;
      }
      if (axios.isAxiosError(error)) {
        message = (error.response?.data?.message) || message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getTasks = createAsyncThunk<Task[], void, { state: RootState }>(
  "tasks/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      if (!token) {
        return thunkAPI.rejectWithValue("Authentication token is missing or invalid.");
      }
      return await taskService.getTasks(token);
    } catch (error) {
      let message = 'An error occurred.';
      if (error instanceof Error) {
        message = error.message;
      }
      if (axios.isAxiosError(error)) {
        message = (error.response?.data?.message) || message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteTask = createAsyncThunk<string, string, { state: RootState }>(
  "tasks/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      if (!token) {
        return thunkAPI.rejectWithValue("Authentication token is missing or invalid.");
      }
      await taskService.deleteTask(id, token); // Assuming this doesn't return anything
      return id; // Return the id for filtering the task later
    } catch (error) {
      let message = 'An error occurred.';
      if (error instanceof Error) {
        message = error.message;
      }
      if (axios.isAxiosError(error)) {
        message = (error.response?.data?.message) || message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = taskSlice.actions;
export default taskSlice.reducer;
