import React from 'react';
import AuthBarContainer from '../app/common/auth_bar/AuthBarContainer';
import HomeContainer from '../app/home/HomeContainer';
const HomePage = () => {
    return (
        <div>
            <AuthBarContainer />
            <HomeContainer />
        </div>
    );
};

export default HomePage;