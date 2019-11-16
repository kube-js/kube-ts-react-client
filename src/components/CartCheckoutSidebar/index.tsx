// tslint:disable:no-magic-numbers
import { Button, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import _isNil from 'ramda/src/isNil';
import React from 'react';
import { useTranslation } from 'react-i18next';
import sumBy from '../../utils/helpers/sumBy';
import useStyles from './styles';

const CartItems = ({ items }: any) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const courses = items.length === 1 ? t('cart.item') : t('cart.items');
  const total = sumBy('price')(items);

  return (
    <Paper className={classes.paper} square>
      <Typography>
        {t('cart.total')} ({items.length} {courses}): £{total}
      </Typography>

      <Button variant="contained" fullWidth color="secondary">
        {t('cart.proceedToCheckout')}
      </Button>
    </Paper>
  );
};

export default CartItems;
