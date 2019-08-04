// @credits: https://egghead.io/lessons/react-build-your-own-formik-using-react-hooks-with-jared-palmer
import { useReducer } from 'react';
import { SET_FIELD_TOUCHED, SET_FIELD_VALUE } from './actions';

export interface FormikAction {
  readonly type: string;
  readonly payload?: any;
}

export const formReducer = <T>(state: T, action: FormikAction) => {
  switch (action.type) {
    default:
      return state;
  }
};

export interface Options<T> {
  readonly initialValues: T;
  readonly onSubmit: (values: T) => void;
}

export type Touched<T> = { readonly [P in keyof T]: boolean };

export type Errors<T> = { readonly [P in keyof T]: string | undefined | null };

export interface FormikHook<Values> {
  readonly handleBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
  readonly handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  readonly handleSubmit: (event: Event) => void;
  readonly values: Values;
  readonly touched: Touched<Values>;
  readonly errors: Errors<Values>;
}

function useFormik<Values>({
  initialValues,
  onSubmit,
}: Options<Values>): FormikHook<Values> {
  const [state, dispatch] = useReducer(formReducer, {
    errors: {},
    touched: {},
    values: initialValues,
  });

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

  const handleSubmit = (event: Event) => {
    event.preventDefault();

    onSubmit(state.values);
  };

  return {
    errors: state.errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched: state.touched,
    values: state.values,
  };
}

export default useFormik;
