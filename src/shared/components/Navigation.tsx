import { useState, useContext, FunctionComponent } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { Paper } from '@mui/material';
import AuthContext from '../../context/auth-ctx';

const Navigation: FunctionComponent = () => {
  const [value, setValue] = useState();
  const { loginState, logout } = useContext(AuthContext);

  return (
    <Box
      sx={{
        zIndex: 1500,
        width: '100%',
        position: 'fixed',
        bottom: '0px',
        '@media (min-width:780px)': { position: 'relative' },
      }}
    >
      <Paper>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            component={Link}
            label="Recents"
            to="/log"
            icon={<RestoreIcon />}
          />

          <BottomNavigationAction
            component={Link}
            label="Favorites"
            to="/favourites"
            icon={<FavoriteIcon />}
          />
          <BottomNavigationAction
            component={Link}
            label="Map"
            to="/map"
            icon={<LocationOnIcon />}
          />
          {loginState.isLoggedIn && (
            <BottomNavigationAction
              onClick={logout}
              component={Link}
              label="Logout"
              to="/auth"
              icon={<LogoutIcon />}
            />
          )}
          {!loginState.isLoggedIn && (
            <BottomNavigationAction
              component={Link}
              label="Login"
              to="/auth"
              icon={<PersonIcon />}
            />
          )}
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default Navigation;
