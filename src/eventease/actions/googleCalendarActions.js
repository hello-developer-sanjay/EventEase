// googleCalendarActions.js
import axios from 'axios';
import { SYNC_GOOGLE_CALENDAR } from './types';

export const syncGoogleCalendar = (token) => async (dispatch) => {
    console.log('Token received in syncGoogleCalendar:', token);
    if (!token) {
        console.error('No token available for authentication');
        return;
    }

    try {
        const res = await axios.post(
            'https://q0lvs5rnt9.execute-api.ap-south-1.amazonaws.com/prod/api/google-calendar/sync',
            {}, // Ensure the request body is empty or correctly formatted
            {
                headers: { 'x-auth-token': token }
            }
        );
        
        console.log('Response from API:', res.data);

        dispatch({
            type: SYNC_GOOGLE_CALENDAR,
            payload: res.data // Ensure the backend returns both access and refresh tokens
        });
    } catch (error) {
        console.error('Error syncing Google Calendar:', error.response?.data || error.message);
    }
};  