import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EventTable from '../components/EventTable';
import styled from 'styled-components';
import setAuthToken from '../utils/setAuthToken';
import { toast } from 'react-toastify';

const ListEventsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.eventpro.auth);

  const searchParams = new URLSearchParams(location.search);
  const userParam = searchParams.get('user');
  const userPlatform = searchParams.get('platform');

  useEffect(() => {
    if (userParam && userPlatform === 'eventpro') {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(userParam));
        const token = localStorage.getItem('eventproToken');
        if (parsedUser._id && parsedUser.email && token && parsedUser.platform === 'eventpro') {
          setAuthToken(token);
          console.log('ListEventsPage.jsx - User verified from query:', parsedUser);
        } else {
          throw new Error('Invalid user data');
        }
      } catch (error) {
        console.error('ListEventsPage.jsx - Error verifying user:', error);
        toast.error('Invalid session. Please log in again.');
        navigate('/event-form', { replace: true });
      }
    }

    if (!isAuthenticated) {
      console.log('ListEventsPage.jsx - Not authenticated, redirecting to /event-form');
      toast.error('Please log in to access this page.');
      navigate('/event-form', { replace: true });
    }
  }, [isAuthenticated, navigate, location.search]);

  const handleAddEvent = () => {
    const userParam = encodeURIComponent(JSON.stringify(user));
    navigate(`/eventpro/add-event?platform=eventpro&user=${userParam}`);
  };

  return (
    <PageWrapper>
      <Header>
        <Button onClick={handleAddEvent}>Add Event</Button>
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
