// tslint:disable:no-magic-numbers
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  cardActions: {
    minHeight: '48px',
  },
  cardContent: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  cardInstructorTitle: {
    lineClamp: 1,
    marginBottom: '10px',
    textOverflow: 'ellipsis',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardPrice: {
    display: 'flex',
    flexDirection: 'row-reverse',
    fontWeight: 600,
  },
  cardTitle: {
    fontSize: '15px',
    fontWeight: 600,
    height: '42px',
    lineClamp: 2,
    lineHeight: '20px',
    marginBottom: '10px',
    textOverflow: 'ellipsis',
    wordBreak: 'break-word',
  },
  cartAction: {
    fontSize: '0.8125rem',
    textTransform: 'capitalize',
  },
  courseLink: {
    color: theme.palette.action.active,
    textDecoration: 'none',
  },
}));

export default useStyles;
