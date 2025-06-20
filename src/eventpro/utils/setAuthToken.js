import axios from 'axios';

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log('setAuthToken.js - Set headers:', { 'x-auth-token': token, 'Authorization': `Bearer ${token}` });
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
    delete axios.defaults.headers.common['Authorization'];
    console.log('setAuthToken.js - Cleared headers');
  }
};
