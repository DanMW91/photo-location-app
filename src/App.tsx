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
import ShowUser from './pages/ShowUser/ShowUser';
import AuthContext from './context/auth-ctx';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { LocationContextProvider } from './context/location-ctx';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0d2558',
    },
  },
});

function App() {
  const { loginState } = useContext(AuthContext);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocationContextProvider>
        <Router>
          <Navigation />
          <div style={{ zIndex: 100 }}>
            <Routes>
              <Route path="/map" element={<MapPage />} />
              <Route
                path="/auth"
                element={
                  !loginState.isLoggedIn ? <Auth /> : <Navigate to="/map" />
                }
              />
              <Route path="/user/:userId" element={<ShowUser />} />
            </Routes>
          </div>
        </Router>
      </LocationContextProvider>
    </ThemeProvider>
  );
}

export default App;
