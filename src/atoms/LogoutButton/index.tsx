import Button from '@material-ui/core/Button';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import useStyles from '../../components/Layout/styles';
import { logoutRequested } from '../../redux/auth/actionCreators';

export interface LogoutButtonProps {
  readonly logout: () => ReturnType<typeof logoutRequested>;
}

const LogoutButton = ({ logout }: LogoutButtonProps) => {
  const classes = useStyles();

  return (
    <Button
      onClick={logout}
      color="inherit"
      className={classes.link}
    >
      Logout
    </Button>
  );
};

export default connect(
  null,
  (dispatch: Dispatch) => ({
    logout: () => dispatch(logoutRequested()),
  })
)(LogoutButton);
