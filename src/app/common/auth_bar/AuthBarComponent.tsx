import React from 'react';
import { Link } from 'react-router-dom';
type Props = {
    auth: {} | null;
    logout: () => void;
}
const AuthBarComponent: React.FC<Props> = ({ auth, logout }) => {

    return (
        <>
            <div className='Wrap-authBar'>
                <div className="authBar">
                    <div className="logo"><img src="/logo192.png" alt="logo" /></div>
                    <div className="button">
                        {auth ? <button onClick={logout}>LOGOUT</button> : <Link to='/'>LOGIN</Link>}
                    </div>
                </div>
            </div>
            <div className="space"></div>
        </>
    );
};

export default AuthBarComponent;