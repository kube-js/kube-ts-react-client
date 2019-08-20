import { Link } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import _isNil from 'ramda/src/isNil';
import React, { Fragment, SyntheticEvent } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import ErrorMessage from '../../components/ErrorMessage';
import {
  VerifyAccountOptions,
  verifyAccountRequested,
} from '../../redux/auth/actionCreators';
import { State } from '../../redux/rootReducer';

export type VerifyAccountHandler = (
  options: VerifyAccountOptions
) => typeof verifyAccountRequested;

// TODO: install js-items and import item interface
export interface Props {
  readonly user?: any;
  readonly verifyAccount: VerifyAccountHandler;
}

export interface HandleVerifyOptions extends VerifyAccountOptions {
  readonly verifyAccount: VerifyAccountHandler;
}

const handleVerifyAccount = ({
  verifyAccount,
  email,
  token,
}: HandleVerifyOptions) => (e: SyntheticEvent) => {
  e.preventDefault();
  verifyAccount({ email, token });
};

const Dashboard = ({ user, verifyAccount }: Props) => {
  const isUnverified = !_isNil(user) && user.verfiedAt === null;

  return (
    <div>
      <h2>Dashboard</h2>
      {/** TODO: implement warning message type */}
      {isUnverified && (
        <ErrorMessage>
          <Fragment>
            <ErrorOutlineIcon />
            Account has not been verified yet. Click
            <Link
              style={{ margin: '0 5px', cursor: 'pointer' }}
              onClick={handleVerifyAccount({
                // TODO: change API to return all user props
                email: user.email,
                token: user.verifyToken,
                verifyAccount,
              })}
            >
              here
            </Link>
            to verify your account.
          </Fragment>
        </ErrorMessage>
      )}
      <FormattedMessage id="foo.bar" />
    </div>
  );
};

const mapStateToProps = ({ auth: { user } }: State) => user;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  verifyAccount: ({ email, token }: VerifyAccountOptions) =>
    dispatch(
      // TODO: 'Account verified successfully. You can now log in.' - change API message
      // TODO: change so its not redirecting to login, debounce
      verifyAccountRequested({
        email,
        token,
      })
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
