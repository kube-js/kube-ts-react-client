import _isNil from 'ramda/src/isNil';
import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { LOGIN } from '../../../constants/routes';
import { State } from '../../../redux/rootReducer';

export interface AuthenticatedRouteProps extends RouteProps {
  readonly isAuthenticated: boolean;
}

export const AuthenticatedRoute = ({
  isAuthenticated,
  ...props
}: AuthenticatedRouteProps) =>
  isAuthenticated ? <Route {...props} /> : <Redirect to={LOGIN} />;

const mapStateToProps = ({ auth }: State) => ({
  isAuthenticated: !_isNil(auth.user),
});

export default connect(mapStateToProps)(AuthenticatedRoute);
