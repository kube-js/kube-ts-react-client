// tslint:disable:no-magic-numbers
import {
  createStyles,
  fade,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';

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
    content: {
      flexGrow: 1,
      marginLeft: -drawerWidth,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        duration: theme.transitions.duration.leavingScreen,
        easing: theme.transitions.easing.sharp,
      }),
      width: '100%',
    },
    contentShift: {
      marginLeft: 0,
      transition: theme.transitions.create('margin', {
        duration: theme.transitions.duration.enteringScreen,
        easing: theme.transitions.easing.easeOut,
      }),
    },
    drawer: {
      flexShrink: 0,
      width: drawerWidth,
    },
    drawerHeader: {
      alignItems: 'center',
      display: 'flex',
      padding: '0 8px',
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    drawerPaper: {
      width: drawerWidth,
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
    logoLink: {
      color: 'white',
      fontWeight: 'bold',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    root: {
      display: 'flex',
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

// tslint:disable-next-line:max-file-line-count
export default useStyles;