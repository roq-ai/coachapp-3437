import * as yup from 'yup';

export const teamValidationSchema = yup.object().shape({
  name: yup.string().required(),
  club_id: yup.string().nullable().required(),
  head_coach_id: yup.string().nullable().required(),
});
