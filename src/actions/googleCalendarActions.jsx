import axios from 'axios';
import { SYNC_GOOGLE_CALENDAR } from './types';

export const syncGoogleCalendar = (token) => async (dispatch) => {
    console.log('Token received in syncGoogleCalendar:', token); // Log the received token
    if (!token) {
        console.error('No token available for authentication');
        return;
    }
  
    try {
        const res = await axios.post('https://eventease-backend-api-16feb.onrender.com/api/google-calendar/sync', null, {
        headers: { 'x-auth-token': token }
        });
        const responseData = { ...res.data, token }; // Include token in the response data
        dispatch({ type: SYNC_GOOGLE_CALENDAR, payload: responseData });
        console.log(responseData);
    } catch (error) {
        console.error(error);
    }
};
