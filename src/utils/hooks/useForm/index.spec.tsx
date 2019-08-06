import { renderHook, act } from '@testing-library/react-hooks';
import useFormik, { formReducer } from './index';
import { TEST_EMAIL, TEST_PASSWORD } from '../../tests/testData';
import {
  SET_FIELD_VALUE,
  SET_FIELD_TOUCHED,
  SET_ALL_FIELD_TOUCHED,
  SET_ERRORS,
} from './actions';

describe('@formReducer', () => {
  const defaultState = {
    values: {
      email: '',
      password: '',
    },
    errors: {},
    touched: {},
  };

  afterEach(() => jest.clearAllMocks());

  it('returns default state', () => {
    const result = formReducer(defaultState, { type: 'NOT_EXISTING_ACTION' });

    expect(result).toEqual(defaultState);
  });

  it('returns changed values for email field', () => {
    const result = formReducer(defaultState, {
      type: SET_FIELD_VALUE,
      payload: { name: 'email', value: TEST_EMAIL },
    });

    expect(result).toEqual({
      ...defaultState,
      values: {
        ...defaultState.values,
        email: TEST_EMAIL,
      },
    });
  });

  it('returns changed touched for email field', () => {
    const result = formReducer(defaultState, {
      type: SET_FIELD_TOUCHED,
      payload: { name: 'email' },
    });

    expect(result).toEqual({
      ...defaultState,
      touched: {
        ...defaultState.touched,
        email: true,
      },
    });
  });

  it('returns changed errors for fields', () => {
    const errors = {
      email: 'invalid email!',
      password: 'password must contains at least 8 characters!',
    };

    const result = formReducer(defaultState, {
      type: SET_ERRORS,
      payload: errors,
    });

    expect(result).toEqual({
      ...defaultState,
      errors,
    });
  });

  it('returns changed touched for email field', () => {
    const result = formReducer(defaultState, {
      type: SET_ALL_FIELD_TOUCHED,
    });

    expect(result).toEqual({
      ...defaultState,
      touched: {
        email: true,
        password: true,
      },
    });
  });
});

describe('@useFormik', () => {
  const defaultOptions = {
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: jest.fn(),
    validate: jest.fn(),
  };

  it('returns initial state', () => {
    const { result } = renderHook(() => useFormik(defaultOptions));

    expect(result.current).toMatchSnapshot();
  });

  it('handles change', () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useFormik(defaultOptions)
    );

    const mock = jest.fn();

    const event = {
      persist: mock as any,
      target: { name: 'email', value: TEST_EMAIL },
    } as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleChange(event);
      waitForNextUpdate().then(() => {
        expect(result.current).toMatchSnapshot();
        expect(mock).toBeCalledTimes(1);
      });
    });
  });

  it('handles blur', async done => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useFormik(defaultOptions)
    );

    const mock = jest.fn();

    const event = {
      persist: mock as any,
      target: { name: 'email' },
    } as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleBlur(event);

      waitForNextUpdate().then(() => {
        expect(result.current).toMatchSnapshot();
        expect(mock).toBeCalledTimes(1);
        done();
      });
    });
  });

  it('handles submit', async done => {
    const values = {
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    };

    const options = {
      ...defaultOptions,
      initialValues: {
        ...defaultOptions.initialValues,
        ...values,
      },
    };
    const { result, waitForNextUpdate } = renderHook(() => useFormik(options));

    const event = {
      preventDefault: () => {},
    } as React.FormEvent<HTMLFormElement>;

    act(() => {
      result.current.handleSubmit(event);

      waitForNextUpdate().then(() => {
        expect(result.current).toMatchSnapshot();
        expect(options.onSubmit).toBeCalledWith(values);
        done();
      });
    });
  });
});
