import { Link } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import _isNil from 'ramda/src/isNil';
import React, { Fragment, SyntheticEvent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import ErrorMessage from '../../components/ErrorMessage';
import {
  ResendVerifyTokenOptions,
  resendVerifyTokenRequested,
} from '../../redux/auth/actionCreators';
import { State } from '../../redux/rootReducer';
import User from '../../types/items/User';

export type ResendVerifyTokenHandler = (
  options: ResendVerifyTokenOptions
) => any;

export interface Props {
  readonly user?: User;
  readonly resendVerifyToken: ResendVerifyTokenHandler;
}

export interface HandleVerifyOptions {
  readonly resendVerifyToken: ResendVerifyTokenHandler;
  readonly email: string;
}

const Dashboard = ({ user, resendVerifyToken }: Props) => {
  const isVerified = !_isNil(user) && !_isNil((user as any).verifiedAt);

  // TODO: allow to log in without being verified in kube-ts-server

  return (
    <div>
      <h2>Dashboard</h2>
      {/** TODO: implement warning message type */}
      {user && !isVerified && (
        <ErrorMessage>
          <Fragment>
            <ErrorOutlineIcon />
            Account has not been verified yet. Click
            <Link
              style={{ margin: '0 5px', cursor: 'pointer' }}
              onClick={(e: SyntheticEvent) => {
                e.preventDefault();
                resendVerifyToken({ email: user.email });
              }}
            >
              here
            </Link>
            to verify your account.
          </Fragment>
        </ErrorMessage>
      )}
    </div>
  );
};

const mapStateToProps = (state: State) => ({ user: state.auth.user });

const mapDispatchToProps = (dispatch: Dispatch) => ({
  resendVerifyToken: ({ email }: ResendVerifyTokenOptions) =>
    dispatch(
      // TODO: implement debounce and server throttling
      // TODO: implement redux hooks
      resendVerifyTokenRequested({
        email,
      })
    ),
});

// TODO: how redux connect compare to hooks

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
