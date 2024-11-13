import React from 'react';
import { Link } from 'react-router-dom';
type Props = {
    onChange: (e: any) => void
    onSubmit: (e: any) => void;
    message: string;
    chats: { message: string, user: string }[]
    scrollRef: React.RefObject<HTMLDivElement>;
    auth: { name: string; } | null;
}
const HomeComponent: React.FC<Props> = ({ auth, scrollRef, message, onSubmit, onChange, chats }) => {
    // const [ScrollY, setScrollY] = useState(0);


    return (
        <div>
            Here is Home
            <div className="Wrap-chat">

                <form className="control"
                    onSubmit={onSubmit}>
                    <input type="text" onChange={onChange} value={message} />
                    <button>전송</button>
                </form>
                <div className="chats" ref={scrollRef}>


                    {chats?.map((chat, index) => <div key={index} className={`chat ${chat.user === 'system' ? 'center' : chat.user === auth?.name ? 'right' : 'left'}`}>
                        <div className='username'>
                            {chat.user === 'system' ? '' : chat.user === auth?.name ? '' : auth?.name}
                        </div>
                        {chat.message}

                    </div>)}

                </div>
                <Link to='/home'>방 나가기</Link>

            </div>
        </div>
    );
};

export default HomeComponent;