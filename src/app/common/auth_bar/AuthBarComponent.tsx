import React, { useState } from 'react';
import { Link } from 'react-router-dom';
type Props = {
    auth: { name: string } | null;
    logout: () => void;
    time: string
    extends_auth: () => void;
    remainingTime: number
}
const AuthBarComponent: React.FC<Props> = ({ auth, logout, time, extends_auth, remainingTime }) => {
    const [visible, setVisible] = useState(false)

    return (
        <>
            <div className='Wrap-authBar'>
                <div className="authBar">
                    <div className="logo"><img src="/logo192.png" alt="logo" /></div>
                    <div className="status">
                        {auth?.name}
                        <div className="button">
                            {auth ? <div style={{ display: 'flex' }}>
                                <button onClick={logout}>LOGOUT</button>
                                <div>
                                    <span>남은시간</span><br /><span> {time}</span>
                                </div>
                                {/* <button>연장하기</button> */}
                            </div> : <Link to='/'>LOGIN</Link>}
                        </div>
                    </div>
                </div>
                {(remainingTime <= 20000 && remainingTime > 0) &&
                    <div
                        // className={`expAlarm ${(remainingTime <= 20000 && remainingTime > 0) && visible ? 'visible' : 'hidden'}`}
                        style={{ transition: '1s', background: 'gray', position: 'fixed', top: '50%', left: '50%', width: "200px", height: '200px' }}>{remainingTime}
                        <button onClick={() => {
                            extends_auth();
                            setVisible(false)
                        }
                        }>연장</button><button onClick={() => { logout(); setVisible(false) }}>로그아웃</button></div>}
            </div >
            <div className="space"></div>
        </>
    );
};

export default AuthBarComponent;