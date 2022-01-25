import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './shared/components/Navigation';
import Map from './pages/Map';
import Auth from './pages/Auth/Auth';

function App() {
  return (
    <>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/map" element={<Map />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
