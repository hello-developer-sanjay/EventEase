import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  display: ${props => (props.show ? 'block' : 'none')};
  z-index: 1000;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${props => (props.show ? 'block' : 'none')};
  z-index: 999;
`;

const Title = styled.h3`
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #777;
`;

const EventForm = ({ event, onClose, onCreate, onUpdate, onDelete }) => {
  const [formData, setFormData] = useState({
    title: event.title,
    description: event.description,
    participants: Array.isArray(event.participants) ? event.participants.join(', ') : '',
    date: event.date,
    time: event.time,
    duration: event.duration,
    sessionNotes: event.sessionNotes,
  });

  useEffect(() => {
    setFormData({
      title: event.title,
      description: event.description,
      participants: Array.isArray(event.participants) ? event.participants.join(', ') : '',
      date: event.date,
      time: event.time,
      duration: event.duration,
      sessionNotes: event.sessionNotes,
    });
  }, [event]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedEvent = {
      ...formData,
      participants: formData.participants.split(',').map(p => p.trim()),
    };
    if (event._id) {
      onUpdate(updatedEvent);
    } else {
      onCreate(updatedEvent);
    }
  };

  return (
    <>
      <Backdrop show={true} onClick={onClose} />
      <FormContainer show={true}>
        <Title>{event._id ? 'Update Event' : 'Create Event'}</Title>
        <CloseButton onClick={onClose}>×</CloseButton>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Participants</Label>
            <Input
              type="text"
              name="participants"
              value={formData.participants}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Date</Label>
            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Time</Label>
            <Input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Duration (in minutes)</Label>
            <Input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Session Notes</Label>
            <TextArea
              name="sessionNotes"
              value={formData.sessionNotes}
              onChange={handleChange}
            />
          </FormGroup>
          <div>
            <Button type="submit">{event._id ? 'Update' : 'Create'}</Button>
            <Button type="button" onClick={onClose}>Cancel</Button>
            {event._id && (
              <Button type="button" onClick={onDelete}>Delete</Button>
            )}
          </div>
        </form>
      </FormContainer>
    </>
  );
};

export default EventForm;