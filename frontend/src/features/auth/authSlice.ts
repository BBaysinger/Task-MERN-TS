import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import axios from "axios";

// A logged in user.
export interface User {
  name: string;
  email: string;
  password: string;
  token: string;
}

// For sending login credentials.
export interface UserData {
  username?: string;
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string | null;
}

const userString = localStorage.getItem("user");
const localuser: User = userString ? JSON.parse(userString) : { name: "" };

const initialState: AuthState = {
  user: localuser ? localuser : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const register = createAsyncThunk(
  "auth/register",
  async (userData: UserData, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      let message = 'An error occurred.';

      if (error instanceof Error) {
        message = error.message;
      }

      if (axios.isAxiosError(error)) {
        message =
          (error.response?.data?.message) ||
          message; // Keep fallback message
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk("auth/login", async (userData: UserData, thunkAPI) => {
  try {
    return await authService.login(userData);
  } catch (error) {
    let message = 'An error occurred.';

    if (error instanceof Error) {
      message = error.message;
    }

    if (axios.isAxiosError(error)) {
      message =
        (error.response?.data?.message) ||
        message; // Keep fallback message
    }
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk(
  "auth/logout",
  async () => await authService.logout()
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;