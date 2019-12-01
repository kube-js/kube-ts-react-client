// tslint:disable:no-magic-numbers
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardNumber: {
      paddingBottom: '20px',
      width: '100%'
    },
    cvc: {
      flex: '1 1 30%',
    },
    cvcAndExpiry: {
      display: 'flex',
      width: '100%',
    },
    expiry: {
      flex: '1 0 50%',
      marginRight: '10px',
    },
    form: {},
    gridSidebar: {
      paddingTop: '0 !important',
    },
    paymentCard: {},
    paymentField: {
      background: '#fff',
    },
    paymentForm: {
      flex: '1 0 65%',
      marginLeft: 10,
    },
    paymentSection: {
      border: '1px solid rgba(0, 0, 0, .125)',
      display: 'flex',
      flexWrap: 'wrap',
      overflowX: 'auto',
      padding: theme.spacing(3),
      width: '100%',
    },
    root: {
      marginTop: 20,
    },
    selectField: {
      width: 100,
    },
    submit: {},
    summarySidebar: {
      border: '1px solid rgba(0, 0, 0, .125)',
      padding: theme.spacing(1),
    },
  })
);

export default useStyles;
