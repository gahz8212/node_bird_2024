import React from 'react';
import AuthBarComponent from './AuthBarComponent';
import { useDispatch, useSelector } from 'react-redux';
import { userData, userActions } from '../../../store/slices/userSlice';
const AuthBarContainer = () => {
    const dispatch = useDispatch();
    const { auth, status } = useSelector(userData)
    const logout = () => {
        dispatch(userActions.logout())
        try {

            localStorage.removeItem('user')
        } catch (e) { console.error('localstorage is not working') }
    }
    return (
        <div>
            <AuthBarComponent auth={auth} logout={logout} />
        </div>
    );
};

export default AuthBarContainer;