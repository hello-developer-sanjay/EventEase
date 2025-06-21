import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EventForm from '../components/EventForm';
import setAuthToken from '../utils/setAuthToken';
import { toast } from 'react-toastify';

const EditEventPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.eventpro.auth);
  const { eventToEdit } = location.state || {};

  if (!isAuthenticated) {
    console.log('EditEventPage.jsx - Not authenticated, redirecting to /event-form');
    toast.error('Please log in to access this page.');
    navigate('/event-form', { replace: true });
    return null;
  }

  const token = localStorage.getItem('eventproToken');
  if (token) {
    setAuthToken(token);
  } else {
    console.log('EditEventPage.jsx - No token found, redirecting to /event-form');
    toast.error('Session expired. Please log in again.');
    navigate('/event-form', { replace: true });
    return null;
  }

  const clearEdit = () => navigate('/eventpro/list-events');

  return (
    <div>
      <EventForm eventToEdit={eventToEdit} clearEdit={clearEdit} />
    </div>
  );
};

export default EditEventPage;
