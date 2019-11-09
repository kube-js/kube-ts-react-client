import Button from '@material-ui/core/Button';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import useStyles from '../../components/Layout/styles';
import { logoutRequested } from '../../redux/auth/actionCreators';

export interface LogoutButtonProps {
  readonly logout: () => ReturnType<typeof logoutRequested>;
}

const LogoutButton = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const onClick = useCallback(() => dispatch(logoutRequested()),[]);

  return (
    <Button
      onClick={onClick}
      color="inherit"
      className={classes.link}
    >
      {t('navbar.logout')}
    </Button>
  );
};

export default LogoutButton;
