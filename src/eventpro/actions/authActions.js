import axios from 'axios';
import { setAuthToken } from '../utils/setAuthToken';
import { FETCH_USER_SUCCESS, LOGIN_SUCCESS, AUTHENTICATE_USER, REGISTER_FAIL,REGISTER_SUCCESS} from './types.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
        dispatch({ type: AUTHENTICATE_USER, payload: true });
    }
    try {
        const res = await axios.get('https://eventmanager-api-19july.onrender.com/api/auth/user');
        const user = res.data.user; // Ensure user object is correctly extracted

        localStorage.setItem('user', JSON.stringify(res.data.user));
        dispatch({ type: AUTHENTICATE_USER, payload: user });
        toast.success('User loaded successful !', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        dispatch({ type: FETCH_USER_SUCCESS, payload: { user: res.data.user, token: localStorage.token} });

        console.log('User loaded successfully:', res.data.user);
    } catch (error) {
        console.error('Error loading User:', error);
        toast.error('Error loading User. Please Login and try again.', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });  
        console.error('Error loading user:', error);
    }
};

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('https://eventmanager-api-19july.onrender.com/api/auth/login', body, config);
        const { token, user } = res.data;
        console.log('Login response:', res.data);

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        dispatch({ type: LOGIN_SUCCESS, payload: { user, token } });

        setAuthToken(token);
        dispatch(loadUser());
        toast.success('Login successful !', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        console.log('Login successful:', res.data);
        return { success: true, role: user.role };
    } catch (error) {
        console.error('Error logging in:', error);
        toast.error('Error logging in. Please Login and try again.', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });  
        console.error('Error logging in:', error.response.data.message);
        return { success: false, message: error.response.data.message || 'Login failed' };
    }
};

export const loginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    payload: user,
});

export const register = (formData) => async dispatch => {
    try {
        const res = await axios.post('https://eventmanager-api-19july.onrender.com/api/auth/register', formData);
        if (res.data.success) {
            dispatch({ type: REGISTER_SUCCESS, payload: res.data });
            return { success: true };
        } else {
            dispatch({ type: REGISTER_FAIL });
            return { success: false, message: res.data.message };
        }
    } catch (err) {
        dispatch({ type: REGISTER_FAIL });
        console.error('Error registering user:', err);
        return { success: false, message: 'Server error' };
    }
};