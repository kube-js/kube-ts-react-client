import { Link } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import _isNil from 'ramda/src/isNil';
import React, { Fragment, SyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
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

const Dashboard = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useSelector(({ auth }: State) => auth);
  const isVerified = !_isNil(user) && !_isNil((user as any).verifiedAt);

  const resendVerifyToken = ({ email }: ResendVerifyTokenOptions) =>
    dispatch(
      resendVerifyTokenRequested({
        email,
      })
    );

  // TODO: allow to log in without being verified in kube-ts-server
  return (
    <div>
      <h2>{t('dashboard.mainHeader')}</h2>
      {/** TODO: implement warning message type */}
      {user && !isVerified && (
        <ErrorMessage>
          <Fragment>
            <ErrorOutlineIcon />
            {t('dashboard.accountHasBeenVerified')}
            <Link
              style={{ margin: '0 5px', cursor: 'pointer' }}
              onClick={(e: SyntheticEvent) => {
                e.preventDefault();
                resendVerifyToken({ email: user.email });
              }}
            >
              {t('global.here')}
            </Link>
            {t('dashboard.toVerifyYourAccount')}
          </Fragment>
        </ErrorMessage>
      )}
    </div>
  );
};

export default Dashboard;