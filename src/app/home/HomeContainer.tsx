import React, { useState, useEffect, useRef } from 'react';
import HomeComponent from './HomeComponent';
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../../store/slices/userSlice';
import { chatData, chatActions } from '../../store/slices/chatSlice'
import { imageInsert } from '../../lib/utils/createFormData';
import io from 'socket.io-client'
import axios from 'axios';

// const socket = io('/chat')
const socket = io('/', { withCredentials: true, path: '/socket.io' })
type Props = {}
const HomeContainer: React.FC<Props> = () => {
    const dispatch = useDispatch();
    const { auth } = useSelector(userData)
    const { imageList, status, messages } = useSelector(chatData)
    const once = useRef(true)
    const scrollRef = useRef<HTMLDivElement>(null)
    const [message, setMessage] = useState('')
    const [chats, setChats] = useState<{ chat: string, name: string, image: string }[]>([])
    const [users, setUsers] = useState<string[]>([])
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setMessage(value)

    }
    const onInsertImage = async (e: React.ChangeEvent<HTMLInputElement>) => {


        // imageList가 비어있으면 비어 있는대로 => 생성
        // imageList에 데이터가 있으면 있는대로 => 수정
        // 결과적으로 imageList와 조합해서 새로운 formData를 만들어 주는 함수인 것
        const formData = imageInsert(e, imageList)
        dispatch(chatActions.addImage(await formData))

    }
    const onSubmit = async (e: any) => {
        e.preventDefault();
        send();
        setMessage('')

    }
    const send = async () => {

        return await axios.post('/home/chat', { message })
    }
    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current?.scrollHeight;
        }
    }
    useEffect(() => {
        if (!io) return
        if (once.current) {
            once.current = false;
            return
        }
        socket.on('chat', (data: { chat: string, name: string, image: string, userList: string[] }) => {

            setChats(prev => [...prev, data])
        })
        once.current = true;
        return () => {
            socket.off('chat', (data: { chat: string, name: string, image: string, userList: string[] }) => {
                setChats(prev => [...prev, data])
            })
        }
    }, [])
    useEffect(() => {
        const result = localStorage.getItem('users')?.split(',')
        if (result)
            setUsers(result)
        if (!io) return
        if (once.current) {
            once.current = false;
            return
        }
        socket.on('login_response', (data) => {
            console.log('login_response_data', typeof data, data)
            // setUsers(data)
            const users: string[] = data
            const usersString = users.toString();
            // console.log(usersString)
            try {

                localStorage.removeItem('users')
                localStorage.setItem('users', usersString)
            } catch (e) { console.log('local storage is goes bad') }
            setUsers(users)
        })
        once.current = true;
        return () => {
            socket.off('login_response', (data) => {
                console.log(data)
                const users: string[] = data
                setUsers(users)
            })
        }
    }, [])
    useEffect(() => {
        if (!io) return;
        if (once.current) {
            once.current = false;
            return
        }
        socket.on('logout_response', (data) => {
            const users: string[] = Object.values(data)
            const usersString = users.toString();
            try {
                localStorage.removeItem('users')
                localStorage.setItem('users', usersString)
                const result = localStorage.getItem('users')
                console.log(result)
            } catch (e) { console.log('local storage is goes bad') }
            setUsers(users)

        })
        once.current = true;
        return () => {
            socket.off('logout_response', (data) => {
                const users: string[] = Object.values(data)
                setUsers(users)

            })
        }
    }, [])
    useEffect(() => {
        setChats(prev => prev.concat(messages))
        setTimeout(scrollToBottom, 100)

    }, [messages])
    useEffect(() => {
        setTimeout(scrollToBottom, 1000)
        // scrollToBottom()
    }, [chats])

    return (
        <div>
            <HomeComponent users={users} onInsertImage={onInsertImage} auth={auth} message={message} scrollRef={scrollRef} onChange={onChange} onSubmit={onSubmit} messages={chats} />
        </div>
    );
};

export default HomeContainer;