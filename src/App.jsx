import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth as setEventEaseAuth } from './store/slices/eventease/authSlice';
import { setAuth as setEventProAuth, loadUser, logout } from './store/slices/eventpro/authSlice';
import setAuthToken from './eventpro/utils/setAuthToken';
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
    if (location.pathname === '/') return null;
    if (location.pathname.startsWith('/eventpro')) return 'eventpro';
    if (location.pathname.startsWith('/eventease')) return 'eventease';
    return null;
  };

  const handleAuth = () => {
    const platform = getPlatform();
    const searchParams = new URLSearchParams(location.search);
    const userParam = searchParams.get('user');
    const userPlatform = searchParams.get('platform');

    console.log('App.jsx - Current path:', location.pathname);
    console.log('App.jsx - Platform:', platform);
    console.log('App.jsx - User query:', userParam);
    console.log('App.jsx - Query platform:', userPlatform);
    console.log('App.jsx - Redux state:', { easeAuthenticated, proAuthenticated, proUser });

    if (platform === null) {
      return;
    }

    // Set token for API requests
    if (platform === 'eventpro' && proAuthenticated) {
      const token = localStorage.getItem('eventproToken');
      if (token) {
        setAuthToken(token);
        console.log('App.jsx - Token set for eventpro');
      } else {
        dispatch(logout());
        navigate('/event-form', { replace: true });
      }
    } else if (platform === 'eventease' && easeAuthenticated) {
      const token = localStorage.getItem('eventeaseToken');
      if (token) {
        setAuthToken(token);
        console.log('App.jsx - Token set for eventease');
      } else {
        navigate('/eventease/login', { replace: true });
      }
    }

    // Handle user query parameter from backend redirect (e.g., Google OAuth)
    if (userParam && userPlatform) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(userParam));
        const token = parsedUser.token;
        if (!parsedUser._id || !parsedUser.email || !token) {
          throw new Error('Invalid user data');
        }
        if (userPlatform !== platform) {
          console.error('App.jsx - Platform mismatch:', { userPlatform, detectedPlatform: platform });
          toast.error('Platform mismatch. Please log in again.');
          if (platform === 'eventpro') {
            dispatch(logout());
            localStorage.removeItem('eventproToken');
            localStorage.removeItem('eventproUser');
            setAuthToken(null);
            navigate('/event-form', { replace: true });
          } else {
            localStorage.removeItem('eventeaseToken');
            localStorage.removeItem('eventeaseUser');
            setAuthToken(null);
            navigate('/eventease/login', { replace: true });
          }
          return;
        }
        if (platform === 'eventpro') {
          localStorage.setItem('eventproToken', token);
          localStorage.setItem('eventproUser', JSON.stringify(parsedUser));
          setAuthToken(token);
          dispatch(setEventProAuth({ user: parsedUser, token }));
          dispatch(loadUser()).catch(error => {
            console.error('App.jsx - loadUser failed:', error);
            dispatch(logout());
            localStorage.removeItem('eventproToken');
            localStorage.removeItem('eventproUser');
            setAuthToken(null);
            toast.error('Invalid session. Please log in again.');
            navigate('/event-form', { replace: true });
          });
          navigate('/eventpro/dashboard', { replace: true });
        } else if (platform === 'eventease') {
          localStorage.setItem('eventeaseToken', token);
          localStorage.setItem('eventeaseUser', JSON.stringify(parsedUser));
          setAuthToken(token);
          dispatch(setEventEaseAuth({ user: parsedUser, token }));
          navigate(parsedUser.role === 'admin' ? '/eventpro/admin-dashboard' : '/eventease', { replace: true });
        }
        return;
      } catch (error) {
        console.error('App.jsx - Error parsing user:', error);
        toast.error('Invalid user data');
        if (platform === 'eventpro') {
          dispatch(logout());
          localStorage.removeItem('eventproToken');
          localStorage.removeItem('eventproUser');
          setAuthToken(null);
          navigate('/event-form', { replace: true });
        } else {
          localStorage.removeItem('eventeaseToken');
          localStorage.removeItem('eventeaseUser');
          setAuthToken(null);
          navigate('/eventease/login', { replace: true });
        }
        return;
      }
    }

    // Eventease authentication check
    if (platform === 'eventease' && !easeAuthenticated && !easeLoading) {
      const publicRoutes = ['/eventease/login'];
      if (!publicRoutes.includes(location.pathname)) {
        if (localStorage.getItem('eventeaseToken') && localStorage.getItem('eventeaseUser')) {
          try {
            const user = JSON.parse(localStorage.getItem('eventeaseUser') || '{}');
            const token = localStorage.getItem('eventeaseToken');
            if (user._id && user.email && token) {
              setAuthToken(token);
              dispatch(setEventEaseAuth({ user, token }));
              console.log('App.jsx - Restored EventEase auth');
            } else {
              throw new Error('Invalid EventEase user data');
            }
          } catch (error) {
            console.error('App.jsx - Error restoring EventEase auth:', error);
            localStorage.removeItem('eventeaseToken');
            localStorage.removeItem('eventeaseUser');
            setAuthToken(null);
            navigate('/eventease/login', { replace: true });
          }
        } else {
          navigate('/eventease/login', { replace: true });
        }
      }
      return;
    }

    // Eventpro authentication check
    if (platform === 'eventpro' && !proAuthenticated && !proLoading) {
      const publicRoutes = ['/event-form', '/eventpro/register', '/eventpro/forgot-password', '/eventpro/reset-password'];
      if (!publicRoutes.includes(location.pathname)) {
        if (localStorage.getItem('eventproToken') && localStorage.getItem('eventproUser')) {
          try {
            const user = JSON.parse(localStorage.getItem('eventproUser') || '{}');
            const token = localStorage.getItem('eventproToken');
            if (user._id && user.email && token) {
              setAuthToken(token);
              dispatch(setEventProAuth({ user, token }));
              dispatch(loadUser()).catch(error => {
                console.error('App.jsx - loadUser failed:', error);
                dispatch(logout());
                localStorage.removeItem('eventproToken');
                localStorage.removeItem('eventproUser');
                setAuthToken(null);
                toast.error('Invalid session. Please log in again.');
                navigate('/event-form', { replace: true });
              });
              console.log('App.jsx - Restored EventPro auth');
            } else {
              throw new Error('Invalid EventPro user data');
            }
          } catch (error) {
            console.error('App.jsx - Error restoring EventPro auth:', error);
            dispatch(logout());
            localStorage.removeItem('eventproToken');
            localStorage.removeItem('eventproUser');
            setAuthToken(null);
            navigate('/event-form', { replace: true });
          }
        } else {
          navigate('/event-form', { replace: true });
        }
      }
      return;
    }
  };

  useEffect(() => {
    console.log('App.jsx - Initializing');
    handleAuth();
  }, [location.pathname, location.search]);

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
