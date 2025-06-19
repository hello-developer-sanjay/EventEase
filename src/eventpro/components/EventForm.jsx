import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addEvent, updateEvent } from '../../store/slices/eventpro/eventSlice';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FormContainer = styled.div`
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #e6e6e6;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    background: url('https://sanjaybasket.s3.ap-south-1.amazonaws.com/background.webp') no-repeat center center fixed;
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
`;

const InputField = styled.input`
    padding: 10px;
    margin: 10px 0;
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
    margin: 10px 0;
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
    margin: 10px 0;
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

const Button = styled.button`
    padding: 10px;
    margin-top: 20px;
    border: none;
    border-radius: 5px;
    background-color: #4a90e2;
    color: white;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #357ABD;
    }
`;

// Main component
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

    useEffect(() => {
        if (eventToEdit) {
            setEvent({
                ...eventToEdit,
                startDate: new Date(eventToEdit.startDate),
                endDate: new Date(eventToEdit.endDate),
            });
        }
    }, [eventToEdit]);

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setEvent({ ...event, [e.target.name]: e.target.value });
    };

    const handleDateChange = (date, name) => {
        setEvent({ ...event, [name]: date });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (eventToEdit) {
            dispatch(updateEvent({ ...event, _id: eventToEdit._id }));
            clearEdit();
        } else {
            dispatch(addEvent(event));
        }
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
    };

    return (
        <FormContainer>
            <StyledForm onSubmit={handleSubmit}>
                <InputField
                    type="text"
                    name="eventName"
                    value={event.eventName}
                    onChange={handleChange}
                    placeholder="Event Name"
                    required
                />
                <SelectField name="eventType" value={event.eventType} onChange={handleChange}>
                    <option value="sports">Sports</option>
                    <option value="music">Music</option>
                    <option value="general">General</option>
                    <option value="children">Children</option>
                    <option value="school">School</option>
                </SelectField>
                <DatePicker
                    selected={event.startDate}
                    onChange={(date) => handleDateChange(date, 'startDate')}
                    placeholderText="Select Start Date"
                    className="date-picker"
                    dateFormat="MMMM d, yyyy"
                    popperPlacement="bottom"
                />
                <DatePicker
                    selected={event.endDate}
                    onChange={(date) => handleDateChange(date, 'endDate')}
                    placeholderText="Select End Date"
                    className="date-picker"
                    dateFormat="MMMM d, yyyy"
                    popperPlacement="bottom"
                />
                <TextArea
                    name="description"
                    value={event.description}
                    onChange={handleChange}
                    placeholder="Event Description"
                    required
                    rows="4"
                />
                <InputField
                    type="text"
                    name="handledBy"
                    value={event.handledBy}
                    onChange={handleChange}
                    placeholder="Handled By"
                    required
                />
                <InputField
                    type="text"
                    name="organisation"
                    value={event.organisation}
                    onChange={handleChange}
                    placeholder="Organisation"
                    required
                />
                <InputField
                    type="number"
                    name="totalSubEvents"
                    value={event.totalSubEvents}
                    onChange={handleChange}
                    placeholder="Total Sub-events"
                    required
                />
                <Button type="submit">Save Event</Button>
            </StyledForm>
        </FormContainer>
    );
};

// PropTypes validation
EventForm.propTypes = {
    eventToEdit: PropTypes.shape({
        _id: PropTypes.string,
        eventName: PropTypes.string,
        eventType: PropTypes.string,
        startDate: PropTypes.instanceOf(Date),
        endDate: PropTypes.instanceOf(Date),
        description: PropTypes.string,
        handledBy: PropTypes.string,
        organisation: PropTypes.string,
        totalSubEvents: PropTypes.number,
    }),
    clearEdit: PropTypes.func.isRequired,
};

export default EventForm;