import _isNil from 'ramda/src/isNil';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteProps } from 'react-router-dom';
import { State } from '../../../../redux/rootReducer';

export interface OnlyAuthenticatedProps extends RouteProps {
  readonly isAuthenticated?: boolean;
  readonly children?: any;
}

export interface AuthSwitchProps {
  readonly onlyAuthenticated: boolean;
}

export const Switch = ({ onlyAuthenticated }: AuthSwitchProps): any => ({
  isAuthenticated,
  children,
  ...props
}: OnlyAuthenticatedProps) => {
  const element = React.isValidElement(children)
    ? React.Children.map(children, (child: any) =>
        React.cloneElement(child, props)
      )
    : children;

  if (onlyAuthenticated) {
    return isAuthenticated ? element : null;
  } else {
    return isAuthenticated ? null : element;
  }
};

const mapStateToProps = ({ auth }: State) => ({
  isAuthenticated: !_isNil(auth.user),
});

export default ({ onlyAuthenticated }: AuthSwitchProps) =>
  connect(
    mapStateToProps,
    {}
  )(Switch({ onlyAuthenticated }) as any);
