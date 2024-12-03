import React, { useState, useEffect } from 'react';
import AuthBarComponent from './AuthBarComponent';
import { useDispatch, useSelector } from 'react-redux';
import { userData, userActions } from '../../../store/slices/userSlice';

import io from 'socket.io-client'

const socket = io('/room')
const AuthBarContainer = () => {
    const dispatch = useDispatch();
    const [time, setTime] = useState('')
    const { auth, status } = useSelector(userData)
    const [remainingTime, setRemainingTime] = useState<number>(0)
    const logout = () => {
        if (auth) {
            socket.emit('logout', auth.name)//clientId를 넣어줘야 한다
            dispatch(userActions.expires_init())
            dispatch(userActions.logout())
        }
        // window.location.reload();
        try {
            localStorage.removeItem('user')
        } catch (e) { console.error('localstorage is not working') }
    }
    const extends_auth = () => {
        dispatch(userActions.extends_auth())
    }
    useEffect(() => {
        if (auth) {

        }
        const es = new EventSource('/sse')
        const end = new Date(status.expires)
        console.log(typeof end)
        let restTime = '00:00:00'
        // end.setMinutes(end.getMinutes() + 1)



        es.onmessage = function (e: any) {
            const server = new Date(parseInt(e.data, 10))
            const remainingTime = (end.getTime() - server.getTime());
            setRemainingTime(remainingTime)
            if (server >= end) {
                setTime('00:00:00');
                es.close();
                logout()
            } else {
                const seconds = ('0' + Math.floor((remainingTime / 1000) % 60)).slice(-2)
                const minutes = ('0' + Math.floor((remainingTime / 1000 / 60) % 60)).slice(-2)
                const hours = ('0' + Math.floor((remainingTime / 1000 / 60 / 60) % 60)).slice(-2)
                restTime = `${hours}:${minutes}:${seconds}`
                setTime(restTime)
            }
        }
        return () => {
            es.close()
        }
    }, [status.expires])
    return (
        <div>
            <AuthBarComponent auth={auth} logout={logout} time={time} extends_auth={extends_auth} remainingTime={remainingTime} />
        </div>
    );
};

export default AuthBarContainer;