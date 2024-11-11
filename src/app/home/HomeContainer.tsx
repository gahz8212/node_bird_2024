import React, { useState, useEffect, useRef } from 'react';
import HomeComponent from './HomeComponent';
import io from 'socket.io-client'
import axios from 'axios';

// const socket = io('/chat')
const socket = io('/room')
type Props = {}
const HomeContainer: React.FC<Props> = () => {
    const once = useRef(true)
    const [message, setMessage] = useState('')
    const [chats, setChats] = useState<string[]>([''])
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setMessage(value)

    }
    const onSubmit = async (e: any) => {
        e.preventDefault();
        send();
        setMessage('')

    }
    const send = async () => {
        return await axios.post('/home/chat', { message })
    }
    useEffect(() => {
        if (once.current === true) {
            once.current = false;
            return;
        } else {
            socket.on('chat', (data: { message: string }) => {
                console.log(data.message)
                setChats(prev => [...prev, data.message])
            })
            // console.log(chats)
        }
        once.current = true
        // return;
    }, [])
    return (
        <div>
            <HomeComponent message={message} onChange={onChange} onSubmit={onSubmit} chats={chats} />
        </div>
    );
};

export default HomeContainer;