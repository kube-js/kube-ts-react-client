// tslint:disable:no-magic-numbers
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  rating: {
    display: 'flex',
    alignItems: 'center',
  },
  ratingValue: {
    fontWeight: 600,
    color: 'grey',
    fontSize: '12px',
    marginLeft: '6px'
  },
}));

export default useStyles;
