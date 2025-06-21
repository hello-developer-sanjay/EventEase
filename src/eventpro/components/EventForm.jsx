import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEvent, updateEvent } from '../../store/slices/eventpro/eventSlice';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import setAuthToken from '../utils/setAuthToken';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 500px;
  margin: 0 auto;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  resize: vertical;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #45a049;
  }
`;

const CancelButton = styled(Button)`
  background-color: #dc3545;
  &:hover {
    background-color: #c82333;
  }
`;

const EventForm = ({ eventToEdit, clearEdit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, token } = useSelector((state) => state.eventpro.auth);
  const { loading, error } = useSelector((state) => state.eventpro.events);

  const [formData, setFormData] = useState({
    eventName: eventToEdit?.eventName || '',
    eventType: eventToEdit?.eventType || '',
    startDate: eventToEdit?.startDate ? new Date(eventToEdit.startDate).toISOString().split('T')[0] : '',
    endDate: eventToEdit?.endDate ? new Date(eventToEdit.endDate).toISOString().split('T')[0] : '',
    description: eventToEdit?.description || '',
    handledBy: eventToEdit?.handledBy || '',
    organisation: eventToEdit?.organisation || '',
    totalSubEvents: eventToEdit?.totalSubEvents || 0,
  });

  useEffect(() => {
    if (!isAuthenticated || !token) {
      console.log('EventForm.jsx - Not authenticated or no token, redirecting to /event-form');
      toast.error('Please log in to access this page.');
      navigate('/event-form', { replace: true });
    }
    if (error) {
      console.log('EventForm.jsx - Error:', error);
      toast.error(error);
    }
  }, [dispatch, isAuthenticated, error, navigate, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!token) {
        throw new Error('No token found');
      }
      setAuthToken(token);
      console.log('EventForm.jsx - Submitting form with token:', token);
      if (eventToEdit) {
        await dispatch(updateEvent({ ...formData, _id: eventToEdit._id })).unwrap();
      } else {
        await dispatch(addEvent(formData)).unwrap();
      }
      navigate('/eventpro/list-events');
    } catch (error) {
      console.error('EventForm.jsx - Error submitting form:', error);
      if (error === 'User is not authenticated') {
        navigate('/event-form', { replace: true });
      } else {
        toast.error(error || 'Failed to save event');
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="eventName"
        value={formData.eventName}
        onChange={handleChange}
        placeholder="Event Name"
        required
      />
      <Input
        type="text"
        name="eventType"
        value={formData.eventType}
        onChange={handleChange}
        placeholder="Event Type"
        required
      />
      <Input
        type="date"
        name="startDate"
        value={formData.startDate}
        onChange={handleChange}
        required
      />
      <Input
        type="date"
        name="endDate"
        value={formData.endDate}
        onChange={handleChange}
        required
      />
      <TextArea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        rows="4"
      />
      <Input
        type="text"
        name="handledBy"
        value={formData.handledBy}
        onChange={handleChange}
        placeholder="Handled By"
      />
      <Input
        type="text"
        name="organisation"
        value={formData.organisation}
        onChange={handleChange}
        placeholder="Organisation"
      />
      <Input
        type="number"
        name="totalSubEvents"
        value={formData.totalSubEvents}
        onChange={handleChange}
        placeholder="Total Sub-events"
        min="0"
      />
      <Button type="submit" disabled={loading}>
        {eventToEdit ? 'Update Event' : 'Add Event'}
      </Button>
      <CancelButton type="button" onClick={clearEdit}>
        Cancel
      </CancelButton>
    </Form>
  );
};

export default EventForm;
