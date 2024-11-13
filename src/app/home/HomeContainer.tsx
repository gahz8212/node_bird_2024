import React, { useState, useEffect, useRef } from 'react';
import HomeComponent from './HomeComponent';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { userData } from '../../store/slices/userSlice';
import io from 'socket.io-client'
import axios from 'axios';

// const socket = io('/chat')
const socket = io('/room')
type Props = {}
const HomeContainer: React.FC<Props> = () => {
    const { auth } = useSelector(userData)
    const once = useRef(true)
    const scrollRef = useRef<HTMLDivElement>(null)
    const [message, setMessage] = useState('')
    const [chats, setChats] = useState<{ message: string, user: string }[]>([])
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
            socket.on('chat', (data: { message: string, user: string }) => {
                console.log(data.message)
                setChats(prev => [...prev, data])
            })

        }
        once.current = true
        // return;
    }, [])
    useEffect(() => {
        scrollRef.current?.scrollTo(0, 1000)
    }, [chats])
    return (
        <div>
            <HomeComponent auth={auth} message={message} scrollRef={scrollRef} onChange={onChange} onSubmit={onSubmit} chats={chats} />
        </div>
    );
};

export default HomeContainer;