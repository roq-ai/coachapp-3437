import * as yup from 'yup';

export const swimmerValidationSchema = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  team_id: yup.string().nullable().required(),
  team_manager_id: yup.string().nullable().required(),
});
