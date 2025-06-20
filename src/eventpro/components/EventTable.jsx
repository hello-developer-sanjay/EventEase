import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEvent, fetchEvents } from '../../store/slices/eventpro/eventSlice';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { logout } from '../../store/slices/eventpro/authSlice';

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
  const events = useSelector((state) => state.eventpro.events.events);
  const { isAuthenticated } = useSelector((state) => state.eventpro.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/event-form', { replace: true });
    } else {
      dispatch(fetchEvents()).catch((error) => {
        if (error === 'User is not authenticated') {
          dispatch(logout());
          navigate('/event-form', { replace: true });
        }
      });
    }
  }, [dispatch, isAuthenticated, navigate]);

  const handleDelete = async (eventId) => {
    try {
      await dispatch(deleteEvent(eventId)).unwrap();
      toast.success('Event deleted successfully');
      dispatch(fetchEvents());
    } catch (error) {
      if (error === 'User is not authenticated') {
        dispatch(logout());
        navigate('/event-form', { replace: true });
      } else {
        toast.error('Error deleting event');
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
      />
    </TableContainer>
  );
};

export default EventTable;
