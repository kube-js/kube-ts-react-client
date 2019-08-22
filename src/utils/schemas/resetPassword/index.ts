import * as Yup from 'yup';
import { REGEXP_PASSWORD } from '../../../constants/regex';

const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .trim()
    .matches(
      REGEXP_PASSWORD,
      'Password must be 8 characters long, containing at least: 1 upper and 1 lower case, 1 digit and 1 special characters i.e. one of the following: #?!@$%^&*-'
    )
    .required('Required'),
  passwordConfirmation: Yup.string()
    .trim()
    .matches(
      REGEXP_PASSWORD,
      'Password confirmation must be 8 characters long, containing at least: 1 upper and 1 lower case, 1 digit and 1 special characters i.e. one of the following: #?!@$%^&*-'
    )
    .oneOf(
      [Yup.ref('password')],
      'New password confirmation must match new password'
    )
    .required('Required'),
});

export default resetPasswordSchema;
