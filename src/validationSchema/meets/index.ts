import * as yup from 'yup';

export const meetValidationSchema = yup.object().shape({
  name: yup.string().required(),
  date: yup.date().required(),
  team_id: yup.string().nullable().required(),
  team_manager_id: yup.string().nullable().required(),
});
