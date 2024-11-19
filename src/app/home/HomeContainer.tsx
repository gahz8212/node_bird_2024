import React, { useState, useEffect, useRef } from 'react';
import HomeComponent from './HomeComponent';
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../../store/slices/userSlice';
import { chatData, chatActions } from '../../store/slices/chatSlice'
import { imageInsert } from '../../lib/utils/createFormData';
import io from 'socket.io-client'
import axios from 'axios';

// const socket = io('/chat')
const socket = io('/room')
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
        if (once.current === true) {
            once.current = false;
            return;
        } else {
            socket.on('chat', (data: { chat: string, name: string, image: string, userList: string[] }) => {
                // console.log(data)
                setChats(prev => [...prev, data])
                console.log('userList', data.userList)

            })
            socket.on('userList', (data: string[]) => {
                // alert('login')

                setUsers(data)

            })
            // socket.on('logout', (data: { user: string }) => {
            //     // alert('logout')
            //     console.log(data.user)
            //     console.log(users)
            //     // setUsers(newUsers)
            // })

        }
        once.current = true

    }, [])

    useEffect(() => {
        setChats(chats.concat(messages))
        setTimeout(scrollToBottom, 1000)

    }, [messages])
    useEffect(() => {
        scrollToBottom()
    }, [chats])
    return (
        <div>
            <HomeComponent users={users} onInsertImage={onInsertImage} auth={auth} message={message} scrollRef={scrollRef} onChange={onChange} onSubmit={onSubmit} messages={chats} />
        </div>
    );
};

export default HomeContainer;