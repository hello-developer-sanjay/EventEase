import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setAuthToken } from '../../../eventease/utils/setAuthToken';
import apiConfig from '../../../shared/utils/apiConfig';

const initialState = {
  token: localStorage.getItem('eventeaseToken') || null,
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

export const login = createAsyncThunk('eventease/auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${apiConfig.eventease}/auth/login`, { email, password }, {
      headers: { 'Content-Type': 'application/json' },
    });
    localStorage.setItem('eventeaseToken', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    setAuthToken(res.data.token);
    toast.success('Login successful!');
    return res.data;
  } catch (error) {
    console.error('Error logging in:', error);
    toast.error(error.response?.data?.message || 'Login failed');
    return rejectWithValue(error.response?.data?.message || 'Login failed');
  }
});

export const loadUser = createAsyncThunk('eventease/auth/loadUser', async (_, { rejectWithValue }) => {
  const token = localStorage.getItem('eventeaseToken');
  if (token) {
    setAuthToken(token);
  }
  try {
    const res = await axios.get(`${apiConfig.eventease}/auth/user`, {
      headers: { 'x-auth-token': token },
    });
    localStorage.setItem('user', JSON.stringify(res.data.user));
    return res.data.user;
  } catch (error) {
    console.error('Error loading user:', error);
    return rejectWithValue(error.response?.data?.message || 'Failed to load user');
  }
});

const authSlice = createSlice({
  name: 'eventease/auth',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      // Load User
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
