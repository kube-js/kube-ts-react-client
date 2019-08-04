// TODO: move that (jest-dom/extend-expect) to setup  file
// tslint:disable-next-line:no-import-side-effect
import '@testing-library/jest-dom/extend-expect';
// TODO: move that (@testing-library/react/cleanup-after-each) to setup file
import { render } from '@testing-library/react';
import React from 'react';
import useFormik from './index';

interface Values {
  readonly email: string;
  readonly password: string;
}

describe('@useFormik', () => {
  const defaultOptions = {
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: jest.fn(),
  };

  const renderHook = () => {
    let result: any;

    const HookWrapper = () => {
      result = useFormik<Values>(defaultOptions);

      return null;
    };

    render(<HookWrapper />);

    return result;
  };

  it('returns initial state', () => {
    const result = renderHook();

    expect(result).toMatchSnapshot();
  });
});
