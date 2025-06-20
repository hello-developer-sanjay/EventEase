import React, { useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth as setEventEaseAuth } from './store/slices/eventease/authSlice';
import { setAuth as setEventProAuth, loadUser as loadEventProUser, logout } from './store/slices/eventpro/authSlice';
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
  const { isAuthenticated: proAuthenticated, user: proUser } = useSelector(state => state.eventpro.auth);
  const eventeaseState = useSelector(state => state.eventease);
  const eventproState = useSelector(state => state.eventpro);

  const handleAuth = useCallback(() => {
    const searchParams = new URLSearchParams(location.search);
    const user = searchParams.get('user');
    const platform = searchParams.get('platform') || 'eventease';

    console.log('Raw user query:', user);
    console.log('Platform:', platform);
    console.log('Current path:', location.pathname);
    console.log('Redux state in App:', JSON.stringify({ eventease: eventeaseState, eventpro: eventproState }));

    if (user) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(user));
        const token = parsedUser.token;
        if (!parsedUser._id || !parsedUser.email || !token) {
          throw new Error('Invalid user data structure');
        }
        if (platform === 'eventpro') {
          localStorage.setItem('eventproToken', token);
          localStorage.setItem('eventproUser', JSON.stringify(parsedUser));
          dispatch(setEventProAuth({ user: parsedUser, token }));
          dispatch(loadEventProUser()).then(() => {
            navigate(parsedUser.role === 'admin' ? '/eventpro/admin-dashboard' : '/eventpro/dashboard', { replace: true });
          }).catch(() => {
            dispatch(logout());
            navigate('/event-form', { replace: true });
          });
        } else {
          localStorage.setItem('eventeaseToken', token);
          localStorage.setItem('eventeaseUser', JSON.stringify(parsedUser));
          dispatch(setEventEaseAuth({ user: parsedUser, token }));
          navigate(parsedUser.role === 'admin' ? '/admin-dashboard' : '/eventease', { replace: true });
        }
        navigate(location.pathname, { replace: true }); // Clear query params
      } catch (error) {
        console.error('Error parsing user from query:', error, 'Raw user:', user);
        toast.error('Invalid user data format');
        dispatch(logout());
        navigate(`/${platform}/login`, { replace: true });
      }
    } else if (location.pathname.startsWith('/eventease') && !easeAuthenticated) {
      if (localStorage.getItem('eventeaseToken') && localStorage.getItem('eventeaseUser')) {
        try {
          const user = JSON.parse(localStorage.getItem('eventeaseUser') || '{}');
          const token = localStorage.getItem('eventeaseToken');
          if (user._id && user.email && token) {
            dispatch(setEventEaseAuth({ user, token }));
            console.log('Restored EventEase auth from localStorage');
          } else {
            throw new Error('Invalid localStorage user data');
          }
        } catch (error) {
          console.error('Error parsing localStorage user:', error);
          toast.error('Invalid stored user data');
          localStorage.removeItem('eventeaseToken');
          localStorage.removeItem('eventeaseUser');
          navigate('/eventease/login', { replace: true });
        }
      } else {
        navigate('/eventease/login', { replace: true });
      }
    } else if ((location.pathname.startsWith('/eventpro') || location.pathname === '/event-form') && !proAuthenticated) {
      if (localStorage.getItem('eventproToken') && localStorage.getItem('eventproUser')) {
        try {
          const user = JSON.parse(localStorage.getItem('eventproUser') || '{}');
          const token = localStorage.getItem('eventproToken');
          if (user._id && user.email && token) {
            dispatch(setEventProAuth({ user, token }));
            dispatch(loadEventProUser()).then(() => {
              navigate(user.role === 'admin' ? '/eventpro/admin-dashboard' : '/eventpro/dashboard', { replace: true });
            }).catch(() => {
              dispatch(logout());
              navigate('/event-form', { replace: true });
            });
          } else {
            throw new Error('Invalid localStorage user data');
          }
        } catch (error) {
          console.error('Error parsing localStorage user:', error);
          toast.error('Invalid stored user data');
          dispatch(logout());
          localStorage.removeItem('eventproToken');
          localStorage.removeItem('eventproUser');
          navigate('/event-form', { replace: true });
        }
      } else {
        if (location.pathname !== '/event-form') {
          navigate('/event-form', { replace: true });
        }
      }
    }
  }, [dispatch, location.pathname, location.search, navigate, easeAuthenticated, proAuthenticated, eventeaseState, eventproState]);

  useEffect(() => {
    handleAuth();
  }, [handleAuth]);

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
