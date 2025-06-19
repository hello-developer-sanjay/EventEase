import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';

const FormContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
`;

const Button = styled.button`
  padding: 10px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

const SubmitButton = styled(Button)`
  background-color: #2c3e50;
  color: white;
`;

const DeleteButton = styled(Button)`
  background-color: #e74c3c;
  color: white;
`;

const CancelButton = styled(Button)`
  background-color: #95a5a6;
  color: white;
`;

const EventForm = ({ event, onClose, onCreate, onUpdate, onDelete }) => {
  const [formData, setFormData] = useState({
    title: event.title || '',
    description: event.description || '',
    participants: event.participants || '',
    date: event.date || moment(event.start).format('YYYY-MM-DD'),
    time: event.time || moment(event.start).format('HH:mm'),
    duration: event.duration || '',
    sessionNotes: event.sessionNotes || '',
    start: event.start,
    end: event.end,
    userId: event.userId,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const start = new Date(`${formData.date}T${formData.time}`);
    const end = formData.duration
      ? new Date(start.getTime() + parseInt(formData.duration) * 60 * 1000)
      : new Date(start.getTime() + 60 * 60 * 1000); // Default 1 hour

    const eventData = {
      title: formData.title,
      description: formData.description,
      participants: formData.participants,
      start,
      end,
      userId: formData.userId,
      sessionNotes: formData.sessionNotes,
    };

    if (event._id) {
      onUpdate(eventData);
    } else {
      onCreate(eventData);
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <h2>{event._id ? 'Edit Event' : 'Create Event'}</h2>
        <Input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Event Title"
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
          name="participants"
          value={formData.participants}
          onChange={handleChange}
          placeholder="Participants (emails)"
        />
        <Input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <Input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
        <Input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          placeholder="Duration (minutes)"
          min="1"
        />
        <TextArea
          name="sessionNotes"
          value={formData.sessionNotes}
          onChange={handleChange}
          placeholder="Session Notes"
          rows="4"
        />
        <SubmitButton type="submit">{event._id ? 'Update' : 'Create'}</SubmitButton>
        {event._id && <DeleteButton type="button" onClick={onDelete}>Delete</DeleteButton>}
        <CancelButton type="button" onClick={onClose}>Cancel</CancelButton>
      </Form>
    </FormContainer>
  );
};

export default EventForm;
