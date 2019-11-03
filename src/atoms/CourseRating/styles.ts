// tslint:disable:no-magic-numbers
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  iconEmpty: {
    color: '#dce2e8'
  },
  rating: {
    alignItems: 'center',
    display: 'flex',
  },
  ratingValue: {
    color: '#fff',
    fontSize: '12px',
    fontWeight: 600,
    marginLeft: '6px'
  },
}));

export default useStyles;
