import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../../store/slices/eventease/eventSlice';
import useAuth from '../hooks/useAuth';
import EventForm from './EventForm';
import GoogleCalendarSync from './GoogleCalendarSync';
import LoginPrompt from './LoginPrompt';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  margin: 20px;
`;

const Calendar = () => {
  const dispatch = useDispatch();
  const { user, loading, isAuthenticated, token, error: authError } = useAuth();
  const events = useSelector(state => state.eventease?.events?.events || []);
  const googleCalendarEvents = useSelector(state => state.eventease?.googleCalendar?.events || []);
  const eventError = useSelector(state => state.eventease?.events?.error);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventForm, setShowEventForm] = useState(false);

  useEffect(() => {
    if (isAuthenticated && token) {
      dispatch(getEvents());
    }
  }, [dispatch, isAuthenticated, token]);

  const handleSelectSlot = (slotInfo) => {
    setSelectedEvent({
      start: slotInfo.start,
      end: slotInfo.end,
      title: '',
      description: '',
      participants: '',
      date: '',
      time: '',
      duration: '',
      sessionNotes: '',
    });
    setShowEventForm(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setShowEventForm(true);
  };

  const handleCreateEvent = (eventData) => {
    dispatch(createEvent(eventData));
    setShowEventForm(false);
  };

  const handleUpdateEvent = (eventData) => {
    dispatch(updateEvent({ id: selectedEvent._id, eventData }));
    setShowEventForm(false);
  };

  const handleDeleteEvent = () => {
    dispatch(deleteEvent(selectedEvent._id));
    setShowEventForm(false);
  };

  if (loading) {
    return <LoginPrompt />;
  }

  if (!isAuthenticated) {
    return <LoginPrompt />;
  }

  if (authError || eventError) {
    return <ErrorMessage>Error: {authError || eventError}</ErrorMessage>;
  }

  const formatEvents = (events) => {
    return events.map(event => ({
      ...event,
      start: new Date(event.date || event.start),
      end: new Date(event.date || event.end),
    }));
  };

  const mergedEvents = formatEvents([...events, ...googleCalendarEvents]);

  return (
    <Container>
      <Title>My Calendar</Title>
      <BigCalendar
        localizer={momentLocalizer(moment)}
        events={mergedEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
      />
      {showEventForm && selectedEvent && (
        <EventForm
          event={selectedEvent}
          onClose={() => setShowEventForm(false)}
          onCreate={handleCreateEvent}
          onUpdate={handleUpdateEvent}
          onDelete={handleDeleteEvent}
        />
      )}
      <GoogleCalendarSync />
    </Container>
  );
};

export default Calendar;