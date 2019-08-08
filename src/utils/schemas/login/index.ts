import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .trim()
    .required('Required'),
});

export default loginSchema;
