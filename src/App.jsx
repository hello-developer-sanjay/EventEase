import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from './store/slices/eventpro/authSlice';
import Layout from './shared/components/Layout';
import ErrorBoundary from './shared/components/ErrorBoundary';
import { toast } from 'react-toastify';

// Home Page
import Home from './Home';

// EventEase Pages
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

const PrivateRoute = ({ element }) => {
  const dispatch = useDispatch();
  const { isAuthenticated: proAuthenticated, user: proUser } = useSelector((state) => state.eventpro.auth);
  const token = localStorage.getItem('eventproToken');
  const user = localStorage.getItem('eventproUser');

  console.log('PrivateRoute - Checking auth:', { proAuthenticated, proUser, token });

  if (!proAuthenticated || !token || !user) {
    console.log('PrivateRoute - Not authenticated, redirecting to /event-form');
    if (token || user) {
      dispatch(logout());
      toast.error('Session invalid. Please log in again.');
    }
    return <Navigate to="/event-form" replace />;
  }

  try {
    const userData = JSON.parse(user);
    if (!userData._id || !userData.email || userData.platform !== 'eventpro') {
      console.error('PrivateRoute - Invalid user data:', userData);
      dispatch(logout());
      toast.error('Invalid user data. Please log in again.');
      return <Navigate to="/event-form" replace />;
    }
    return element;
  } catch (error) {
    console.error('PrivateRoute - Error parsing user data:', error);
    dispatch(logout());
    toast.error('Invalid user data. Please log in again.');
    return <Navigate to="/event-form" replace />;
  }
};

const App = () => {
  const { isAuthenticated: easeAuthenticated } = useSelector((state) => state.eventease.auth);

  console.log('App.jsx - Rendering:', { easeAuthenticated });

  return (
    <ErrorBoundary>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* EventEase Routes */}
          <Route
            path="/eventease"
            element={easeAuthenticated ? <Calendar /> : <Navigate to="/eventease/login" replace />}
          />
          <Route path="/eventease/login" element={<Login />} />
          <Route path="/eventease/sync-google-calendar" element={<GoogleCalendarSync />} />
          <Route path="/eventease/create-event" element={<Calendar />} />
          {/* EventPro Routes */}
          <Route path="/eventpro" element={<PrivateRoute element={<ListEventsPage />} />} />
          <Route path="/eventpro/add-event" element={<PrivateRoute element={<AddEventPage />} />} />
          <Route path="/eventpro/add-event/:id" element={<PrivateRoute element={<AddEventPage />} />} />
          <Route path="/eventpro/register" element={<Register />} />
          <Route path="/eventpro/forgot-password" element={<ForgotPassword />} />
          <Route path="/eventpro/reset-password/:token" element={<ResetPassword />} />
          <Route path="/eventpro/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="/event-form" element={<SignInSignUp platform="eventpro" />} />
          <Route path="/eventpro/list-events" element={<PrivateRoute element={<ListEventsPage />} />} />
          <Route
            path="/eventpro/admin-dashboard"
            element={<PrivateRoute element={<Dashboard />} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
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
