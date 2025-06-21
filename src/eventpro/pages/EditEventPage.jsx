import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import EventForm from '../components/EventForm';

const EditEventPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { eventToEdit } = location.state || {};

  const clearEdit = () => {
    navigate('/eventpro/list-events');
  };

  return (
    <div>
      <EventForm eventToEdit={eventToEdit} clearEdit={clearEdit} />
    </div>
  );
};

export default EditEventPage;
