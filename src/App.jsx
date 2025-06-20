import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth as setEventEaseAuth } from './store/slices/eventease/authSlice';
import { setAuth as setEventProAuth, loadUser as loadEventProUser } from './store/slices/eventpro/authSlice';
import Layout from './shared/components/Layout';
import ErrorBoundary from './shared/components/ErrorBoundary';
import { toast } from 'react-toastify';

// Home Page
import Home from './Home';

// EventEase Pages and Components
import Calendar from './eventease/components/Calendar';
import GoogleCalendarSync from './eventease/components/GoogleCalendarSync';
import Login from './eventease/pages/Login';

// EventPro Pages
import AddEventPage from './eventpro/pages/AddEventPage';
import ListEventsPage from './eventpro/pages/ListEventsPage';
import ForgotPassword from './eventpro/pages/ForgotPassword';
import ResetPassword from './eventpro/pages/ResetPassword';
import SignInSignUp from './eventpro/components/SignInSignUp';
import Register from './eventpro/pages/Register';
import Dashboard from './eventpro/pages/Dashboard';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated: easeAuthenticated } = useSelector(state => state.eventease.auth);
  const { isAuthenticated: proAuthenticated } = useSelector(state => state.eventpro.auth);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const user = searchParams.get('user');
    const token = searchParams.get('token');
    const platform = searchParams.get('platform') || 'eventease';

    console.log('Raw user query:', user);
    console.log('Raw token query:', token);
    console.log('Platform:', platform);
    console.log('Current path:', location.pathname);

    if (user && token) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(user));
        if (!parsedUser._id || !parsedUser.email) {
          throw new Error('Invalid user data structure');
        }
        if (platform === 'eventpro') {
          dispatch(setEventProAuth({ user: parsedUser, token }));
          navigate(parsedUser.role === 'admin' ? '/eventpro/dashboard' : '/eventpro', { replace: true });
        } else {
          dispatch(setEventEaseAuth({ user: parsedUser, token }));
          navigate(parsedUser.role === 'admin' ? '/admin-dashboard' : '/eventease', { replace: true });
        }
      } catch (error) {
        console.error('Error parsing user from query:', error, 'Raw user:', user);
        toast.error('Invalid user data format');
        navigate(`/${platform}/login`, { replace: true });
      }
    } else if (location.pathname.startsWith('/eventease') && !easeAuthenticated) {
      if (localStorage.getItem('eventeaseToken') && localStorage.getItem('user')) {
        try {
          const user = JSON.parse(localStorage.getItem('user') || '{}');
          if (user._id && user.email) {
            dispatch(setEventEaseAuth({ user, token: localStorage.getItem('eventeaseToken') }));
            console.log('Restored EventEase auth from localStorage');
          } else {
            throw new Error('Invalid localStorage user data');
          }
        } catch (error) {
          console.error('Error parsing localStorage user:', error);
          toast.error('Invalid stored user data');
          navigate('/eventease/login', { replace: true });
        }
      } else {
        navigate('/eventease/login', { replace: true });
      }
    } else if (location.pathname.startsWith('/eventpro') && !proAuthenticated) {
      if (localStorage.getItem('eventproToken') && localStorage.getItem('user')) {
        try {
          const user = JSON.parse(localStorage.getItem('user') || '{}');
          if (user._id && user.email) {
            dispatch(setEventProAuth({ user, token: localStorage.getItem('eventproToken') }));
            console.log('Restored EventPro auth from localStorage');
            dispatch(loadEventProUser()).catch(error => console.error('EventPro loadUser failed:', error));
          } else {
            throw new Error('Invalid localStorage user data');
          }
        } catch (error) {
          console.error('Error parsing localStorage user:', error);
          toast.error('Invalid stored user data');
          navigate('/eventpro/login', { replace: true });
        }
      } else {
        navigate('/eventpro/login', { replace: true });
      }
    }
  }, [dispatch, location.search, location.pathname, navigate, easeAuthenticated, proAuthenticated]);

  return (
    <ErrorBoundary>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/eventease" element={<Calendar />} />
          <Route path="/eventease/login" element={<Login />} />
          <Route path="/eventease/sync-google-calendar" element={<GoogleCalendarSync />} />
          <Route path="/eventease/create-event" element={<Calendar />} />
          <Route path="/eventpro" element={<AddEventPage />} />
          <Route path="/eventpro/add-event" element={<AddEventPage />} />
          <Route path="/eventpro/add-event/:id" element={<AddEventPage />} />
          <Route path="/eventpro/register" element={<Register />} />
          <Route path="/eventpro/forgot-password" element={<ForgotPassword />} />
          <Route path="/eventpro/reset-password/:token" element={<ResetPassword />} />
          <Route path="/eventpro/dashboard" element={<Dashboard />} />
          <Route path="/eventpro/login" element={<SignInSignUp />} />
          <Route path="/eventpro/list-events" element={<ListEventsPage />} />
        </Routes>
      </Layout>
    </ErrorBoundary>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
