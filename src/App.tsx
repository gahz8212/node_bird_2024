import React from 'react';
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import JoinPage from './pages/JoinPage';

import './lib/styles/index.scss'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/join' element={<JoinPage />} />

    </Routes>
  );
};

export default App;