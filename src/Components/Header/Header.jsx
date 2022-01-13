import React from 'react';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import { Toolbar, Typography } from '@mui/material';

import './Header.scss';

function Header() {
  return (
    <Box sx={{ flexGrow: 1 }} className="Header">
      <AppBar position="static" className="Header__bar">
        <Toolbar>
          <NavLink
            to="/rick-and-morty-characters"
            // className="Header__link"
            className={({ isActive }) => (
              isActive
                ? 'Header__link Header__link--active'
                : 'Header__link'
            )}
          >
            <Typography variant="h6" component="div">
              Rick and Morty Characters
            </Typography>
          </NavLink>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
