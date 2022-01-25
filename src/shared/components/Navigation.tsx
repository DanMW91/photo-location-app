import React, { useState } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link } from 'react-router-dom';
import { Paper } from '@mui/material';

const Navigation = (): JSX.Element => {
  const [value, setValue] = useState();

  return (
    <Box
      sx={{
        width: '100%',
        position: 'absolute',
        bottom: '0px',
        '@media (min-width:780px)': { position: 'relative' },
      }}
    >
      <Paper>
        <BottomNavigation
          sx={{ backgroundColor: 'grey.400' }}
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
            label="Login"
            to="/auth"
            icon={<PersonIcon />}
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
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default Navigation;
