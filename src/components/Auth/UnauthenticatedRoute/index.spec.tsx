// TODO: move that (jest-dom/extend-expect) to setup  file
// tslint:disable-next-line:no-import-side-effect
import '@testing-library/jest-dom/extend-expect';
// TODO: move that (@testing-library/react/cleanup-after-each) to setup file
import { render } from '@testing-library/react';
// tslint:disable-next-line:no-import-side-effect
import '@testing-library/react/cleanup-after-each';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UnauthenticatedRoute, UnauthenticatedRouteProps } from './index';

const TestComponent = () => <div>test</div>;

const renderComponent = ({
  component = TestComponent,
  ...props
}: UnauthenticatedRouteProps) =>
  render(
    <Router>
      <UnauthenticatedRoute {...props} component={component} />
    </Router>
  );

describe('UnauthenticatedRoute', () => {
  it('renders when unauthenticated', () => {
    const { queryByText } = renderComponent({
      isAuthenticated: false,
    });

    expect(queryByText('test')).toBeInTheDocument();
  });

  it('does not render when authenticated', () => {
    const { queryByText } = renderComponent({
      isAuthenticated: true,
    });

    expect(queryByText('test')).not.toBeInTheDocument();
  });
});
