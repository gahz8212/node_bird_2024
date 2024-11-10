import React from 'react';

type Props = {
    onChange: (e: any) => void
    onSubmit: (e: any) => void;
    message: string;
}
const HomeComponent: React.FC<Props> = ({ message, onSubmit, onChange }) => {
    return (
        <div>
            Here is Home
            <div className="Wrap-chat">

                <form className="control"
                    onSubmit={onSubmit}>
                    <input type="text" onChange={onChange} value={message} />
                    <button>전송</button>
                </form>
                <div className="chats"></div>
            </div>
        </div>
    );
};

export default HomeComponent;