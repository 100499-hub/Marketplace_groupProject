import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../context/UserContext';
import { ItemList } from './ItemList';

export const Home = () => {
    const { isLoggedIn } = useLogin();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    // While redirecting, render nothing
    if (!isLoggedIn) {
        return null;
    }

    return (
        <main>
            <h2>Welcome to the Marketplace</h2>
            <ItemList />
        </main>
    );
};
