import * as yup from 'yup';

export default yup.object().shape({
  name: yup
    .string()
    .required('formErrors.required'),
  logo: yup
    .string(),
  tier: yup
    .number()
    .required('formErrors.required'),
  coordinates: yup
    .array().of(yup.string())
    .required(),
  friendships: yup
    .array().of(yup.string()),
  agreements: yup
    .array().of(yup.string()),
  positives: yup
    .array().of(yup.string()),
  satellites: yup
    .array().of(yup.string()),
  satelliteOf: yup
    .string()
    .nullable(),
});
