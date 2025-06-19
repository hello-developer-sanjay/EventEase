import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadUser as loadEventEaseUser } from './store/slices/eventease/authSlice';
import { loadUser as loadEventProUser } from './store/slices/eventpro/authSlice';
import Layout from './shared/components/Layout';
import ErrorBoundary from './shared/components/ErrorBoundary';

// EventEase Pages and Components
import Calendar from './eventease/components/Calendar';
import EventForm from './eventease/components/EventForm';
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
  const location = useLocation();

  useEffect(() => {
    // Parse query parameters
    const searchParams = new URLSearchParams(location.search);
    const user = searchParams.get('user');
    const token = searchParams.get('token');

    if (user && token) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(user));
        localStorage.setItem('eventeaseToken', token);
        localStorage.setItem('user', JSON.stringify(parsedUser));
        dispatch(loadEventEaseUser());
      } catch (error) {
        console.error('Error parsing user from query:', error);
      }
    }

    // Load users for both apps
    try {
      dispatch(loadEventEaseUser()).catch(error => console.error('EventEase loadUser failed:', error));
      dispatch(loadEventProUser()).catch(error => console.error('EventPro loadUser failed:', error));
    } catch (error) {
      console.error('Error dispatching loadUser actions:', error);
    }
  }, [dispatch, location.search]);

  return (
    <ErrorBoundary>
      <Layout>
        <Routes>
          {/* EventEase Routes */}
          <Route path="/eventease" element={<Calendar />} />
          <Route path="/eventease/create-event" element={<EventForm />} />
          <Route path="/eventease/login" element={<Login />} />
          <Route path="/eventease/sync-google-calendar" element={<GoogleCalendarSync />} />

          {/* EventPro Routes */}
          <Route path="/eventpro" element={<AddEventPage />} />
          <Route path="/eventpro/add-event" element={<AddEventPage />} />
          <Route path="/eventpro/add-event/:id" element={<AddEventPage />} />
          <Route path="/eventpro/register" element={<Register />} />
          <Route path="/eventpro/forgot-password" element={<ForgotPassword />} />
          <Route path="/eventpro/reset-password/:token" element={<ResetPassword />} />
          <Route path="/eventpro/dashboard" element={<Dashboard />} />
          <Route path="/eventpro/login" element={<SignInSignUp />} />
          <Route path="/eventpro/list-events" element={<ListEventsPage />} />

          {/* Default Route */}
          <Route path="/" element={<Calendar />} />
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
