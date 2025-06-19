import axios from 'axios';

// Add Event
export const addEvent = (event) => async (dispatch) => {
    try {
        const response = await axios.post('https://eventmanager-api-19july.onrender.com/api/events', event);
        dispatch({
            type: 'ADD_EVENT',
            payload: response.data,
        });
    } catch (error) {
        console.error('Error adding event', error);
    }
};

// Update Event
// Update Event
export const updateEvent = (event) => async (dispatch) => {
    try {
        const response = await axios.put(`https://eventmanager-api-19july.onrender.com/api/events/${event._id}`, {
            eventName: event.eventName,
            eventType: event.eventType,
            startDate: event.startDate,
            endDate: event.endDate,
            description: event.description,
            handledBy: event.handledBy,
            organisation: event.organisation,
            totalSubEvents: event.totalSubEvents,
        });
        dispatch({
            type: 'UPDATE_EVENT',
            payload: response.data,
        });
    } catch (error) {
        console.error('Error updating event', error);
    }
};


// Delete Event
export const deleteEvent = (eventId) => async (dispatch) => {
    try {
        await axios.delete(`https://eventmanager-api-19july.onrender.com/api/events/${eventId}`);
        dispatch({
            type: 'DELETE_EVENT',
            payload: eventId,
        });
    } catch (error) {
        console.error('Error deleting event', error);
    }
};

// Fetch Events
// eventActions.jsx
export const fetchEvents = () => async (dispatch, getState) => {
    const { token } = getState().auth;

    if (!token) {
        console.error('User is not authenticated');
        return;
    }

    try {
        const response = await axios.get('https://eventmanager-api-19july.onrender.com/api/events', {
            headers: { 'x-auth-token': token }
        });
        dispatch({ type: 'FETCH_EVENTS_SUCCESS', payload: response.data });
    } catch (error) {
        console.error('Error fetching events', error);
    }
};