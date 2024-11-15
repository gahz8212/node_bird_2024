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
    const { imageList, status } = useSelector(chatData)
    const once = useRef(true)
    const scrollRef = useRef<HTMLDivElement>(null)
    const [message, setMessage] = useState('')
    const [chats, setChats] = useState<{ message: string, user: string, images: { url: string }[] }[]>([])
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
    useEffect(() => {
        if (once.current === true) {
            once.current = false;
            return;
        } else {
            socket.on('chat', (data: { message: string, user: string, images: { url: string }[] }) => {
                console.log(data)
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
            <HomeComponent onInsertImage={onInsertImage} auth={auth} message={message} scrollRef={scrollRef} onChange={onChange} onSubmit={onSubmit} chats={chats} />
        </div>
    );
};

export default HomeContainer;