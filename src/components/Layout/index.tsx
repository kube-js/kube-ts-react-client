import CssBaseline from '@material-ui/core/CssBaseline';
import clsx from 'clsx';
import React, { useState } from 'react';
import NavBar from '../NavBar';
import Sidebar from '../Sidebar';
import useStyles from './styles';

export interface Options {
  readonly children: any;
}

const Layout = ({ children }: Options) => {
  const classes = useStyles();
  
  const [open, setOpen] = useState(false);

  function handleSidebarOpen() {
    setOpen(true);
  }

  function handleSidebarClose() {
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />

      <NavBar {...{ classes, handleSidebarOpen, open }} />

      <Sidebar open={open} handleClose={handleSidebarClose} />

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {children}
      </main>
    </div>
  );
};

export default Layout;
