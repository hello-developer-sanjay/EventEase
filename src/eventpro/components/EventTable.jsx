import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEvent, fetchEvents } from '../../store/slices/eventpro/eventSlice';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import setAuthToken from '../utils/setAuthToken';

const TableContainer = styled.div`
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const ActionButton = styled.button`
  padding: 8px 12px;
  margin: 0 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
  &:hover {
    opacity: 0.8;
  }
`;

const EditButton = styled(ActionButton)`
  background-color: #4a90e2;
  color: white;
  &:hover {
    background-color: #357abd;
  }
`;

const DeleteButton = styled(ActionButton)`
  background-color: #e74c3c;
  color: white;
  &:hover {
    background-color: #c0392b;
  }
`;

const EventTable = () => {
  const events = useSelector((state) => state.eventpro.events.events || []);
  const { isAuthenticated, token } = useSelector((state) => state.eventpro.auth);
  const { error } = useSelector((state) => state.eventpro.events);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !token) {
      console.log('EventTable.jsx - Not authenticated or no token, redirecting to /event-form');
      toast.error('Please log in to access this page.');
      navigate('/event-form', { replace: true });
    } else {
      setAuthToken(token);
      console.log('EventTable.jsx - Fetching events with token:', token);
      dispatch(fetchEvents()).catch(error => {
        console.error('EventTable.jsx - fetchEvents failed:', error);
        if (error === 'User is not authenticated') {
          navigate('/event-form', { replace: true });
        } else {
          toast.error('Failed to load events. Please try again.');
        }
      });
    }
    if (error) {
      console.log('EventTable.jsx - Error:', error);
      toast.error(error);
    }
  }, [dispatch, isAuthenticated, navigate, token, error]);

  const handleDelete = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        setAuthToken(token);
        await dispatch(deleteEvent(eventId)).unwrap();
        toast.success('Event deleted successfully');
      } catch (error) {
        console.error('EventTable.jsx - Error deleting event:', error);
        toast.error(error || 'Failed to delete event');
      }
    }
  };

  const handleEdit = (event) => {
    navigate(`/eventpro/add-event/${event._id}`, { state: { eventToEdit: event } });
  };

  const columns = [
    {
      name: 'Event Name',
      selector: (row) => row.eventName,
      sortable: true,
    },
    {
      name: 'Event Type',
      selector: (row) => row.eventType,
      sortable: true,
    },
    {
      name: 'Start Date',
      selector: (row) => format(new Date(row.startDate), 'MMMM d, yyyy'),
      sortable: true,
    },
    {
      name: 'End Date',
      selector: (row) => format(new Date(row.endDate), 'MMMM d, yyyy'),
      sortable: true,
    },
    {
      name: 'Description',
      selector: (row) => row.description,
      sortable: true,
      wrap: true,
    },
    {
      name: 'Handled By',
      selector: (row) => row.handledBy,
      sortable: true,
    },
    {
      name: 'Organisation',
      selector: (row) => row.organisation,
      sortable: true,
    },
    {
      name: 'Sub-events',
      selector: (row) => row.totalSubEvents,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div>
          <EditButton onClick={() => handleEdit(row)}>Edit</EditButton>
          <DeleteButton onClick={() => handleDelete(row._id)}>Delete</DeleteButton>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <TableContainer>
      <Helmet>
        <title>EventPro: Your Event, Perfectly Planned</title>
        <meta name="description" content="EventPro simplifies event planning with seamless organization, real-time updates, and easy collaboration." />
        <meta name="keywords" content="event management, EventPro, event planning, event organizer" />
        <meta name="author" content="Sanjay Patidar" />
      </Helmet>
      <DataTable
        columns={columns}
        data={events}
        pagination
        highlightOnHover
        responsive
        noDataComponent="No events found."
      />
    </TableContainer>
  );
};

export default EventTable;
