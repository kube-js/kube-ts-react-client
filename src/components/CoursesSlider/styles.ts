// tslint:disable:no-magic-numbers
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  arrow: {
    background: '#fff',
    borderRadius: '50%',
    boxShadow: '0 0 1px 1px rgba(20,23,28,.1), 0 3px 1px 0 rgba(20,23,28,.1)',
    color: theme.palette.primary.main,
    cursor: 'pointer',
    display: 'block',
    height: '60px',
    outline: 'none',
    padding: '0',
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)',
    webkitTransform: 'translate(0, -50%)',
    width: '60px',
    zIndex: 20,
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  nextArrow: {
    right: '-25px',
  },
  prevArrow: {
    left: '-25px',
  },
  slider: {
    '& .slick-slide > div': {
      margin: '5px',
    },
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

export default useStyles;
