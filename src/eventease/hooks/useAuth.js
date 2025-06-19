import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { loadUser as loadEventEaseUser } from '../../store/slices/eventease/authSlice';
import { loadUser as loadEventProUser } from '../../store/slices/eventpro/authSlice';

const useAuth = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isEventEase = location.pathname.startsWith('/eventease');

  // Debug Redux state
  const entireState = useSelector(state => state);
  console.log('Redux state in useAuth:', entireState);
  if (!entireState.eventease || !entireState.eventpro) {
    console.error('Redux state missing eventease or eventpro:', entireState);
  }

  // Select auth state based on app context
  const authState = useSelector(state => {
    return (isEventEase ? state.eventease?.auth : state.eventpro?.auth) || {
      user: null,
      loading: true,
      isAuthenticated: false,
      token: null,
    };
  });

  const { user, loading, isAuthenticated, token } = authState;

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const userParam = query.get('user');
    const tokenParam = query.get('token');
    const tokenKey = isEventEase ? 'eventeaseToken' : 'eventproToken';

    if (userParam && tokenParam) {
      try {
        const userFromUrl = JSON.parse(decodeURIComponent(userParam));
        localStorage.setItem('user', JSON.stringify(userFromUrl));
        localStorage.setItem(tokenKey, tokenParam);
        dispatch(isEventEase ? loadEventEaseUser() : loadEventProUser());
      } catch (error) {
        console.error('Error parsing userParam:', error);
      }
    } else if (!isAuthenticated && localStorage.getItem('user') && localStorage.getItem(tokenKey)) {
      dispatch(isEventEase ? loadEventEaseUser() : loadEventProUser());
    } else {
      dispatch(isEventEase ? loadEventEaseUser() : loadEventProUser());
    }
  }, [dispatch, isAuthenticated, location.search, isEventEase]);

  return { user, loading, isAuthenticated, token };
};

export default useAuth;