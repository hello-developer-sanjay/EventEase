
// googleCalenderSync.jsx
import { useDispatch } from 'react-redux';
import { syncGoogleCalendar } from '../../store/slices/eventease/googleCalendarSlice';
import useAuth from '../hooks/useAuth';

const GoogleCalendarSync = () => {
    const { token, isAuthenticated } = useAuth();

    const dispatch = useDispatch();

    const handleSync = () => {
        if (isAuthenticated && token) {
            console.log('Token:', token); // Log the token to check if it's obtained
            dispatch(syncGoogleCalendar(token)); // Pass the token to the action creator
        } else {
            console.error('No token available for authentication');
        }
    };

    return (
        <button onClick={handleSync}>Sync with Google Calendar</button>
    );
};

export default GoogleCalendarSync;
