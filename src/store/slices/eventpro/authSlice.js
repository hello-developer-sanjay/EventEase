import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setAuthToken } from '../../../eventease/utils/setAuthToken';
import apiConfig from '../../../shared/utils/apiConfig';

const initialState = {
  token: localStorage.getItem('eventproToken') || null,
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

export const register = createAsyncThunk('eventpro/auth/register', async (userData, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${apiConfig.eventpro}/auth/register`, { ...userData, platform: 'eventpro' }, {
      headers: { 'Content-Type': 'application/json' },
    });
    localStorage.setItem('eventproToken', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    setAuthToken(res.data.token);
    toast.success('Registration successful!');
    return res.data;
  } catch (error) {
    console.error('Error registering user:', error);
    toast.error(error.response?.data?.message || 'Registration failed');
    return rejectWithValue(error.response?.data?.message || 'Registration failed');
  }
});

export const login = createAsyncThunk('eventpro/auth/login', async ({ email, password, platform }, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${apiConfig.eventpro}/auth/login`, { email, password, platform }, {
      headers: { 'Content-Type': 'application/json' },
    });
    localStorage.setItem('eventproToken', res.data.token);
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

export const loadUser = createAsyncThunk('eventpro/auth/loadUser', async (_, { rejectWithValue }) => {
  const token = localStorage.getItem('eventproToken');
  if (token) {
    setAuthToken(token);
  }
  try {
    const res = await axios.get(`${apiConfig.eventpro}/auth/user`, {
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
  name: 'eventpro/auth',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    setAuth(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      localStorage.setItem('eventproToken', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
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

export const { clearError, setAuth } = authSlice.actions;
export default authSlice.reducer;
