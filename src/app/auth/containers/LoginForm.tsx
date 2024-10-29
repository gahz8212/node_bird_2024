import React from 'react';
import AuthForm from '../components/AuthForm';
import AuthTemplate from '../components/AuthTemplate';
type Props = {}
const LoginForm: React.FC<Props> = () => {

    return (
        <div>
            <AuthTemplate children={<AuthForm form={'login'} />}></AuthTemplate>
        </div>
    );
};

export default LoginForm;