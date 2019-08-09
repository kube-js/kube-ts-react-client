import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from '../../atoms/LogoutButton';
import SearchBox from '../../atoms/SearchBox';
import { LOGIN, REGISTER } from '../../constants/routes';
import OnlyAuthenticated from '../Auth/OnlyAuthenticated';
import OnlyUnauthenticated from '../Auth/OnlyUnauthenticated';
import NavBarMenu from '../NavBarMenu';
import NavBarMobileMenu from '../NavBarMobileMenu';
import useStyles from './styles';

export interface NavBarProps {
  readonly handleSidebarOpen: () => void;
  readonly open: boolean;
}

const NavBar = ({ handleSidebarOpen, open }: any) => {
  const classes = useStyles();

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
              onClick={handleSidebarOpen}
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
                to={LOGIN}
                color="inherit"
                className={classes.link}
              >
                Login
              </Button>

              <Button
                component={Link}
                to={REGISTER}
                color="inherit"
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
  );
};

// tslint:disable-next-line:max-file-line-count
export default NavBar;
