import * as Yup from 'yup';

const paymentSchema = Yup.object().shape({
  // TODO: translate error messages
  cvc: Yup.string()
    .trim()
    .required('Required'),
  expiry: Yup.string()
    .trim()
    .required('Required'),
  month: Yup.string()
    .trim()
    .required('Required'),
  name: Yup.string()
    .trim()
    .required('Required'),
  number: Yup.string()
    .trim()
    .required('Required'),
  year: Yup.string()
    .trim()
    .required('Required'),
});

export default paymentSchema;
