import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth as setEventEaseAuth } from './store/slices/eventease/authSlice';
import { setAuth as setEventProAuth, loadUser, logout } from './store/slices/eventpro/authSlice';
import Layout from './shared/components/Layout';
import ErrorBoundary from './shared/components/ErrorBoundary';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated: easeAuthenticated } = useSelector((state) => state.eventease.auth);
  const { isAuthenticated: proAuthenticated, user: proUser } = useSelector((state) => state.eventpro.auth);

  useEffect(() => {
    console.log('App.jsx - Initializing auth check');
    const token = localStorage.getItem('eventproToken');
    const user = localStorage.getItem('eventproUser');
    const platform = location.pathname.startsWith('/eventpro') || location.pathname === '/event-form' ? 'eventpro' : 'eventease';
    
    console.log('App.jsx - Platform:', platform);
    console.log('App.jsx - Current path:', location.pathname);
    console.log('App.jsx - Redux state:', { easeAuthenticated, proAuthenticated, proUser });

    if (platform === 'eventpro' && token && user) {
      try {
        const userData = JSON.parse(user);
        if (userData._id && userData.email && userData.platform === 'eventpro') {
          dispatch(setEventProAuth({ user: userData, token }));
          dispatch(loadUser())
            .then(() => {
              console.log('App.jsx - loadUser success');
              if (location.pathname === '/event-form') {
                navigate(userData.role === 'admin' ? '/eventpro/admin-dashboard' : '/eventpro/dashboard', { replace: true });
              }
            })
            .catch((error) => {
              console.error('App.jsx - loadUser failed:', error);
              dispatch(logout());
              toast.error('Failed to load user. Please log in again.');
              navigate('/event-form', { replace: true });
            });
        } else {
          throw new Error('Invalid localStorage user data');
        }
      } catch (error) {
        console.error('App.jsx - Error parsing localStorage user:', error);
        dispatch(logout());
        localStorage.removeItem('eventproToken');
        localStorage.removeItem('eventproUser');
        navigate('/event-form', { replace: true });
      }
    } else if (platform === 'eventease' && !easeAuthenticated) {
      if (localStorage.getItem('eventeaseToken') && localStorage.getItem('eventeaseUser')) {
        try {
          const userData = JSON.parse(localStorage.getItem('eventeaseUser') || '{}');
          const token = localStorage.getItem('eventeaseToken');
          if (userData._id && userData.email && token && userData.platform === 'eventease') {
            dispatch(setEventEaseAuth({ user: userData, token }));
            console.log('App.jsx - Restored EventEase auth from localStorage');
            navigate(userData.role === 'admin' ? '/admin-dashboard' : '/eventease', { replace: true });
          } else {
            throw new Error('Invalid localStorage user data');
          }
        } catch (error) {
          console.error('App.jsx - Error parsing localStorage user:', error);
          toast.error('Invalid stored user data');
          localStorage.removeItem('eventeaseToken');
          localStorage.removeItem('eventeaseUser');
          navigate('/eventease/login', { replace: true });
        }
      }
    }
  }, []); // Empty deps to run once on mount

  return (
    <ErrorBoundary>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* EventEase Routes */}
          <Route path="/eventease" element={<Calendar />} />
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
                <Navigate to="/event-form" replace />
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
