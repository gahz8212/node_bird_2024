import React from 'react';
import { Routes, Route } from 'react-router-dom'
import AuthPage from './pages/AuthPage';
import UseCallback from './pages/UseCallback';
import './lib/styles/index.scss'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<AuthPage />} />
      <Route path='/useCallback' element={<UseCallback />} />
    </Routes>
  );
};

export default App;