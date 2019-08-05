// TODO: move that (jest-dom/extend-expect) to setup  file
// tslint:disable-next-line:no-import-side-effect
import '@testing-library/jest-dom/extend-expect';
import { renderHook } from '@testing-library/react-hooks';
import useFormik from './index';

describe('@useFormik', () => {
  const defaultOptions = {
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: jest.fn(),
  };

  it('returns initial state', () => {
    const { result } = renderHook(() => useFormik(defaultOptions));

    expect(result.current).toMatchSnapshot();
  });
});
