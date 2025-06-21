import axios from 'axios';

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
    console.log('setAuthToken: Token set in Axios headers:', token);
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
    console.log('setAuthToken: Token removed from Axios headers');
  }
};
export default setAuthToken;
