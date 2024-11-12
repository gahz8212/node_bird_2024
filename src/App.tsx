import React from 'react';
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import JoinPage from './pages/JoinPage';
import HomePage from './pages/HomePage';
import { Reset } from 'styled-reset'
import './lib/styles/index.scss'
const App = () => {
  return (
    <React.Fragment>
      <Reset />
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/join' element={<JoinPage />} />
        <Route path='/home/:id' element={<HomePage />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;