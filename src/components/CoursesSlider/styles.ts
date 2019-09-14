// tslint:disable:no-magic-numbers
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    margin: '0 10px',
    maxHeight: '400px',
  },
  cardContent: {
    flexGrow: 1,
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  icon: {
    marginRight: theme.spacing(2),
  },
}));

export default useStyles;
