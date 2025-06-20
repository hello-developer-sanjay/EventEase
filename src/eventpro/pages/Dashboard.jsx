import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, logout, clearError } from '../../store/slices/eventpro/authSlice';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background: url('https://sanjaybasket.s3.ap-south-1.amazonaws.com/background.webp') no-repeat center center fixed;
  background-size: cover;
`;

const Title = styled.h1`
  color: #fff;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  margin-bottom: 20px;
`;

const Info = styled.p`
  color: #fff;
  font-size: 18px;
  margin: 10px 0;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  &:hover {
    background-color: #45a049;
  }
`;

const LogoutButton = styled(Button)`
  background-color: #dc3545;
  &:hover {
    background-color: #c82333;
  }
`;

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, error } = useSelector((state) => state.eventpro.auth);

  useEffect(() => {
    console.log('Dashboard.jsx - Checking auth:', { isAuthenticated, user });
    const token = localStorage.getItem('eventproToken');
    if (token && !isAuthenticated) {
      dispatch(loadUser()).then(() => {
        console.log('Dashboard.jsx - loadUser success');
      }).catch((err) => {
        console.error('Dashboard.jsx - loadUser failed:', err);
        dispatch(logout());
        toast.error('Session expired. Please log in again.');
        navigate('/event-form', { replace: true });
      });
    }
    if (error) {
      console.log('Dashboard.jsx - Error:', error);
      toast.error(error);
      dispatch(clearError());
    }
  }, [dispatch, isAuthenticated, error, navigate]);

  if (!isAuthenticated || !user) {
    console.log('Dashboard.jsx - Not authenticated, redirecting to /event-form');
    navigate('/event-form', { replace: true });
    return null;
  }

  const handleLogout = () => {
    console.log('Dashboard.jsx - Logging out');
    dispatch(logout());
    toast.success('Logged out successfully.');
    navigate('/event-form', { replace: true });
  };

  return (
    <Container>
      <Title>EventPro Dashboard</Title>
      <Info>Welcome, {user.name}!</Info>
      <Info>Email: {user.email}</Info>
      <Info>Role: {user.role}</Info>
      <Button onClick={() => navigate('/eventpro/list-events')}>View Events</Button>
      <Button onClick={() => navigate('/eventpro/add-event')}>Add Event</Button>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </Container>
  );
};

export default Dashboard;
