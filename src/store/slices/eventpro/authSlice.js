import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setAuthToken } from '../../../eventpro/utils/setAuthToken';
import apiConfig from '../../../shared/utils/apiConfig';

// Axios interceptor for 401 handling
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('authSlice.js - 401 Unauthorized, logging out');
      localStorage.removeItem('eventproToken');
      localStorage.removeItem('eventproUser');
      setAuthToken(null);
      toast.error('Session expired. Please log in again.');
      window.location.href = '/event-form';
    }
    return Promise.reject(error);
  }
);

const initialState = {
  token: localStorage.getItem('eventproToken') || null,
  user: JSON.parse(localStorage.getItem('eventproUser')) || null,
  isAuthenticated: !!localStorage.getItem('eventproToken'),
  loading: false,
  error: null,
};

export const register = createAsyncThunk('eventpro/auth/register', async (userData, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${apiConfig.eventpro}/auth/register`, { ...userData, platform: 'eventpro' }, {
      headers: { 'Content-Type': 'application/json' },
    });
    localStorage.setItem('eventproToken', res.data.token);
    localStorage.setItem('eventproUser', JSON.stringify(res.data.user));
    setAuthToken(res.data.token);
    console.log('authSlice.js - Register success:', { user: res.data.user._id, email: res.data.user.email });
    toast.success('Registration successful!');
    return res.data;
  } catch (error) {
    console.error('authSlice.js - Register error:', error.message);
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
    localStorage.setItem('eventproUser', JSON.stringify(res.data.user));
    setAuthToken(res.data.token);
    console.log('authSlice.js - Login success:', { user: res.data.user._id, email: res.data.user.email });
    toast.success('Login successful!');
    return res.data;
  } catch (error) {
    console.error('authSlice.js - Login error:', error.message);
    toast.error(error.response?.data?.message || 'Login failed');
    return rejectWithValue(error.response?.data?.message || 'Login failed');
  }
});

export const loadUser = createAsyncThunk('eventpro/auth/loadUser', async (_, { rejectWithValue }) => {
  const token = localStorage.getItem('eventproToken');
  if (!token) {
    console.log('authSlice.js - No token found');
    return rejectWithValue('No token found');
  }
  setAuthToken(token);
  try {
    const res = await axios.get(`${apiConfig.eventpro}/auth/user`, {
      headers: { 'x-auth-token': token },
    });
    if (res.data.user.platform !== 'eventpro') {
      throw new Error('Invalid platform in user data');
    }
    localStorage.setItem('eventproUser', JSON.stringify(res.data.user));
    console.log('authSlice.js - loadUser success:', { user: res.data.user._id, email: res.data.user.email });
    return res.data.user;
  } catch (error) {
    console.error('authSlice.js - loadUser error:', error.message);
    localStorage.removeItem('eventproToken');
    localStorage.removeItem('eventproUser');
    setAuthToken(null);
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
      localStorage.setItem('eventproUser', JSON.stringify(action.payload.user));
      setAuthToken(action.payload.token);
      console.log('authSlice.js - setAuth:', { user: action.payload.user._id, email: action.payload.user.email });
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('eventproToken');
      localStorage.removeItem('eventproUser');
      setAuthToken(null);
      console.log('authSlice.js - Logged out');
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
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
