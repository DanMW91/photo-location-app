import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './shared/components/Navigation';
import Map from './pages/Map/Map';
import Auth from './pages/Auth/Auth';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0d2558',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navigation />
        <Routes>
          <Route path="/map" element={<Map />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
