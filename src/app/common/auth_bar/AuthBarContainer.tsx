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
    const logout = () => {
        if (auth) {
            socket.emit('logout', auth.name)//clientId를 넣어줘야 한다
            dispatch(userActions.logout())
        }
        // window.location.reload();
        try {
            localStorage.removeItem('user')
        } catch (e) { console.error('localstorage is not working') }
    }
    useEffect(() => {
        const es = new EventSource('/sse')
        const end = new Date();
        let restTime = '00:00:00'
        end.setSeconds(end.getSeconds() + 60)

        es.onmessage = function (e: any) {
            const server = new Date(parseInt(e.data, 10))
            const t = (end.getTime() - server.getTime());

            if (server >= end) {
                setTime('00:00:00');
                es.close();
                logout()
            } else {
                const seconds = ('0' + Math.floor((t / 1000) % 60)).slice(-2)
                const minutes = ('0' + Math.floor((t / 1000 / 60) % 60)).slice(-2)
                const hours = ('0' + Math.floor((t / 1000 / 60 / 60) % 60)).slice(-2)
                restTime = `${hours}:${minutes}:${seconds}`
                setTime(restTime)
            }
        }
        return () => {
            es.close()
        }
    }, [])
    return (
        <div>
            <AuthBarComponent auth={auth} logout={logout} time={time} />
        </div>
    );
};

export default AuthBarContainer;