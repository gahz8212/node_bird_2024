import React from 'react';
import { Link } from 'react-router-dom';
type Props = {
    form: string
    onChange: (e: any) => void;
    formData: { email: string, password: string, name?: string, rank?: number, },
    onSubmit: (formData: { email: string, password: string, name?: string, rank?: number, }) => void;
}
const AuthForm: React.FC<Props> = ({ form, onChange, formData, onSubmit }) => {
    return (
        <form className='controlls'
            onSubmit={e => {
                e.preventDefault();
                onSubmit(formData)
            }}
        >
            {form === 'join' &&
                <div className='inputs'>
                    <input type="text" placeholder="name" name="name" onChange={onChange} value={formData.name} />
                    <select name="rank" id="" onChange={onChange} value={formData.rank}>
                        <option value="">직급</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
            }
            <input type="text" placeholder="email" name="email" onChange={onChange} value={formData.email} />
            <input type="text" placeholder="password" name="password" onChange={onChange} value={formData.password} />
            <button type='submit'>{form === 'join' ? 'JOIN' : 'LOGIN'}</button>
            <div className='switch'>
                {form === 'login' ? <Link to='/join'>JOIN</Link> : <Link to='/'>LOGIN</Link>}
            </div>
        </form>
    );
};

export default AuthForm;