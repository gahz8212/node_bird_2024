import React from 'react';
import { Link } from 'react-router-dom';
type Props = {
    auth: {} | null;
    logout: () => void;
}
const AuthBarComponent: React.FC<Props> = ({ auth, logout }) => {

    return (
        <div>
            {auth ? <button onClick={logout}>LOGOUT</button> : <Link to='/'>LOGIN</Link>}
        </div>
    );
};

export default AuthBarComponent;