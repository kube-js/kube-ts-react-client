// tslint:disable:no-magic-numbers
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingBottom: theme.spacing(8),
    paddingTop: theme.spacing(8),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default useStyles;
