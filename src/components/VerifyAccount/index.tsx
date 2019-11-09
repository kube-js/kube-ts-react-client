import Container from '@material-ui/core/Container';
import _defaultTo from 'ramda/src/defaultTo';
import _isNil from 'ramda/src/isNil';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteProps } from 'react-router';
import { Link } from 'react-router-dom';
import { LOGIN } from '../../constants/routes';
import {
  VerifyAccountOptions,
  verifyAccountRequested,
} from '../../redux/auth/actionCreators';
import { AuthState } from '../../redux/auth/reducer';
import ErrorMessage from '../ErrorMessage';
import useStyles from './styles';

interface VerifyAccountProps extends AuthState, RouteProps {
  readonly verifyAccount: (
    options: VerifyAccountOptions
  ) => ReturnType<typeof verifyAccountRequested>;
}

const VerifyAccount = ({
  verifyAccountLoading,
  verifyAccountError,
  verifyAccount,
}: VerifyAccountProps) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const params =
    location !== undefined ? new URLSearchParams(location.search) : null;

  const emailParam = params !== null ? params.get('email') : '';
  const tokenParam = params !== null ? params.get('token') : '';

  const email = _defaultTo('')(emailParam);
  const token = _defaultTo('')(tokenParam);

  useEffect(() => {
    if (!_isNil(email) && !_isNil(token)) {
      verifyAccount({ email, token });
    }
  }, []);

  const displaySuccessMessage = Boolean(
    !verifyAccountLoading && !verifyAccountError
  );

  const displayError = Boolean(!verifyAccountLoading && verifyAccountError);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        {/** TODO: implement messages */}
        {verifyAccountLoading && <div>{t('auth.verifyingAccount')}</div>}

        {displaySuccessMessage && (
          <div>
            {t('auth.accountHasBeenVerified')}{' '}
            <Link to={LOGIN}>{t('auth.loginAction')}</Link>
          </div>
        )}

        {displayError && <ErrorMessage>{verifyAccountError}</ErrorMessage>}
      </div>
    </Container>
  );
};

// tslint:disable-next-line:max-file-line-count
export default VerifyAccount;
