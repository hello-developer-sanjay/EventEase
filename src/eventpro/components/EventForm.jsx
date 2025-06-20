import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addEvent, updateEvent } from '../../store/slices/eventpro/eventSlice';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const FormContainer = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #e6e6e6;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.9);
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 5px;
  color: #333;
`;

const InputField = styled.input`
  padding: 10px;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s;
  &:focus {
    border-color: #4a90e2;
    outline: none;
  }
`;

const SelectField = styled.select`
  padding: 10px;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  font-size: 16px;
  background-color: #fff;
  transition: border-color 0.3s;
  &:focus {
    border-color: #4a90e2;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  font-size: 16px;
  resize: none;
  transition: border-color 0.3s;
  &:focus {
    border-color: #4a90e2;
    outline: none;
  }
`;

const DatePickerWrapper = styled.div`
  .react-datepicker-wrapper {
    width: 100%;
  }
  .react-datepicker__input-container input {
    width: 100%;
    padding: 10px;
    border: 1px solid #e6e6e6;
    border-radius: 5px;
    font-size: 16px;
    &:focus {
      border-color: #4a90e2;
      outline: none;
    }
  }
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #4a90e2;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #357abd;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const EventForm = ({ eventToEdit, clearEdit }) => {
  const [event, setEvent] = useState({
    eventName: '',
    eventType: 'sports',
    startDate: new Date(),
    endDate: new Date(),
    description: '',
    handledBy: '',
    organisation: '',
    totalSubEvents: 0,
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (eventToEdit) {
      setEvent({
        eventName: eventToEdit.eventName || '',
        eventType: eventToEdit.eventType || 'sports',
        startDate: new Date(eventToEdit.startDate) || new Date(),
        endDate: new Date(eventToEdit.endDate) || new Date(),
        description: eventToEdit.description || '',
        handledBy: eventToEdit.handledBy || '',
        organisation: eventToEdit.organisation || '',
        totalSubEvents: eventToEdit.totalSubEvents || 0,
      });
    }
  }, [eventToEdit]);

  const validateForm = () => {
    const newErrors = {};
    if (!event.eventName) newErrors.eventName = 'Event name is required';
    if (!event.description) newErrors.description = 'Description is required';
    if (!event.handledBy) newErrors.handledBy = 'Handled by is required';
    if (!event.organisation) newErrors.organisation = 'Organisation is required';
    if (!event.totalSubEvents || event.totalSubEvents < 0) newErrors.totalSubEvents = 'Total sub-events must be a non-negative number';
    if (event.startDate > event.endDate) newErrors.endDate = 'End date must be after start date';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleDateChange = (date, name) => {
    setEvent({ ...event, [name]: date });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fix the form errors');
      return;
    }
    try {
      if (eventToEdit) {
        await dispatch(updateEvent({ ...event, _id: eventToEdit._id })).unwrap();
        toast.success('Event updated successfully');
        clearEdit();
      } else {
        await dispatch(addEvent(event)).unwrap();
        toast.success('Event added successfully');
        setEvent({
          eventName: '',
          eventType: 'sports',
          startDate: new Date(),
          endDate: new Date(),
          description: '',
          handledBy: '',
          organisation: '',
          totalSubEvents: 0,
        });
      }
    } catch (error) {
      toast.error('Failed to save event');
    }
  };

  return (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Event Name</Label>
          <InputField
            type="text"
            name="eventName"
            value={event.eventName}
            onChange={handleChange}
            placeholder="Enter event name"
            required
          />
          {errors.eventName && <ErrorMessage>{errors.eventName}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <Label>Event Type</Label>
          <SelectField name="eventType" value={event.eventType} onChange={handleChange}>
            <option value="sports">Sports</option>
            <option value="music">Music</option>
            <option value="general">General</option>
            <option value="children">Children</option>
            <option value="school">School</option>
          </SelectField>
        </FormGroup>
        <FormGroup>
          <Label>Start Date</Label>
          <DatePickerWrapper>
            <DatePicker
              selected={event.startDate}
              onChange={(date) => handleDateChange(date, 'startDate')}
              placeholderText="Select start date"
              dateFormat="MMMM d, yyyy"
              popperPlacement="bottom"
            />
          </DatePickerWrapper>
        </FormGroup>
        <FormGroup>
          <Label>End Date</Label>
          <DatePickerWrapper>
            <DatePicker
              selected={event.endDate}
              onChange={(date) => handleDateChange(date, 'endDate')}
              placeholderText="Select end date"
              dateFormat="MMMM d, yyyy"
              popperPlacement="bottom"
            />
          </DatePickerWrapper>
          {errors.endDate && <ErrorMessage>{errors.endDate}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <Label>Description</Label>
          <TextArea
            name="description"
            value={event.description}
            onChange={handleChange}
            placeholder="Enter event description"
            required
            rows="4"
          />
          {errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <Label>Handled By</Label>
          <InputField
            type="text"
            name="handledBy"
            value={event.handledBy}
            onChange={handleChange}
            placeholder="Enter handler name"
            required
          />
          {errors.handledBy && <ErrorMessage>{errors.handledBy}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <Label>Organisation</Label>
          <InputField
            type="text"
            name="organisation"
            value={event.organisation}
            onChange={handleChange}
            placeholder="Enter organisation"
            required
          />
          {errors.organisation && <ErrorMessage>{errors.organisation}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <Label>Total Sub-events</Label>
          <InputField
            type="number"
            name="totalSubEvents"
            value={event.totalSubEvents}
            onChange={handleChange}
            placeholder="Enter total sub-events"
            required
            min="0"
          />
          {errors.totalSubEvents && <ErrorMessage>{errors.totalSubEvents}</ErrorMessage>}
        </FormGroup>
        <Button type="submit">{eventToEdit ? 'Update Event' : 'Add Event'}</Button>
      </StyledForm>
    </FormContainer>
  );
};

EventForm.propTypes = {
  eventToEdit: PropTypes.shape({
    _id: PropTypes.string,
    eventName: PropTypes.string,
    eventType: PropTypes.string,
    startDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    endDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    description: PropTypes.string,
    handledBy: PropTypes.string,
    organisation: PropTypes.string,
    totalSubEvents: PropTypes.number,
  }),
  clearEdit: PropTypes.func.isRequired,
};

export default EventForm;
