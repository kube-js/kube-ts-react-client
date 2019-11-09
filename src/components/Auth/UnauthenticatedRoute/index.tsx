import _isNil from 'ramda/src/isNil';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { DASHBOARD } from '../../../constants/routes';
import { State } from '../../../redux/rootReducer';

export const UnauthenticatedRoute = (props: any) => {
  const { user } = useSelector(({ auth }: State) => auth);
  const isAuthenticated = !_isNil(user);

  return isAuthenticated ? <Redirect to={DASHBOARD} /> : <Route {...props} />;
}

export default UnauthenticatedRoute;
