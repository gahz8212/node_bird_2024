import React, { useEffect } from 'react';
import AuthForm from '../components/AuthForm';
import AuthTemplate from '../components/AuthTemplate';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authData, authActions } from '../../../store/slices/authSlice';
import { userData, userActions } from '../../../store/slices/userSlice';

type Props = {}
const LoginForm: React.FC<Props> = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { login, join, status } = useSelector(authData)
    const { auth } = useSelector(userData)
    const onChange = (e: any) => {
        const { name, value } = e.target;
        dispatch(authActions.changeField({ form: 'login', key: name, value }))
    }
    const onLogin = (loginData: { email: string, password: string }) => {
        dispatch(authActions.login(loginData))
    }
    useEffect(() => {
        return () => {
            dispatch(authActions.initForm('login'))
        }
    }, [dispatch])
    useEffect(() => {
        if (status.message === 'login_ok') {
            dispatch(userActions.check())
        }
    }, [dispatch, status.message])
    useEffect(() => {
        if (auth) {
            navigate('/home')
            try {

                localStorage.setItem("user", JSON.stringify(auth))
            } catch (e) { console.error('localstorage is not working') }
        }
    }, [auth, navigate])
    return (
        <div>
            <AuthTemplate>{<AuthForm form={'login'} onChange={onChange} formData={login} onSubmit={onLogin} />}</AuthTemplate>
        </div>
    );
};

export default LoginForm;