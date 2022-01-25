import React, { useState } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link } from 'react-router-dom';

const Navigation = (): JSX.Element => {
  const [value, setValue] = useState();

  return (
    <Box sx={{ width: '100%', position: 'absolute', bottom: '0px' }}>
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
          label="Nearby"
          to="/map"
          icon={<LocationOnIcon />}
        />
      </BottomNavigation>
    </Box>
  );
};

export default Navigation;
