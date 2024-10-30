import React, { useEffect } from 'react';
import AuthForm from '../components/AuthForm';
import AuthTemplate from '../components/AuthTemplate';
import { useDispatch, useSelector } from 'react-redux';
import { authData, authActions } from '../../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
type Props = {}
const JoinForm: React.FC<Props> = () => {
    const dispatch = useDispatch()
    const naviate = useNavigate()
    const { login, join, status } = useSelector(authData)
    const onChange = (e: any) => {
        const { name, value } = e.target;
        dispatch(authActions.changeField({ form: 'join', key: name, value }))
    }
    const onJoin = (joinData: { email: string, password: string, name?: string, rank?: number }) => {
        dispatch(authActions.join(joinData))
    }
    useEffect(() => {
        return () => {
            dispatch(authActions.initForm('join'))
        }
    }, [dispatch])
    useEffect(() => {
        if (status.message === 'join_ok') {
            naviate('/')
        }
    }, [status.message, naviate])
    return (
        <div>
            <AuthTemplate> {<AuthForm form={'join'} onChange={onChange} formData={join} onSubmit={onJoin} />}</AuthTemplate>
        </div>
    );
};

export default JoinForm;