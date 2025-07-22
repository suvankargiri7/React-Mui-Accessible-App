import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import TitleComponent from '../components/title';

const withHeader = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: P) => (
    <>
      <AppBar position="static">
        <Toolbar>
          <TitleComponent variant="h1" label="Todo App" sx={{fontSize: '30px'}}/>
        </Toolbar>
      </AppBar>
      <Component {...props} />
    </>
  );
};

export default withHeader;
