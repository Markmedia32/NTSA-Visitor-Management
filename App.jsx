import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import HomePage from './Pages/Homepage';
import CardManagement from './Pages/CardManagement';
import VisitorLogProvider from './VisitorContext';

import './App.css';
import VisitorLogs from './Pages/Visitorlogs';

const App = () => (

    <main className="main-wrapper">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cardmanagement" element={<CardManagement />} />
        <Route path="/visitorlogs" element={<VisitorLogs />} />
      </Routes>
    </main>

);

export default App;
