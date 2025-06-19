import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
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
    const { token } = getState().eventease.auth;
    const res = await axios.post(
      `${apiConfig.eventease}/google-calendar/sync`,
      {},
      { headers: { 'x-auth-token': token } }
    );
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to sync Google Calendar');
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
        state.events = action.payload.events;
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