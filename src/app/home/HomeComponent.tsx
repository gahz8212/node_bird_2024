import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
type Props = {
    onChange: (e: any) => void
    onSubmit: (e: any) => void;
    message: string;
    chats: string[]
}
const HomeComponent: React.FC<Props> = ({ message, onSubmit, onChange, chats }) => {
    // const [ScrollY, setScrollY] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null)
    useEffect(() => {

        scrollRef.current?.scrollTo(0, 400)
    }, [chats])
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


                    {chats?.map((chat, index) => <div key={index}>{chat}</div>)}

                </div>
                <Link to='/home'>방 나가기</Link>

            </div>
        </div>
    );
};

export default HomeComponent;