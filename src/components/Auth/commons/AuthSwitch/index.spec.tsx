// TODO: move that (jest-dom/extend-expect) to setup  file
// tslint:disable-next-line:no-import-side-effect
import '@testing-library/jest-dom/extend-expect';
// TODO: move that (@testing-library/react/cleanup-after-each) to setup file
import { render } from '@testing-library/react';
// tslint:disable-next-line:no-import-side-effect
import '@testing-library/react/cleanup-after-each';
import React from 'react';
import { Switch } from './index';

const Children = () => <div>test</div>;

const renderComponent = ({
  onlyAuthenticated = true,
  children = Children,
  ...props
}: any) => {
  const Component = Switch({ onlyAuthenticated });

  return render(
    <Component {...props}>
      <Children />
    </Component>
  );
};

describe('OnlyAuthenticated', () => {
  it('renders when authenticated', () => {
    const { queryByText, debug } = renderComponent({
      isAuthenticated: true,
    });

    expect(queryByText('test')).toBeInTheDocument();
  });

  it('does not render when unauthenticated', () => {
    const { queryByText } = renderComponent({
      isAuthenticated: false,
    });

    expect(queryByText('test')).not.toBeInTheDocument();
  });
});

describe('OnlyUnauthenticated', () => {
  it('renders when unauthenticated', () => {
    const { queryByText } = renderComponent({
      isAuthenticated: false,
      onlyAuthenticated: false,
    });

    expect(queryByText('test')).toBeInTheDocument();
  });

  it('does not render when authenticated', () => {
    const { queryByText } = renderComponent({
      isAuthenticated: true,
      onlyAuthenticated: false,
    });

    expect(queryByText('test')).not.toBeInTheDocument();
  });
});
