import * as yup from 'yup';

export default yup.object().shape({
  email: yup
    .string()
    .email()
    .required('Req'),
  role: yup
    .string()
    .required('Req')
});
