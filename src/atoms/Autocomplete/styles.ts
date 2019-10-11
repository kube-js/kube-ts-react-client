// tslint:disable:no-magic-numbers
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  divider: {
    height: theme.spacing(2),
  },
  inputInput: {
    background: '#fff',
    borderRadius: '5px',
    color: '#000',
    flexGrow: 1,
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
