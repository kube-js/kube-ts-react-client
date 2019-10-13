// tslint:disable:no-magic-numbers
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  closeIcon: {
    cursor: 'pointer',
    right: 0,
  },
  container: {
    display: 'flex',
    flexGrow: 1,
    position: 'relative',
    width: '100%',
  },
  divider: {
    height: theme.spacing(2),
  },
  icon: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    width: theme.spacing(6),
    zIndex: 2,
  },
  inputInput: {
    background: '#fff',
    borderRadius: '5px',
    color: '#000',
    flexGrow: 1,
    paddingLeft: '48px',
    paddingRight: '48px',
    width: 'auto',
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
  paper: {
    left: 0,
    marginTop: theme.spacing(1),
    position: 'absolute',
    right: 0,
    zIndex: 1,
  },
  root: {
    flexGrow: 1,
    height: 250,
  },
}));

export default useStyles;
