import React, { useState } from 'react';
import HomeComponent from './HomeComponent';
import io from 'socket.io-client'
import axios from 'axios'
type Props = {}
const HomeContainer: React.FC<Props> = () => {
    const [message, setMessage] = useState('')
    const onChange = (e: any) => {
        const { value } = e.target;
        setMessage(value)

    }
    const onSubmit = async (e: any) => {
        e.preventDefault();
        console.log(message)
        setMessage('')
        // await axios.post('/chat', message)
    }
    const socket = io('/room')
    socket.on('chat', data => {
        console.log(data)
    })
    return (
        <div>
            <HomeComponent message={message} onChange={onChange} onSubmit={onSubmit} />
        </div>
    );
};

export default HomeContainer;