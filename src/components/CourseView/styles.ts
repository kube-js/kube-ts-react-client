// tslint:disable:no-magic-numbers
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  avatar: {
    backgroundColor: 'orange',
    color: '#fff',
    margin: 10,
  },
  metaInfo: {
    backgroundColor: '#24292e',
    padding: '0',
    width: '100%',
  },
  metaInfoSidebar: {
    position: 'relative'
  },
  paper: {
    color: theme.palette.text.primary,
    padding: theme.spacing(2),
  },
  root: {
    flexGrow: 1,
  },
  sidebarCard: {
    marginTop: '1rem',
    position: 'absolute',
  }
}));

export default useStyles;
