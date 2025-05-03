import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Navigation: React.FC = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Planejja
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Navigation; 