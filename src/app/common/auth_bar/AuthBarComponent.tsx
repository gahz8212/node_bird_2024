import React from 'react';
import { Link } from 'react-router-dom';
type Props = {
    auth: { name: string } | null;
    logout: () => void;
    time: string
    extends_auth: () => void;
}
const AuthBarComponent: React.FC<Props> = ({ auth, logout, time, extends_auth }) => {


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
                                <button onClick={extends_auth}>연장하기</button>
                            </div> : <Link to='/'>LOGIN</Link>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="space"></div>
        </>
    );
};

export default AuthBarComponent;