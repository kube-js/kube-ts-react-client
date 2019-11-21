// tslint:disable:no-magic-numbers
import { Button, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import _isNil from 'ramda/src/isNil';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router';
import { CHECKOUT } from '../../constants/routes';
import { State } from '../../redux/rootReducer';
import sumBy from '../../utils/helpers/sumBy';
import LoginForm from '../LoginForm';
import Modal from '../Modal';
import RegisterForm from '../RegisterForm';
import useStyles from './styles';

const CartItems = ({ items }: any) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();
  const noUser = useRef({});
  const [open, setOpen] = useState(false);
  const [authView, setAuthView] = useState('register');

  const showRegister = () => {
    setAuthView('register');
  };

  const showLogin = () => {
    setAuthView('login');
  };

  const handleOpen = (e: any) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  const ctaProps = !_isNil(user)
    ? { onClick: goTo(CHECKOUT) }
    : { onClick: handleOpen };

  const registerLinkProps = { to: undefined, onClick: showRegister };
  const loginLinkProps = { to: undefined, onClick: showLogin };

  return (
    <Paper className={classes.paper} square>
      <Typography>
        {t('cart.total')} ({items.length} {courses}): £{total.toFixed(2)}
      </Typography>

      <Button variant="contained" fullWidth color="secondary" {...ctaProps}>
        {t('cart.proceedToCheckout')}
      </Button>
      <Modal open={open} handleClose={handleClose}>
        {authView === 'register' && (
          <RegisterForm loginLinkProps={loginLinkProps} />
        )}
        {authView === 'login' && (
          <LoginForm
            showRemindPassword={false}
            registerLinkProps={registerLinkProps}
          />
        )}
      </Modal>
    </Paper>
  );
};

export default CartItems;
