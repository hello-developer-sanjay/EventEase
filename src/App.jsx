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

  const getPlatform = () => {
    return location.pathname.startsWith('/eventpro') ? 'eventpro' : 'eventease';
  };

  const handleAuth = () => {
    const platform = getPlatform();
    const searchParams = new URLSearchParams(location.search);
    const user = searchParams.get('user');

    console.log('App.jsx - Current path:', location.pathname);
    console.log('App.jsx - Platform:', platform);
    console.log('App.jsx - User query:', user);
    console.log('App.jsx - Redux state:', { easeAuthenticated, proAuthenticated, proUser });

    if (user) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(user));
        const token = parsedUser.token;
        if (!parsedUser._id || !parsedUser.email || !token) {
          throw new Error('Invalid user data');
        }
        if (parsedUser.platform !== platform) {
          console.error('App.jsx - Platform mismatch:', { userPlatform: parsedUser.platform, detectedPlatform: platform });
          toast.error('Platform mismatch. Please log in again.');
          dispatch(logout());
          navigate('/event-form', { replace: true });
          return;
        }
        if (platform === 'eventpro') {
          localStorage.setItem('eventproToken', token);
          localStorage.setItem('eventproUser', JSON.stringify(parsedUser));
          dispatch(setEventProAuth({ user: parsedUser, token }));
          dispatch(loadUser()).catch(error => {
            console.error('App.jsx - loadUser failed:', error);
            dispatch(logout());
            toast.error('Invalid session. Please log in again.');
            navigate('/event-form', { replace: true });
          });
        } else {
          localStorage.setItem('eventeaseToken', token);
          localStorage.setItem('eventeaseUser', JSON.stringify(parsedUser));
          dispatch(setEventEaseAuth({ user: parsedUser, token }));
          navigate(parsedUser.role === 'admin' ? '/admin-dashboard' : '/eventease', { replace: true });
        }
      } catch (error) {
        console.error('App.jsx - Error parsing user:', error);
        toast.error('Invalid user data');
        dispatch(logout());
        navigate('/event-form', { replace: true });
      }
    } else if (platform === 'eventease' && !easeAuthenticated && location.pathname !== '/eventease/login') {
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
    } else if (platform === 'eventpro' && !proAuthenticated && location.pathname !== '/event-form') {
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
          localStorage.removeItem('eventproToken');
          localStorage.removeItem('eventproUser');
          navigate('/event-form', { replace: true });
        }
      } else {
        navigate('/event-form', { replace: true });
      }
    }
  };

  useEffect(() => {
    console.log('App.jsx - Initial auth check');
    handleAuth();
  }, [proAuthenticated, easeAuthenticated]); // Run on auth state change

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
          <Route path="/eventpro" element={proAuthenticated ? <ListEventsPage /> : <Navigate to="/event-form" replace />} />
          <Route path="/eventpro/add-event" element={proAuthenticated ? <AddEventPage /> : <Navigate to="/event-form" replace />} />
          <Route path="/eventpro/add-event/:id" element={proAuthenticated ? <AddEventPage /> : <Navigate to="/event-form" replace />} />
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
