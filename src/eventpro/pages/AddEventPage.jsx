import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EventForm from '../components/EventForm';
import setAuthToken from '../utils/setAuthToken';
import { toast } from 'react-toastify';

const AddEventPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.eventpro.auth);
  const eventToEdit = location.state?.eventToEdit || null;

  const searchParams = new URLSearchParams(location.search);
  const userParam = searchParams.get('user');
  const userPlatform = searchParams.get('platform');

  if (!isAuthenticated) {
    console.log('AddEventPage.jsx - Not authenticated, redirecting to /event-form');
    toast.error('Please log in to access this page.');
    navigate('/event-form', { replace: true });
    return null;
  }

  if (userParam && userPlatform === 'eventpro') {
    try {
      const parsedUser = JSON.parse(decodeURIComponent(userParam));
      const token = localStorage.getItem('eventproToken');
      if (parsedUser._id && parsedUser.email && token && parsedUser.platform === 'eventpro') {
        setAuthToken(token);
        console.log('AddEventPage.jsx - User verified from query:', parsedUser);
      } else {
        throw new Error('Invalid user data');
      }
    } catch (error) {
      console.error('AddEventPage.jsx - Error verifying user:', error);
      toast.error('Invalid session. Please log in again.');
      navigate('/event-form', { replace: true });
      return null;
    }
  }

  const clearEdit = () => {
    const userParam = encodeURIComponent(JSON.stringify(user));
    navigate(`/eventpro/dashboard?platform=eventpro&user=${userParam}`);
  };

  return (
    <PageWrapper>
      <Header>
        <Button onClick={() => clearEdit()}>View Events</Button>
      </Header>
      <Content>
        <EventForm eventToEdit={eventToEdit} clearEdit={clearEdit} />
      </Content>
    </PageWrapper>
  );
};

export default AddEventPage;

const PageWrapper = styled.div`
  background: url('https://sanjaybasket.s3.ap-south-1.amazonaws.com/background.webp') no-repeat center center fixed;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const Content = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
  margin: 20px;
`;
