import React from 'react';
import { Link } from 'react-router-dom';
type Props = {
    form: string

}
const AuthForm: React.FC<Props> = ({ form }) => {
    return (
        <div className='controlls'>
            {form === 'login' &&
                <div className='inputs'>
                    <input type="text" placeholder="name" />
                    <select name="" id="">
                        <option value="">선택</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
            }
            <input type="text" placeholder="email" />
            <input type="text" placeholder="password" />
            {form === 'login' ? <button>LOGIN</button> : <button>JOIN</button>}
            <div>

                {form === 'login' ? <Link to='/join'>JOIN</Link> : <Link className="switch" to='/'>LOGIN</Link>}
            </div>
        </div>
    );
};

export default AuthForm;