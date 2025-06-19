import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import apiConfig from '../../../shared/utils/apiConfig';

const initialState = {
  events: [],
  loading: false,
  error: null,
};

export const getEvents = createAsyncThunk('eventease/events/getEvents', async (_, { getState, rejectWithValue }) => {
  try {
    const { token, user } = getState().eventease.auth;
    const res = await axios.get(`${apiConfig.eventease}/events`, {
      headers: { 'x-auth-token': token },
      params: { userId: user?._id },
    });
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to fetch events';
    toast.error(message);
    return rejectWithValue(message);
  }
});

export const createEvent = createAsyncThunk('eventease/events/createEvent', async (eventData, { getState, rejectWithValue }) => {
  try {
    const { token, user } = getState().eventease.auth;
    const data = { ...eventData, userId: user?._id };
    const res = await axios.post(`${apiConfig.eventease}/events`, data, {
      headers: { 'x-auth-token': token, 'Content-Type': 'application/json' },
    });
    toast.success('Event created successfully');
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to create event';
    toast.error(message);
    return rejectWithValue(message);
  }
});

export const updateEvent = createAsyncThunk('eventease/events/updateEvent', async ({ id, eventData }, { getState, rejectWithValue }) => {
  try {
    const { token, user } = getState().eventease.auth;
    const data = { ...eventData, userId: user?._id };
    const res = await axios.put(`${apiConfig.eventease}/events/${id}`, data, {
      headers: { 'x-auth-token': token, 'Content-Type': 'application/json' },
    });
    toast.success('Event updated successfully');
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to update event';
    toast.error(message);
    return rejectWithValue(message);
  }
});

export const deleteEvent = createAsyncThunk('eventease/events/deleteEvent', async (id, { getState, rejectWithValue }) => {
  try {
    const { token } = getState().eventease.auth;
    await axios.delete(`${apiConfig.eventease}/events/${id}`, {
      headers: { 'x-auth-token': token },
    });
    toast.success('Event deleted successfully');
    return id;
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to delete event';
    toast.error(message);
    return rejectWithValue(message);
  }
});

const eventSlice = createSlice({
  name: 'eventease/events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.events = action.payload;
        state.loading = false;
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.events.push(action.payload);
        state.loading = false;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        const index = state.events.findIndex(event => event._id === action.payload._id);
        if (index !== -1) {
          state.events[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter(event => event._id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default eventSlice.reducer;
