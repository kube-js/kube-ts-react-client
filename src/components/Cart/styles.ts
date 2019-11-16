// tslint:disable:no-magic-numbers
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  avatar: {
    backgroundColor: 'orange',
    color: '#fff',
    margin: 10,
  },
  contentHeadline: {
    fontSize: '1.5rem',
    lineHeight: '2rem',
    margin: '1rem 0',
  },
  mainHeadline: {
    color: '#fff',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    marginTop: '1rem',
  },
  root: {
    flexGrow: 1,
  },
  topSection: {
    backgroundColor: '#24292e',
    padding: '40px 0',
    width: '100%',
  },
}));

export default useStyles;
