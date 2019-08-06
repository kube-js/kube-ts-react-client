import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .max(255, 'assword must be maximum 255 characters long')
    .required('Required'),
});

export default loginSchema;
