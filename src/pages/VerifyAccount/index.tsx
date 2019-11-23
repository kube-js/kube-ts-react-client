import Container from '@material-ui/core/Container';
import _defaultTo from 'ramda/src/defaultTo';
import _isNil from 'ramda/src/isNil';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';
import { LOGIN } from '../../constants/routes';
import {
  VerifyAccountOptions,
  verifyAccountRequested,
} from '../../redux/auth/actionCreators';
import { State } from '../../redux/rootReducer';
import useStyles from './styles';

const VerifyAccount = () => {
  const classes = useStyles();

  const { t } = useTranslation();

  const { verifyAccountLoading, verifyAccountError } = useSelector(
    ({ auth }: State) => auth
  );

  const dispatch = useDispatch();

  const verifyAccount = (options: VerifyAccountOptions) =>
    dispatch(verifyAccountRequested(options));

  const params =
    // TODO: add polyfill
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
