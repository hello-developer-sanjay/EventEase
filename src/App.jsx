import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth as setEventEaseAuth } from './store/slices/eventease/authSlice';
import { setAuth as setEventProAuth, logout } from './store/slices/eventpro/authSlice';
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

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated: easeAuthenticated } = useSelector((state) => state.eventease.auth);
  const { isAuthenticated: proAuthenticated, user: proUser } = useSelector((state) => state.eventpro.auth);

  // Restore auth state for both platforms
  ['eventpro', 'eventease'].forEach((platform) => {
    const token = localStorage.getItem(`${platform}Token`);
    const userData = localStorage.getItem(`${platform}User`);
    const isAuth = platform === 'eventpro' ? proAuthenticated : easeAuthenticated;
    if (token && userData && !isAuth) {
      try {
        const parsedUser = JSON.parse(userData);
        if (parsedUser._id && parsedUser.email && parsedUser.platform === platform) {
          const action = platform === 'eventpro' ? setEventProAuth : setEventEaseAuth;
          dispatch(action({ user: parsedUser, token }));
          console.log(`App.jsx - Restored ${platform} auth:`, { user: parsedUser._id, email: parsedUser.email });
        } else {
          throw new Error('Invalid user data');
        }
      } catch (error) {
        console.error(`App.jsx - Error parsing ${platform} user:`, error);
        dispatch(platform === 'eventpro' ? logout() : logout());
        localStorage.removeItem(`${platform}Token`);
        localStorage.removeItem(`${platform}User`);
        toast.error(`Invalid ${platform} session. Please log in again.`);
      }
    }
  });

  console.log('App.jsx - Rendering:', { easeAuthenticated, proAuthenticated, proUser });

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
          <Route
            path="/eventpro"
            element={proAuthenticated ? <ListEventsPage /> : <Navigate to="/event-form" replace />}
          />
          <Route
            path="/eventpro/add-event"
            element={proAuthenticated ? <AddEventPage /> : <Navigate to="/event-form" replace />}
          />
          <Route
            path="/eventpro/add-event/:id"
            element={proAuthenticated ? <AddEventPage /> : <Navigate to="/event-form" replace />}
          />
          <Route path="/eventpro/register" element={<Register />} />
          <Route path="/eventpro/forgot-password" element={<ForgotPassword />} />
          <Route path="/eventpro/reset-password/:token" element={<ResetPassword />} />
          <Route
            path="/eventpro/dashboard"
            element={proAuthenticated ? <Dashboard /> : <Navigate to="/event-form" replace />}
          />
          <Route path="/event-form" element={<SignInSignUp platform="eventpro" />} />
          <Route
            path="/eventpro/list-events"
            element={proAuthenticated ? <ListEventsPage /> : <Navigate to="/event-form" replace />}
          />
          <Route
            path="/eventpro/admin-dashboard"
            element={
              proAuthenticated && proUser?.role === 'admin' ? (
                <Dashboard />
              ) : (
                <Navigate to={proAuthenticated ? '/eventpro/dashboard' : '/event-form'} replace />
              )
            }
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
