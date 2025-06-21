import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EventTable from '../components/EventTable';
import styled from 'styled-components';
import setAuthToken from '../utils/setAuthToken';
import { toast } from 'react-toastify';

const ListEventsPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.eventpro.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      console.log('ListEventsPage.jsx - Not authenticated, redirecting to /event-form');
      toast.error('Please log in to access this page.');
      navigate('/event-form', { replace: true });
    } else {
      const token = localStorage.getItem('eventproToken');
      if (token) {
        setAuthToken(token);
      } else {
        console.log('ListEventsPage.jsx - No token found, redirecting to /event-form');
        toast.error('Session expired. Please log in again.');
        navigate('/event-form', { replace: true });
      }
    }
  }, [isAuthenticated, navigate]);

  return (
    <PageWrapper>
      <Header>
        <Button onClick={() => navigate('/eventpro/add-event')}>Add Event</Button>
      </Header>
      <EventTable />
    </PageWrapper>
  );
};

export default ListEventsPage;

const PageWrapper = styled.div`
  background: url('https://sanjaybasket.s3.ap-south-1.amazonaws.com/background.webp') no-repeat center center fixed;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 20px;
`;

const Button = styled.div`
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
