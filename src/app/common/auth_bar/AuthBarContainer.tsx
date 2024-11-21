import React from 'react';
import AuthBarComponent from './AuthBarComponent';
import { useDispatch, useSelector } from 'react-redux';
import { userData, userActions } from '../../../store/slices/userSlice';
import io from 'socket.io-client'
const socket = io('/room')
const AuthBarContainer = () => {
    const dispatch = useDispatch();
    const { auth, status } = useSelector(userData)
    const logout = () => {
        if (auth) {
            socket.emit('logout', auth.name)//clientId를 넣어줘야 한다

        }
        dispatch(userActions.logout())
        // window.location.reload();

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