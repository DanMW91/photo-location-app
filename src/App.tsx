import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './shared/components/Navigation';
import Map from './pages/Map';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/map" element={<Map />} />
        </Routes>
        <Navigation />
      </Router>
    </>
  );
}

export default App;
