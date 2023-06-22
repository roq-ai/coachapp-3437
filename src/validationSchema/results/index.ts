import * as yup from 'yup';

export const resultValidationSchema = yup.object().shape({
  time: yup.number().integer().required(),
  swimmer_id: yup.string().nullable().required(),
  meet_id: yup.string().nullable().required(),
});
