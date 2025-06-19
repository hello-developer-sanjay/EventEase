// src/eventpro/utils/setAuthToken.js
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('eventproToken', token);
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    localStorage.removeItem('eventproToken');
    delete axios.defaults.headers.common['x-auth-token'];
  }
};