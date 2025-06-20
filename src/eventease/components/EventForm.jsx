import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import moment from 'moment';

const ModalOverlay = styled.div`
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

const ModalContent = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  resize: vertical;
`;

const Button = styled.button`
  padding: 0.75rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background: #0056b3;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 0.875rem;
  margin: 0;
`;

const EventForm = ({ event, onClose, onCreate, onUpdate, onDelete }) => {
  const [formData, setFormData] = useState({
    title: event?.title || '',
    description: event?.description || '',
    participants: event?.participants || '',
    date: event?.date || moment(event?.start).format('YYYY-MM-DD'),
    time: event?.time || moment(event?.start).format('HH:mm'),
    duration: event?.duration || '30',
    sessionNotes: event?.sessionNotes || '',
    start: event?.start || new Date(),
    end: event?.end || new Date(moment(event?.start).add(30, 'minutes')),
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.duration || isNaN(parseInt(formData.duration)) || parseInt(formData.duration) <= 0) {
      newErrors.duration = 'Valid duration (minutes) is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data before validation:', formData); // Debug
    if (!validateForm()) return;

    const eventData = {
      ...formData,
      duration: parseInt(formData.duration),
      start: new Date(`${formData.date}T${formData.time}`),
      end: new Date(moment(`${formData.date}T${formData.time}`).add(parseInt(formData.duration), 'minutes')),
      userId: event?.userId,
    };
    console.log('Submitting event data:', eventData); // Debug

    if (event?._id) {
      onUpdate(eventData);
    } else {
      onCreate(eventData);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
      >
        <CloseButton onClick={onClose}>
          <FaTimes />
        </CloseButton>
        <Form onSubmit={handleSubmit}>
          <h2>{event?._id ? 'Edit Event' : 'Create Event'}</h2>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Event Title"
          />
          {errors.title && <ErrorText>{errors.title}</ErrorText>}
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
          />
          {errors.date && <ErrorText>{errors.date}</ErrorText>}
          <Input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
          />
          {errors.time && <ErrorText>{errors.time}</ErrorText>}
          <Input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Duration (minutes)"
            min="1"
          />
          {errors.duration && <ErrorText>{errors.duration}</ErrorText>}
          <TextArea
            name="sessionNotes"
            value={formData.sessionNotes}
            onChange={handleChange}
            placeholder="Session Notes"
            rows="4"
          />
          <Button type="submit">{event?._id ? 'Update Event' : 'Create Event'}</Button>
          {event?._id && <Button type="button" onClick={onDelete}>Delete Event</Button>}
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default EventForm;
