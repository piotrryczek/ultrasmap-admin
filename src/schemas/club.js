import * as yup from 'yup';

export default yup.object().shape({
  name: yup
    .string()
    .required(),
  logo: yup
    .string()
    .required(),
  tier: yup
    .number()
    .required(),
  location: yup.object().shape({
    type: yup
      .string()
      .required(),
    coordinates: yup
      .array().of(yup.string())
      .required(),
  }),
  friendships: yup
    .array().of(yup.string()),
  agreements: yup
    .array().of(yup.string()),
  positives: yup
    .array().of(yup.string()),
  satellites: yup
    .array().of(yup.string()),
  satelliteOf: yup
    .string(),
});
