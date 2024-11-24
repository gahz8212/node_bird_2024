import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
type Props = {
    auth: { name: string } | null;
    logout: () => void;
}
const AuthBarComponent: React.FC<Props> = ({ auth, logout }) => {
    const [time, setTime] = useState('')
    useEffect(() => {
        const es = new EventSource('/sse')
        const end = new Date();
        let restTime = '00:00:00'
        end.setMinutes(end.getMinutes() + 5)

        es.onmessage = function (e: any) {
            const server = new Date(parseInt(e.data, 10))

            // console.log('server', server)
            // console.log('end', end)
            // console.log(end.getTime() - server.getTime())
            const t = (end.getTime() - server.getTime());
            console.log(t)
            const seconds = ('0' + Math.floor((t / 1000) % 60)).slice(-2)
            const minutes = ('0' + Math.floor((t / 1000 / 60) % 60)).slice(-2)
            const hours = ('0' + Math.floor((t / 1000 / 60 / 60) % 60)).slice(-2)
            restTime = `${hours}:${minutes}:${seconds}`
            setTime(restTime)
        }
    }, [])
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