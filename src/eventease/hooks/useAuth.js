import { useSelector } from 'react-redux';

const useAuth = () => {
  const authState = useSelector(state => state.eventease?.auth || {});
  return {
    user: authState.user || null,
    token: authState.token || null,
    isAuthenticated: authState.isAuthenticated || false,
    loading: authState.loading || false,
    error: authState.error || null,
  };
};
export default useAuth;
