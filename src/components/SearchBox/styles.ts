// tslint:disable:no-magic-numbers
import {
  createStyles,
  fade,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200,
      },
    },
    inputRoot: {
      color: 'inherit',
    },
    search: {
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      backgroundColor: fade(theme.palette.common.white, 0.15),
      borderRadius: theme.shape.borderRadius,
      marginLeft: 0,
      marginRight: theme.spacing(2),
      position: 'relative',
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      alignItems: 'center',
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
      pointerEvents: 'none',
      position: 'absolute',
      width: theme.spacing(7),
    },
  })
);

// tslint:disable-next-line:max-file-line-count
export default useStyles;
