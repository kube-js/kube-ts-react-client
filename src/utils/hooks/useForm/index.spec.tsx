import { renderHook, act } from '@testing-library/react-hooks';
import useForm, { formReducer } from './index';
import { TEST_EMAIL, TEST_PASSWORD } from '../../tests/testData';
import {
  SET_FIELD_VALUE,
  SET_FIELD_TOUCHED,
  SET_ERRORS,
  SUBMIT_REQUESTED,
} from './actions';

describe('@formReducer', () => {
  const defaultState = {
    isSubmitting: false,
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
      type: SUBMIT_REQUESTED,
    });

    expect(result).toEqual({
      ...defaultState,
      isSubmitting: true,
      touched: {
        email: true,
        password: true,
      },
    });
  });
});

describe('@useForm', () => {
  const defaultOptions = {
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: jest.fn(() => Promise.resolve()),
    validate: jest.fn(() => ({})),
  };

  it('returns initial state', () => {
    const { result } = renderHook(() => useForm(defaultOptions));

    expect(result.current).toMatchSnapshot();
  });

  it('handles change', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useForm(defaultOptions)
    );

    const mock = jest.fn();

    const event = {
      persist: mock as any,
      target: { name: 'email', value: TEST_EMAIL },
    } as React.ChangeEvent<HTMLInputElement>;

    const func: any = async () => {
      result.current.handleChange(event);

      await waitForNextUpdate();
    };

    await act(func);

    expect(result.current).toMatchSnapshot();
    expect(mock).toBeCalledTimes(1);
  });

  it('handles blur', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useForm(defaultOptions)
    );

    const mock = jest.fn();

    const event = {
      persist: mock as any,
      target: { name: 'email' },
    } as React.ChangeEvent<HTMLInputElement>;

    const func: any = async () => {
      result.current.handleBlur(event);

      await waitForNextUpdate();
    };

    await act(func);

    expect(result.current).toMatchSnapshot();
    expect(mock).toBeCalledTimes(1);
  });

  describe('@handleSubmit', () => {
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

    const event = {
      preventDefault: () => {},
    } as React.FormEvent<HTMLFormElement>;

    it('when validation and submit successful', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useForm(options)
      );

      const func: any = async () => {
        result.current.handleSubmit(event);

        await waitForNextUpdate();
      };

      await act(func);

      expect(result.current).toMatchSnapshot();
      expect(options.onSubmit).toBeCalledWith(values);
    });

    it('when validation successful and submit unsuccessful', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useForm({
          ...options,
          onSubmit: () => Promise.reject(new Error('submitting error')),
        })
      );

      const func: any = async () => {
        result.current.handleSubmit(event);

        await waitForNextUpdate();
      };

      await act(func);

      expect(result.current).toMatchSnapshot();
      expect(options.onSubmit).toBeCalledWith(values);
    });

    it('when validation unsuccessful', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useForm({
          ...options,
          validate: jest.fn(() => ({
            email: 'Invalid email',
            password: 'Invalid password',
          })),
        })
      );

      const func: any = async () => {
        result.current.handleSubmit(event);

        await waitForNextUpdate();
      };

      await act(func);

      expect(result.current).toMatchSnapshot();
      expect(options.onSubmit).toBeCalledWith(values);
    });
  });
});
