import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EventForm from '../components/EventForm';
import setAuthToken from '../utils/setAuthToken';
import { toast } from 'react-toastify';

const EditEventPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.eventpro.auth);
  const { eventToEdit } = location.state || {};

  const searchParams = new URLSearchParams(location.search);
  const userParam = searchParams.get('user');
  const userPlatform = searchParams.get('platform');

  if (!isAuthenticated) {
    console.log('EditEventPage.jsx - Not authenticated, redirecting to /event-form');
    toast.error('Please log in to access this page.');
    navigate('/event-form', { replace: true });
    return null;
  }

  if (userParam && userPlatform === 'eventpro') {
    try {
      const parsedUser = JSON.parse(decodeURIComponent(userParam));
      const token = localStorage.getItem('eventproToken');
      if (parsedUser._id && parsedUser.email && token && parsedUser.platform === 'eventpro') {
        setAuthToken(token);
        console.log('EditEventPage.jsx - User verified from query:', parsedUser);
      } else {
        throw new Error('Invalid user data');
      }
    } catch (error) {
      console.error('EditEventPage.jsx - Error verifying user:', error);
      toast.error('Invalid session. Please log in again.');
      navigate('/event-form', { replace: true });
      return null;
    }
  }

  const clearEdit = () => {
    const userParam = encodeURIComponent(JSON.stringify(user));
    navigate(`/eventpro/list-events?platform=eventpro&user=${userParam}`);
  };

  return (
    <div>
      <EventForm eventToEdit={eventToEdit} clearEdit={clearEdit} />
    </div>
  );
};

export default EditEventPage;
