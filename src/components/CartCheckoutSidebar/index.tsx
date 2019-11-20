// tslint:disable:no-magic-numbers
import { Button, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import _isNil from 'ramda/src/isNil';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router';
import { CHECKOUT } from '../../constants/routes';
import { State } from '../../redux/rootReducer';
import sumBy from '../../utils/helpers/sumBy';
import LoginForm from '../LoginForm';
import Modal from '../Modal';
import useStyles from './styles';

const CartItems = ({ items }: any) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();
  const noUser = useRef({});
  
  const { user } = useSelector(({ auth }: State) => auth);

  if (!user) {
    noUser.current = true;
  }

  const courses = items.length === 1 ? t('cart.item') : t('cart.items');
  const total = sumBy('price')(items);

  const goTo = (url: string) => (e: any) => {
    e.preventDefault();
    history.push(url);
  };

  if (noUser.current === true && !_isNil(user)) {
    return <Redirect push to={CHECKOUT} />;
  }

  return (
    <Paper className={classes.paper} square>
      <Typography>
        {t('cart.total')} ({items.length} {courses}): £{total.toFixed(2)}
      </Typography>

      {!_isNil(user) ? (
        <Button
          variant="contained"
          fullWidth
          color="secondary"
          onClick={goTo(CHECKOUT)}
        >
          {t('cart.proceedToCheckout')}
        </Button>
      ) : (
        <Modal
          renderCta={({ handleClickOpen }: any) => (
            <Button
              variant="contained"
              fullWidth
              color="secondary"
              onClick={handleClickOpen}
            >
              {t('cart.proceedToCheckout')}
            </Button>
          )}
        >
          <LoginForm />
        </Modal>
      )}
    </Paper>
  );
};

export default CartItems;
