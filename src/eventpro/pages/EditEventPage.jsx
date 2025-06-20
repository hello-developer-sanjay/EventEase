import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import EventForm from '../components/EventForm';

const EditEventPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const eventToEdit = state?.eventToEdit;

  const clearEdit = () => {
    navigate('/eventpro/list-events', { replace: true });
  };

  return (
    <div>
      <EventForm eventToEdit={eventToEdit} clearEdit={clearEdit} />
    </div>
  );
};

export default EditEventPage;
