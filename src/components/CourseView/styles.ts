// tslint:disable:no-magic-numbers
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  avatar: {
    backgroundColor: 'orange',
    color: '#fff',
    margin: 10,
  },
  paper: {
    color: theme.palette.text.primary,
    padding: theme.spacing(2),
  },
  root: {
    flexGrow: 1,
  },
}));

export default useStyles;
