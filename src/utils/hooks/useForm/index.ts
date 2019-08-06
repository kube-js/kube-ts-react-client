// @credits: https://egghead.io/lessons/react-build-your-own-formik-using-react-hooks-with-jared-palmer
import { useReducer, useEffect } from 'react';
import _identity from 'ramda/src/identity';
import {
  SET_FIELD_TOUCHED,
  SET_FIELD_VALUE,
  SET_ALL_FIELD_TOUCHED,
  SET_ERRORS,
} from './actions';

export interface FormAction {
  readonly type: string;
  readonly payload?: any;
}
export type Touched<T> = { readonly [P in keyof T]?: boolean };

export type Values<T> = { readonly [P in keyof T]?: any };

export type Errors<T> = { readonly [P in keyof T]?: string };

export interface State<T> {
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

    case SET_ALL_FIELD_TOUCHED:
      return {
        ...state,
        touched: Object.keys(state.values).reduce((acc, next) => {
          return { ...acc, [next]: true };
        }, {}),
      };

    case SET_ERRORS:
      return {
        ...state,
        errors: action.payload,
      };

    default:
      return state;
  }
};

export interface Options<T> {
  readonly initialValues: T;
  readonly onSubmit: (values: Values<T>) => void;
  readonly validate?: (values: Values<T>) => Promise<Errors<T>>;
  readonly validateOnChange?: boolean;
}

export interface FormHook<T> extends State<T> {
  readonly handleBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
  readonly handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  readonly handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

function useForm<Values>({
  initialValues,
  onSubmit,
  validate = () => Promise.resolve({}),
  validateOnChange = false,
}: Options<Values>): FormHook<Values> {
  const reducerState: State<Values> = {
    errors: {},
    touched: {},
    values: initialValues,
  };

  const [state, dispatch] = useReducer(formReducer, reducerState);

  useEffect(() => {
    if (validateOnChange) {
      validate(state.values)
        .then(() => {
          dispatch({ type: SET_ERRORS, payload: {} });
        })
        .catch(errors => {
          dispatch({ type: SET_ERRORS, payload: errors });
        });
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

    dispatch({ type: SET_FIELD_TOUCHED, payload: { name } });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch({ type: SET_ALL_FIELD_TOUCHED });

    onSubmit(state.values);
  };

  return {
    handleBlur,
    handleChange,
    handleSubmit,
    ...state,
  };
}

export default useForm;
