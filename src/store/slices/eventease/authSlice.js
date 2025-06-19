import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setAuthToken } from '../../../eventease/utils/setAuthToken';
import apiConfig from '../../../shared/utils/apiConfig';

const initialState = {
  token: localStorage.getItem('eventeaseToken') || null,
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: !!localStorage.getItem('eventeaseToken'),
  loading: false,
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
  const user = JSON.parse(localStorage.getItem('user'));
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
    if (user && token) {
      return user; // Fallback to localStorage user
    }
    localStorage.removeItem('eventeaseToken');
    localStorage.removeItem('user');
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
        state.error = action.payload;
        if (localStorage.getItem('eventeaseToken') && localStorage.getItem('user')) {
          state.isAuthenticated = true;
          state.user = JSON.parse(localStorage.getItem('user'));
        } else {
          state.isAuthenticated = false;
          state.user = null;
          state.token = null;
        }
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
