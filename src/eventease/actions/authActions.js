// src/actions/authActions.js
import axios from 'axios';
import { setAuthToken } from '../utils/setAuthToken';
import { FETCH_USER_SUCCESS, LOGIN_SUCCESS, AUTHENTICATE_USER } from './types';

export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
        dispatch({ type: AUTHENTICATE_USER, payload: true });
    }
    try {
        const res = await axios.get('https://q0lvs5rnt9.execute-api.ap-south-1.amazonaws.com/prod/api/auth/user');
        const user = res.data.user;

        localStorage.setItem('user', JSON.stringify(user));
        dispatch({ type: FETCH_USER_SUCCESS, payload: { user, token: localStorage.token } });

        console.log('User loaded successfully:', user);
    } catch (error) {
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
        const res = await axios.post('https://q0lvs5rnt9.execute-api.ap-south-1.amazonaws.com/prod/api/auth/login', body, config);
        const { token, user } = res.data;
        console.log('Login response:', res.data);

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        dispatch({ type: LOGIN_SUCCESS, payload: { user, token } });
        setAuthToken(token);
        dispatch(loadUser());
        console.log('Login successful:', res.data);
        return { success: true, role: user.role };
    } catch (error) {
        console.error('Error logging in:', error.response.data.message);
        return { success: false, message: error.response.data.message || 'Login failed' };
    }
};

export const loginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    payload: user,
});

export const register = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post('https://q0lvs5rnt9.execute-api.ap-south-1.amazonaws.com/prod/api/auth/register', formData, config);
        const { token, user } = res.data;
        console.log('Register response:', res.data);

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        dispatch({ type: LOGIN_SUCCESS, payload: { user, token } });
        setAuthToken(token);
        dispatch(loadUser());
        console.log('Registration successful:', res.data);
        return { success: true, role: user.role };
    } catch (error) {
        console.error('Error registering user:', error);
    }
};