// tslint:disable:no-magic-numbers
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        duration: theme.transitions.duration.leavingScreen,
        easing: theme.transitions.easing.sharp,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        duration: theme.transitions.duration.enteringScreen,
        easing: theme.transitions.easing.easeOut,
      }),
      width: `calc(100% - ${drawerWidth}px)`,
    },
    button: {
      margin: theme.spacing(1),
    },
    contentShift: {
      marginLeft: 0,
      transition: theme.transitions.create('margin', {
        duration: theme.transitions.duration.enteringScreen,
        easing: theme.transitions.easing.easeOut,
      }),
    },
    grow: {
      flexGrow: 1,
    },
    hide: {
      display: 'none',
    },
    link: {
      margin: theme.spacing(1, 1.5),
    },
    logo: {
      height: '30px',
      marginRight: theme.spacing(1),
      width: '30px',
    },
    logoLink: {
      color: 'white',
      fontWeight: 'bold',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    searchBox: {
      maxWidth: '350px',
      width: '100%'
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  })
);

export default useStyles;
