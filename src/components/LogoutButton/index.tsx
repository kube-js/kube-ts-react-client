import Button from '@material-ui/core/Button';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { logoutRequested } from '../../redux/auth/actionCreators';
import useStyles from '../Layout/styles';

export interface LogoutButtonProps {
  readonly logout: () => ReturnType<typeof logoutRequested>;
}

const LogoutButton = ({ logout }: LogoutButtonProps) => {
  const classes = useStyles();

  return (
    <Button
      onClick={logout}
      color="secondary"
      variant="contained"
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
