import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../../store/slices/eventpro/authSlice';

const Dashboard = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { user, loading, isAuthenticated } = useSelector(state => state.auth);
    const token = useSelector(state => state.auth.token);

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const userParam = query.get('user');
        const tokenParam = query.get('token');

        if (userParam) {
            const userFromUrl = JSON.parse(decodeURIComponent(userParam));
            localStorage.setItem('user', JSON.stringify(userFromUrl));
            if (tokenParam) {
                localStorage.setItem('token', tokenParam);
            }
            dispatch({ type: 'FETCH_USER_SUCCESS', payload: { user: userFromUrl, token: tokenParam } });
        } else if (isAuthenticated) {
            const userDataFromLocalStorage = JSON.parse(localStorage.getItem('user'));
            const tokenFromLocalStorage = localStorage.getItem('token');
            if (userDataFromLocalStorage) {
                dispatch({ type: 'FETCH_USER_SUCCESS', payload: { user: userDataFromLocalStorage, token: tokenFromLocalStorage } });
            } else {
                dispatch(loadUser());
            }
        }
    }, [dispatch, isAuthenticated, location.search]);

   



   

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <div>Please log in to view this page.</div>;
    }

    if (!user) {
        return <div>Error loading user data.</div>;
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, {user.name}!</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
           
        </div>
    );
};

export default Dashboard;