import React, { useContext } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Navigation from './shared/components/Navigation';
import MapPage from './pages/Map/MapPage';
import Auth from './pages/Auth/Auth';
import AuthContext from './store/auth-ctx';
import { AuthContextProvider } from './store/auth-ctx';
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
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navigation />
        <Routes>
          <Route path="/map" element={<MapPage />} />
          <Route
            path="/auth"
            element={!isLoggedIn ? <Auth /> : <Navigate to="/map" />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
