import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import apiConfig from '../../../shared/utils/apiConfig';

const initialState = {
  events: [],
  syncStatus: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
};

export const syncGoogleCalendar = createAsyncThunk('eventease/googleCalendar/sync', async (_, { getState, rejectWithValue }) => {
  try {
    const { token, user } = getState().eventease.auth;
    const googleAccessToken = user?.googleAccessToken || localStorage.getItem('googleAccessToken');
    const res = await axios.post(
      `${apiConfig.eventease}/google-calendar/sync`,
      { googleAccessToken },
      { headers: { 'x-auth-token': token, 'Content-Type': 'application/json' } }
    );
    toast.success('Google Calendar synced successfully');
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to sync Google Calendar';
    console.error('syncGoogleCalendar error:', error, 'Response:', error.response);
    toast.error(message);
    return rejectWithValue(message);
  }
});

const googleCalendarSlice = createSlice({
  name: 'eventease/googleCalendar',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(syncGoogleCalendar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(syncGoogleCalendar.fulfilled, (state, action) => {
        state.events = action.payload.events?.filter(event => event.start && event.end) || [];
        state.syncStatus = action.payload.status;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.loading = false;
      })
      .addCase(syncGoogleCalendar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default googleCalendarSlice.reducer;
