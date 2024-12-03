import React from 'react';
import { Link } from 'react-router-dom';
type Props = {
    onChange: (e: any) => void;
    onInsertImage: (e: any) => void;
    onSubmit: (e: any) => void;
    message: string;
    messages: { name: string, chat: string, image: string }[]
    scrollRef: React.RefObject<HTMLDivElement>;
    auth: { name: string; } | null;
    users: string[]

}
const HomeComponent: React.FC<Props> = ({ users, onInsertImage, auth, scrollRef, message, onSubmit, onChange, messages }) => {
    // console.log(messages)
    return (
        <div className='Wrap-chat-user'>
            Here is Home
            <div className="Wrap-chat">

                <div className="search">
                    <input type="date" name="startDay" id="" />
                    <input type="date" name="endDay" id="" />
                    <select name="user" id="" >
                        <option value="">전체</option>
                        {/* 로그인 되어 있는 user리스트 가져오기*/}
                        <option value="">테스트</option>
                        <option value="">mysweet</option>
                    </select>
                    <input type="text" name="phrase" id="" />
                    <button>검색</button>
                </div>

                <div className="chats" ref={scrollRef}>


                    {messages?.map((message, index) => {
                        // console.log('message.name', message.name, 'auth.name:', auth?.name)

                        return (<div key={index} className={`chat ${message.name === 'system' ? 'center' : message?.name === auth?.name ? 'right' : 'left'}`}>
                            {message.chat && message.chat}
                            <div className='username'>
                                {message.name === 'system' ? '' : message.name}
                            </div>
                            <div>

                                {message.image && <img key={index} src={message.image} alt='img' width='100px'></img>}

                            </div>
                        </div>)
                    })}

                </div>
                <form className="control"
                    onSubmit={onSubmit}>
                    <input type="text" onChange={onChange} value={message} />
                    <button>전송</button>
                    <input type="file" name="images" id="" onChange={onInsertImage} multiple accept='image/*' />
                </form>

            </div>
            <div className="userList">
                <ul>
                    {users && users.map(user => auth?.name !== user && <li key={user}>{user}</li>)}
                </ul>
            </div>
        </div>
    );
};

export default HomeComponent;