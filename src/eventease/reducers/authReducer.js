
import { FETCH_USER_SUCCESS, LOGIN_SUCCESS, AUTHENTICATE_USER } from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    loading: true,
    user: null,
};

const authReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case FETCH_USER_SUCCESS:
        case LOGIN_SUCCESS:
            console.log('User data received:', payload.user);
            if (payload.token) {
                localStorage.setItem('token', payload.token);
            }
            return {
                ...state,
                token: payload.token || localStorage.getItem('token'),
                isAuthenticated: true,
                loading: false,
                user: payload.user,
            };
        case AUTHENTICATE_USER:
            return {
                ...state,
                isAuthenticated: payload
            };
       
          
        default:
            return state;
    }
};

export default authReducer;