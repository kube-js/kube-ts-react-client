import * as Yup from 'yup';

const remindPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email('Invalid email')
    .required('Required'),
});

export default remindPasswordSchema;
