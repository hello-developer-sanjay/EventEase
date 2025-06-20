import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import apiConfig from '../../../shared/utils/apiConfig';

const initialState = {
  events: JSON.parse(localStorage.getItem('eventeaseEvents')) || [],
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
    localStorage.setItem('eventeaseEvents', JSON.stringify(res.data));
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to fetch events';
    console.error('getEvents error:', error, 'Response:', error.response);
    toast.error(message);
    const localEvents = JSON.parse(localStorage.getItem('eventeaseEvents')) || [];
    return localEvents;
  }
});

export const createEvent = createAsyncThunk('eventease/events/createEvent', async (eventData, { getState, rejectWithValue }) => {
  try {
    const { token, user } = getState().eventease.auth;
    const data = {
      ...eventData,
      userId: user?._id,
      start: new Date(eventData.start).toISOString(),
      end: new Date(eventData.end).toISOString(),
    };
    console.log('Creating event with data:', data, 'Token:', token);
    const res = await axios.post(`${apiConfig.eventease}/events/create`, data, {
      headers: { 'x-auth-token': token, 'Content-Type': 'application/json' },
    });
    console.log('Create event response:', res.data);
    const localEvents = JSON.parse(localStorage.getItem('eventeaseEvents')) || [];
    localEvents.push(res.data);
    localStorage.setItem('eventeaseEvents', JSON.stringify(localEvents));
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to create event';
    console.error('createEvent error:', error, 'Response:', error.response, 'EventData:', eventData);
    toast.error(message);
    const localEvents = JSON.parse(localStorage.getItem('eventeaseEvents')) || [];
    const newEvent = {
      ...eventData,
      _id: `local-${Date.now()}`,
      userId: user?._id,
      start: eventData.start ? new Date(eventData.start).toISOString() : new Date().toISOString(),
      end: eventData.end ? new Date(eventData.end).toISOString() : new Date().toISOString(),
    };
    localEvents.push(newEvent);
    localStorage.setItem('eventeaseEvents', JSON.stringify(localEvents));
    return newEvent;
  }
});

export const updateEvent = createAsyncThunk('eventease/events/updateEvent', async ({ id, eventData }, { getState, rejectWithValue }) => {
  try {
    const { token, user } = getState().eventease.auth;
    const data = {
      ...eventData,
      userId: user?._id,
      start: new Date(eventData.start).toISOString(),
      end: new Date(eventData.end).toISOString(),
    };
    console.log('Updating event with ID:', id, 'Data:', data);
    const res = await axios.put(`${apiConfig.eventease}/events/${id}`, data, {
      headers: { 'x-auth-token': token, 'Content-Type': 'application/json' },
    });
    const localEvents = JSON.parse(localStorage.getItem('eventeaseEvents')) || [];
    const index = localEvents.findIndex(event => event._id === id);
    if (index !== -1) {
      localEvents[index] = res.data;
      localStorage.setItem('eventeaseEvents', JSON.stringify(localEvents));
    }
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to update event';
    console.error('updateEvent error:', error, 'Response:', error.response);
    toast.error(message);
    return rejectWithValue(message);
  }
});

export const deleteEvent = createAsyncThunk('eventease/events/deleteEvent', async (id, { getState, rejectWithValue }) => {
  try {
    const { token } = getState().eventease.auth;
    console.log('Deleting event with ID:', id);
    await axios.delete(`${apiConfig.eventease}/events/${id}`, {
      headers: { 'x-auth-token': token },
    });
    const localEvents = JSON.parse(localStorage.getItem('eventeaseEvents')) || [];
    const updatedEvents = localEvents.filter(event => event._id !== id);
    localStorage.setItem('eventeaseEvents', JSON.stringify(updatedEvents));
    return id;
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to delete event';
    console.error('deleteEvent error:', error, 'Response:', error.response);
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
        state.events.push(action.payload);
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
