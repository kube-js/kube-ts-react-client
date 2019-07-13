import _isNil from 'ramda/src/isNil';
import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { DASHBOARD } from '../../../constants/routes';
import { State } from '../../../redux/rootReducer';

export interface UnauthenticatedRouteProps extends RouteProps {
  readonly isAuthenticated?: boolean;
}

export const UnauthenticatedRoute = ({
  isAuthenticated,
  ...props
}: UnauthenticatedRouteProps) =>
  isAuthenticated ? <Redirect to={DASHBOARD} /> : <Route {...props} />;

const mapStateToProps = ({ auth }: State) => ({
  isAuthenticated: !_isNil(auth.user),
});

export default connect(mapStateToProps)(UnauthenticatedRoute);
