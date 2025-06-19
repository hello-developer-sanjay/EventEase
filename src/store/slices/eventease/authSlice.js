import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setAuthToken } from '../../../eventease/utils/setAuthToken';
import apiConfig from '../../../shared/utils/apiConfig';

const initialState = {
  token: localStorage.getItem('eventeaseToken') || null,
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

export const loadUser = createAsyncThunk('eventease/auth/loadUser', async (_, { rejectWithValue }) => {
  const token = localStorage.getItem('eventeaseToken');
  if (token) {
    setAuthToken(token);
  }
  try {
    const res = await axios.get(`${apiConfig.eventease}/auth/user`);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    return res.data.user;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to load user');
  }
});

const authSlice = createSlice({
  name: 'eventease/auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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

export default authSlice.reducer;