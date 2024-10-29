import React from 'react';
import AuthForm from '../components/AuthForm';
import AuthTemplate from '../components/AuthTemplate';
type Props = {}
const JoinForm: React.FC<Props> = () => {

    return (
        <div>
            <AuthTemplate children={<AuthForm form={'join'} />}></AuthTemplate>
        </div>
    );
};

export default JoinForm;