import React, { useState } from 'react';
import EventTable from '../components/EventTable';
import EventForm from '../components/EventForm'; // Import EventForm component
import { useNavigate } from 'react-router-dom';

const ListEventsPage = () => {
    const [editEvent, setEditEvent] = useState(null);
    const navigate = useNavigate();

    const clearEdit = () => setEditEvent(null);

    return (
        <div>
            <button onClick={() => navigate('/add-event')}>Add Event</button>
            <EventTable setEditEvent={setEditEvent} />
            {/* Render EventForm if editEvent is not null */}
            {editEvent && <EventForm eventToEdit={editEvent} clearEdit={clearEdit} />}
        </div>
    );
};

export default ListEventsPage;