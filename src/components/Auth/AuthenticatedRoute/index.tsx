import _isNil from 'ramda/src/isNil';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { LOGIN } from '../../../constants/routes';
import { State } from '../../../redux/rootReducer';

export const AuthenticatedRoute = (props: any) => {
  const { user } = useSelector(({auth}: State) => auth);

  return !_isNil(user) ? <Route {...props} /> : <Redirect to={LOGIN} />;
}

export default AuthenticatedRoute;
