// @credits: https://egghead.io/lessons/react-build-your-own-formik-using-react-hooks-with-jared-palmer
import { useReducer, useEffect } from 'react';
import _identity from 'ramda/src/identity';
import {
  SET_FIELD_TOUCHED,
  SET_FIELD_VALUE,
  SET_ERRORS,
  SUBMIT_FAILED,
  SUBMIT_SUCCEEDED,
  SUBMIT_REQUESTED,
} from './actions';

export interface FormAction {
  readonly type: string;
  readonly payload?: any;
}
export type Touched<T> = { readonly [P in keyof T]?: boolean };

export type Values<T> = { readonly [P in keyof T]?: any };

export type Errors<T> = { readonly [P in keyof T]?: string };

export interface State<T> {
  readonly isSubmitting: boolean;
  readonly values: Values<T>;
  readonly touched: Touched<T>;
  readonly errors: Errors<T>;
}

export const formReducer = <T>(state: State<T>, action: FormAction) => {
  switch (action.type) {
    case SET_FIELD_VALUE:
      return {
        ...state,
        values: {
          ...state.values,
          [action.payload.name]: action.payload.value,
        },
      };

    case SET_FIELD_TOUCHED:
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.payload.name]: true,
        },
      };

    case SUBMIT_REQUESTED:
      return {
        ...state,
        isSubmitting: true,
        touched: Object.keys(state.values).reduce((acc, next) => {
          return { ...acc, [next]: true };
        }, {}),
      };

    case SUBMIT_SUCCEEDED:
      return {
        ...state,
        isSubmitting: false,
      };

    case SUBMIT_FAILED:
      return {
        ...state,
        isSubmitting: false,
      };

    case SET_ERRORS:
      return {
        ...state,
        errors: {
          ...state.errors,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};

export interface Options<T> {
  readonly initialValues: T;
  readonly onSubmit: (values: Values<T>) => Promise<any>;
  readonly validate?: (values: Values<T>) => Errors<T>;
  readonly validateOnChange?: boolean;
  readonly validateOnBlur?: boolean;
}

export interface FormHook<T> extends State<T> {
  readonly handleBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
  readonly handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  readonly handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

function useForm<T>({
  initialValues,
  onSubmit,
  validate = () => ({}),
  validateOnChange = false,
  validateOnBlur = false,
}: Options<T>): FormHook<T> {
  const reducerState: State<T> = {
    isSubmitting: false,
    errors: {},
    touched: {},
    values: initialValues,
  };

  const [state, dispatch] = useReducer(formReducer, reducerState);

  useEffect(() => {
    if (validateOnChange) {
      const errors = validate(state.values);
      dispatch({ type: SET_ERRORS, payload: errors });
    }
  }, [state.values]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();

    const { name, value } = event.target;

    dispatch({ type: SET_FIELD_VALUE, payload: { name, value } });
  };

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();

    const { name } = event.target;

    if (validateOnBlur) {
      const errors = validate(state.values);
      dispatch({ type: SET_ERRORS, payload: errors });
    }

    dispatch({ type: SET_FIELD_TOUCHED, payload: { name } });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({ type: SUBMIT_REQUESTED });

    const errors = validate(state.values);

    if (Object.keys(errors).length) {
      dispatch({ type: SUBMIT_FAILED });
      dispatch({ type: SET_ERRORS, payload: errors });
    }

    try {
      await onSubmit(state.values);
      dispatch({ type: SUBMIT_SUCCEEDED });
    } catch (err) {
      dispatch({ type: SUBMIT_FAILED });
    }
  };
  return {
    handleBlur,
    handleChange,
    handleSubmit,
    ...state,
  };
}

export default useForm;
