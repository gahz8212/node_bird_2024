import React from 'react';
type Props = {
    children: React.ReactNode;
}
const AuthTemplate: React.FC<Props> = ({ children }) => {
    return (
        <div className='wrap-authForm'>
            <div className="authForm">
                <div className="logo-area">
                    FULL STACK DEVELOPER
                </div>
                <div className="white-box">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthTemplate;