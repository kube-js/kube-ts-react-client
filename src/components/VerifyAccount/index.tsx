import Container from '@material-ui/core/Container';
import _defaultTo from 'ramda/src/defaultTo';
import _isNil from 'ramda/src/isNil';
import React, { useEffect } from 'react';
import { RouteProps } from 'react-router';
import { Link } from 'react-router-dom';
import { LOGIN } from '../../constants/routes';
import {
  ResendVerifyTokenOptions,
  resendVerifyTokenRequested,
} from '../../redux/auth/actionCreators';
import { AuthState } from '../../redux/auth/reducer';
import ErrorMessage from '../ErrorMessage';
import useStyles from './styles';

interface ResendVerifyTokenProps extends AuthState, RouteProps {
  readonly resendVerifyToken: (
    options: ResendVerifyTokenOptions
  ) => ReturnType<typeof resendVerifyTokenRequested>;
}

const VerifyAccount = ({
  resendVerifyTokenLoading,
  resendVerifyTokenError,
  resendVerifyToken,
}: ResendVerifyTokenProps) => {
  const classes = useStyles();

  const params =
    location !== undefined ? new URLSearchParams(location.search) : null;

  const emailParam = params !== null ? params.get('email') : '';

  const email = _defaultTo('')(emailParam);

  useEffect(() => {
    if (!_isNil(email)) {
      resendVerifyToken({ email });
    }
  }, []);

  const displaySuccessMessage = Boolean(
    !resendVerifyTokenLoading && !resendVerifyTokenError
  );

  const displayError = Boolean(
    !resendVerifyTokenLoading && resendVerifyTokenError
  );

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        {/** TODO: implement messages */}
        {resendVerifyTokenLoading && <div>Verifying account...</div>}

        {displaySuccessMessage && (
          <div>
            Account has been verified successfuly. You can now{' '}
            <Link to={LOGIN}>log in</Link>
          </div>
        )}

        {displayError && <ErrorMessage>{resendVerifyTokenError}</ErrorMessage>}
      </div>
    </Container>
  );
};

// tslint:disable-next-line:max-file-line-count
export default VerifyAccount;
