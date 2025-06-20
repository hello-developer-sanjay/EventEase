import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import apiConfig from '../../../shared/utils/apiConfig';
import { logout } from './authSlice';

const initialState = {
  events: [],
  loading: false,
  error: null,
};

export const fetchEvents = createAsyncThunk('eventpro/events/fetchEvents', async (_, { getState, dispatch, rejectWithValue }) => {
  const { token } = getState().eventpro.auth;
  if (!token) {
    dispatch(logout());
    toast.error('User is not authenticated');
    return rejectWithValue('User is not authenticated');
  }
  try {
    const res = await axios.get(`${apiConfig.eventpro}/events`, {
      headers: { 'x-auth-token': token },
    });
    return res.data;
  } catch (error) {
    console.error('eventSlice.js - Error fetching events:', error);
    if (error.response?.status === 401) {
      dispatch(logout());
      toast.error('Session expired. Please log in again.');
    } else {
      toast.error(error.response?.data?.message || 'Failed to fetch events');
    }
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch events');
  }
});

export const addEvent = createAsyncThunk('eventpro/events/addEvent', async (event, { getState, dispatch, rejectWithValue }) => {
  const { token } = getState().eventpro.auth;
  if (!token) {
    dispatch(logout());
    toast.error('User is not authenticated');
    return rejectWithValue('User is not authenticated');
  }
  try {
    const res = await axios.post(`${apiConfig.eventpro}/events`, event, {
      headers: { 'x-auth-token': token, 'Content-Type': 'application/json' },
    });
    toast.success('Event added successfully!');
    return res.data;
  } catch (error) {
    console.error('eventSlice.js - Error adding event:', error);
    if (error.response?.status === 401) {
      dispatch(logout());
      toast.error('Session expired. Please log in again.');
    } else {
      toast.error(error.response?.data?.message || 'Failed to add event');
    }
    return rejectWithValue(error.response?.data?.message || 'Failed to add event');
  }
});

export const updateEvent = createAsyncThunk('eventpro/events/updateEvent', async (event, { getState, dispatch, rejectWithValue }) => {
  const { token } = getState().eventpro.auth;
  if (!token) {
    dispatch(logout());
    toast.error('User is not authenticated');
    return rejectWithValue('User is not authenticated');
  }
  try {
    const res = await axios.put(`${apiConfig.eventpro}/events/${event._id}`, {
      eventName: event.eventName,
      eventType: event.eventType,
      startDate: event.startDate,
      endDate: event.endDate,
      description: event.description,
      handledBy: event.handledBy,
      organisation: event.organisation,
      totalSubEvents: event.totalSubEvents,
    }, {
      headers: { 'x-auth-token': token, 'Content-Type': 'application/json' },
    });
    toast.success('Event updated successfully!');
    return res.data;
  } catch (error) {
    console.error('eventSlice.js - Error updating event:', error);
    if (error.response?.status === 401) {
      dispatch(logout());
      toast.error('Session expired. Please log in again.');
    } else {
      toast.error(error.response?.data?.message || 'Failed to update event');
    }
    return rejectWithValue(error.response?.data?.message || 'Failed to update event');
  }
});

export const deleteEvent = createAsyncThunk('eventpro/events/deleteEvent', async (eventId, { getState, dispatch, rejectWithValue }) => {
  const { token } = getState().eventpro.auth;
  if (!token) {
    dispatch(logout());
    toast.error('User is not authenticated');
    return rejectWithValue('User is not authenticated');
  }
  try {
    await axios.delete(`${apiConfig.eventpro}/events/${eventId}`, {
      headers: { 'x-auth-token': token },
    });
    toast.success('Event deleted successfully!');
    return eventId;
  } catch (error) {
    console.error('eventSlice.js - Error deleting event:', error);
    if (error.response?.status === 401) {
      dispatch(logout());
      toast.error('Session expired. Please log in again.');
    } else {
      toast.error(error.response?.data?.message || 'Failed to delete event');
    }
    return rejectWithValue(error.response?.data?.message || 'Failed to delete event');
  }
});

const eventSlice = createSlice({
  name: 'eventpro/events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Events
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Event
      .addCase(addEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events.push(action.payload);
      })
      .addCase(addEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Event
      .addCase(updateEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.events.findIndex((event) => event._id === action.payload._id);
        if (index !== -1) {
          state.events[index] = action.payload;
        }
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Event
      .addCase(deleteEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events = state.events.filter((event) => event._id !== action.payload);
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default eventSlice.reducer;
