import { Typography } from '@material-ui/core';
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ROOT } from '../../../constants/routes';
import LoggerContext from '../../../contexts/logger';
import { LoggerFacade } from '../../../services/logger/Facade';

export interface Props {
  readonly children: any;
  readonly logger: LoggerFacade;
}

export interface State {
  readonly hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state = { hasError: false };

  // tslint:disable-next-line:prefer-function-over-method
  public componentDidCatch(error: any, errorInfo: any) {
    this.props.logger.captureException(error, errorInfo);
    this.setState({ hasError: true });
  }

  public handleClick = () =>
    this.setState({
      hasError: false,
    });

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
          <Link onClick={this.handleClick} to={ROOT}>
            Refresh the page
          </Link>
        </Fragment>
      );
    }

    return element;
  }
}

export default (props: any) => (
  <LoggerContext.Consumer>
    {logger => <ErrorBoundary {...props} logger={logger} />}
  </LoggerContext.Consumer>
);
