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
import { toast } from 'react-toastify';

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
  const [selectedEvent, setSelectedEvent ] = useState(null);
  const [showEventForm, setShowEventForm] = useState(false);

  useEffect(() => {
    if (isAuthenticated && token && user?._id) {
      dispatch(getEvents());
    }
  }, [dispatch, isAuthenticated, token, user?._id]);

  const handleSelectSlot = ({ start, end }) => {
    setSelectedEvent({
      start,
      end,
      title: '',
      description: '',
      participants: user?.email || '',
      date: moment(start).format('YYYY-MM-DD'),
      time: moment(start).format('HH:mm'),
      duration: '30',
      sessionNotes: '',
      userId: user?._id,
    });
    setShowEventForm(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent({
      ...event,
      date: moment(event.start).format('YYYY-MM-DD'),
      time: moment(event.start).format('HH:mm'),
      duration: event.duration || '30',
      userId: user?._id,
    });
    setShowEventForm(true);
  };

  const handleCreateEvent = async (eventData) => {
    try {
      const action = await dispatch(createEvent(eventData));
      if (createEvent.fulfilled.match(action)) {
        toast.success('Event created successfully');
        setShowEventForm(false);
      } else {
        toast.error(action.payload || 'Failed to create event');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to create event');
      }
    };

  const handleUpdateEvent = async (eventData) => {
      try {
        const action = await dispatch(updateEvent({ id: selectedEvent._id, eventData }));
        if (updateEvent.fulfilled.match(action)) {
          toast.success('Event updated successfully');
          setShowEventForm(false);
        } else {
          toast.error(action.payload || 'Failed to update event');
        }
      } catch (error) {
        toast.error(error.message || 'Failed to update event');
      }
      };

      if (loading) {
        return <LoginPrompt />;
      }

      if (!isAuthenticated || !user?.user_id) {
        return <LoginPrompt />;
      }

      if (authError || eventError) {
        return <ErrorMessage>Error: {authError || eventError}</ErrorMessage>;
      }

      const formatEvents = (events) => {
        console.log('Formatting events:', events);
        return events
          .filter(event => event && (typeof event === 'object' && (event.start || event.date))) // Ensure valid objects
          .map(event => {
            const start = event.start || event.date;
            const end = event?.end || event.date;
            return {
              ...event,
              start: start ? new Date(start) : new Date(),
              end: end ? new Date(end) : new Date(start),
            };
          })
          .filter(event => event.start && event.end && !isNaN(event.start.getTime()) && !isNaN(event.end.getTime()));
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
