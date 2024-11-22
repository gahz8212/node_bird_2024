import React from 'react';
import { Link } from 'react-router-dom';
type Props = {
    auth: { name: string } | null;
    logout: () => void;
}
const AuthBarComponent: React.FC<Props> = ({ auth, logout }) => {
    const es = new EventSource('/sse')
    const end = new Date();
    end.setHours(end.getHours() + 1)
    es.onmessage = function (e: any) {
        console.log('server', new Date(e.data))
        console.log('end', end)
        console.log(typeof new Date(e.data))
    }
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
                                    <span>남은시간</span><br /><span> 00:00:00</span>
                                </div>
                                <button onClick={() => { alert('시간연장') }}>연장하기</button>
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