import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { logout } from '../../store/slices/eventpro/authSlice';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const WelcomeMessage = styled.h2`
  font-family: 'Cinzel Decorative', cursive;
  color: #d4af37;
  text-align: center;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin: 10px;
  &:hover {
    background-color: #357abd;
  }
`;

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.eventpro.auth);

  console.log('Dashboard.jsx - Checking auth:', { isAuthenticated, user });

  useEffect(() => {
    if (!isAuthenticated || !user) {
      console.log('Dashboard.jsx - Not authenticated, redirecting to /event-form');
      dispatch(logout());
      toast.error('Please log in to access the dashboard.');
      navigate('/event-form', { replace: true });
    }
  }, [isAuthenticated, user, dispatch, navigate]);

  if (!isAuthenticated || !user) {
    return null; // Prevent rendering until redirect
  }

  const handleViewEvents = () => {
    navigate('/eventpro/list-events');
  };

  const handleAddEvent = () => {
    navigate('/eventpro/add-event');
  };

  return (
    <DashboardContainer>
      <WelcomeMessage>Welcome, {user.name}!</WelcomeMessage>
      <div style={{ textAlign: 'center' }}>
        <Button onClick={handleViewEvents}>View Events</Button>
        <Button onClick={handleAddEvent}>Add Event</Button>
        {user.role === 'admin' && (
          <Button onClick={() => navigate('/eventpro/admin-dashboard')}>
            Admin Dashboard
          </Button>
        )}
      </div>
    </DashboardContainer>
  );
};

export default Dashboard;
