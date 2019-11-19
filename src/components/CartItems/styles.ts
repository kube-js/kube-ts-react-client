import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addedToBasket: {
      display: 'flex',
      flexDirection: 'column',
    },
    addedToBasketContent: {
      '& svg': {
        color: 'green',
      },
      alignItems: 'center',
      display: 'flex',
    },
    addedToBasketImageWrapper: {
      '&img': {
        minWidth: 150,
      },
    },
    itemImage: {
      height: 100,
      width: 150,
    },
    root: {
      border: '1px solid rgba(0, 0, 0, .125)',
      // tslint:disable-next-line:no-magic-numbers
      marginTop: theme.spacing(3),
      overflowX: 'auto',
      width: '100%',
    },
    table: {},
  })
);

export default useStyles;
