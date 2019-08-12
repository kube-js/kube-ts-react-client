import { Typography } from '@material-ui/core';
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ROOT } from '../../../constants/routes';

export interface Props {
  readonly children: any;
}

export interface State {
  readonly hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state = { hasError: false };

  public static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  // tslint:disable-next-line:prefer-function-over-method
  public componentDidCatch(error: any, errorInfo: any) {
    // TODO: logErrorToMyService(error, errorInfo);
  }

  public render() {
    const { children } = this.props;

    const element = React.isValidElement(children)
      ? React.Children.map(children, (child: any) =>
          React.cloneElement(child, this.props)
        )
      : children;

    if (this.state.hasError) {
      return (
        <Fragment>
          <Typography component="h1" variant="h5">
            Something went wrong...
          </Typography>
          <Link to={ROOT}>Refresh the page</Link>
        </Fragment>
      );
    }

    return element;
  }
}

export default ErrorBoundary;
