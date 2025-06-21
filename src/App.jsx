import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth as setEventEaseAuth } from './store/slices/eventease/authSlice';
import { setAuth as setEventProAuth, loadUser, logout } from './store/slices/eventpro/authSlice';
import Layout from './shared/components/Layout';
import ErrorBoundary from './shared/components/ErrorBoundary';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';

// Home Page
import Home from './Home';

// EventEase Pages and Components
import Calendar from './eventease/components/Calendar';
import GoogleCalendarSync from './eventease/components/GoogleCalendarSync';
import Login from './eventease/pages/Login';

// EventPro Pages
import AddEventPage from './eventpro/pages/AddEventPage';
import EditEventPage from './eventpro/pages/EditEventPage';
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
  const { isAuthenticated: easeAuthenticated, loading: easeLoading } = useSelector(state => state.eventease.auth);
  const { isAuthenticated: proAuthenticated, user: proUser, loading: proLoading } = useSelector(state => state.eventpro.auth);

  const getPlatform = () => {
    if (location.pathname === '/') return null; // No platform for root
    return location.pathname.startsWith('/eventpro') ? 'eventpro' : 'eventease';
  };

  const handleAuth = () => {
    const platform = getPlatform();

    console.log('App.jsx - Current path:', location.pathname);
    console.log('App.jsx - Platform:', platform);
    console.log('App.jsx - Redux state:', { easeAuthenticated, proAuthenticated, proUser });

    // Skip auth checks for root URL
    if (platform === null) {
      return;
    }

    // Eventease authentication check
    if (platform === 'eventease' && !easeAuthenticated && !easeLoading) {
      const publicRoutes = ['/eventease/login'];
      if (!publicRoutes.includes(location.pathname)) {
        if (localStorage.getItem('eventeaseToken') && localStorage.getItem('eventeaseUser')) {
          try {
            const user = JSON.parse(localStorage.getItem('eventeaseUser') || '{}');
            const token = localStorage.getItem('eventeaseToken');
            if (user._id && user.email && token && user.platform === 'eventease') {
              dispatch(setEventEaseAuth({ user, token }));
              console.log('App.jsx - Restored EventEase auth');
            } else {
              throw new Error('Invalid EventEase user data');
            }
          } catch (error) {
            console.error('App.jsx - Error restoring EventEase auth:', error);
            localStorage.removeItem('eventeaseToken');
            localStorage.removeItem('eventeaseUser');
            navigate('/eventease/login', { replace: true });
          }
        } else {
          navigate('/eventease/login', { replace: true });
        }
      }
    }

    // Eventpro authentication check
    if (platform === 'eventpro' && !proAuthenticated && !proLoading) {
      const publicRoutes = ['/event-form', '/eventpro/register', '/eventpro/forgot-password', '/eventpro/reset-password'];
      if (!publicRoutes.includes(location.pathname)) {
        if (localStorage.getItem('eventproToken') && localStorage.getItem('eventproUser')) {
          try {
            const user = JSON.parse(localStorage.getItem('eventproUser') || '{}');
            const token = localStorage.getItem('eventproToken');
            if (user._id && user.email && token && user.platform === 'eventpro') {
              dispatch(setEventProAuth({ user, token }));
              dispatch(loadUser()).catch(error => {
                console.error('App.jsx - loadUser failed:', error);
                dispatch(logout());
                localStorage.removeItem('eventproToken');
                localStorage.removeItem('eventproUser');
                toast.error('Invalid session. Please log in again.');
                navigate('/event-form', { replace: true });
              });
            } else {
              throw new Error('Invalid EventPro user data');
            }
          } catch (error) {
            console.error('App.jsx - Error restoring EventPro auth:', error);
            dispatch(logout());
            localStorage.removeItem('eventproToken');
            localStorage.removeItem('eventproUser');
            navigate('/event-form', { replace: true });
          }
        } else {
          navigate('/event-form', { replace: true });
        }
      }
    }
  };

  useEffect(() => {
    console.log('App.jsx - Running handleAuth');
    handleAuth();
  }, [location.pathname, proLoading, easeLoading]); // Run on route or loading state changes

  return (
    <ErrorBoundary>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* EventEase Routes */}
          <Route path="/eventease" element={easeAuthenticated ? <Calendar /> : <Navigate to="/eventease/login" replace />} />
          <Route path="/eventease/login" element={<Login />} />
          <Route path="/eventease/sync-google-calendar" element={easeAuthenticated ? <GoogleCalendarSync /> : <Navigate to="/eventease/login" replace />} />
          <Route path="/eventease/create-event" element={easeAuthenticated ? <Calendar /> : <Navigate to="/eventease/login" replace />} />
          {/* EventPro Routes */}
          <Route path="/eventpro" element={proAuthenticated ? <Dashboard /> : <Navigate to="/event-form" replace />} />
          <Route path="/eventpro/add-event" element={proAuthenticated ? <AddEventPage /> : <Navigate to="/event-form" replace />} />
          <Route path="/eventpro/add-event/:id" element={proAuthenticated ? <EditEventPage /> : <Navigate to="/event-form" replace />} />
          <Route path="/eventpro/register" element={<Register />} />
          <Route path="/eventpro/forgot-password" element={<ForgotPassword />} />
          <Route path="/eventpro/reset-password/:token" element={<ResetPassword />} />
          <Route path="/eventpro/dashboard" element={proAuthenticated ? <Dashboard /> : <Navigate to="/event-form" replace />} />
          <Route path="/event-form" element={<SignInSignUp platform="eventpro" />} />
          <Route path="/eventpro/list-events" element={proAuthenticated ? <ListEventsPage /> : <Navigate to="/event-form" replace />} />
          <Route path="/eventpro/admin-dashboard" element={proAuthenticated && proUser?.role === 'admin' ? <Dashboard /> : <Navigate to="/event-form" replace />} />
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
