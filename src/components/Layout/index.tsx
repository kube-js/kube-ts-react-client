// tslint:disable:no-magic-numbers
/* istanbul ignore next */
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';
import OnlyAuthenticated from '../Auth/OnlyAuthenticated';
import OnlyUnauthenticated from '../Auth/OnlyUnauthenticated';
import LogoutButton from '../LogoutButton';
import NavBarMenu from '../NavBarMenu';
import NavBarMobileMenu from '../NavBarMobileMenu';
import SearchBox from '../SearchBox';
import useStyles from './styles';

export interface Options {
  readonly children: any;
}


const Layout = ({ children }: Options) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  function handleProfileMenuOpen(event: any) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  function handleMobileMenuOpen(event: any) {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const menuId = 'primary-search-account-menu';

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div className={classes.grow}>
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <OnlyAuthenticated>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
            </OnlyAuthenticated>
            <Button
              component={Link}
              to="/"
              color="default"
              variant="text"
              className={`${classes.link} ${classes.logoLink}`}
            >
              kudemy
            </Button>
            
            <SearchBox />

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <OnlyUnauthenticated>
                <Button
                  component={Link}
                  to="/login"
                  color="secondary"
                  variant="contained"
                  className={classes.link}
                >
                  Login
                </Button>

                <Button
                  component={Link}
                  to="/register"
                  color="secondary"
                  variant="contained"
                  className={classes.link}
                >
                  Register
                </Button>
              </OnlyUnauthenticated>
              <OnlyAuthenticated>
                <LogoutButton />
              </OnlyAuthenticated>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="Show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <NavBarMobileMenu
          anchorEl={mobileMoreAnchorEl}
          id={mobileMenuId}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
          onOpen={handleProfileMenuOpen}
        />
        <NavBarMenu
          anchorEl={anchorEl}
          id={menuId}
          open={isMenuOpen}
          onClose={handleMenuClose}
        />
      </div>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
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

// tslint:disable-next-line:max-file-line-count
export default Layout;
