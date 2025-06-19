// src/eventease/utils/setAuthToken.js
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('eventeaseToken', token);
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    localStorage.removeItem('eventeaseToken');
    delete axios.defaults.headers.common['x-auth-token'];
  }
};