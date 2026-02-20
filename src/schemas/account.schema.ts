import * as yup from 'yup';

import { ACCOUNT_TYPE } from '@/constants/account';
import type { AccountType } from '@/types/account';

export const AccountSchema = yup.object({
  type: yup
    .mixed<AccountType>()
    .required('Тип записи обязателен'),

  login: yup
    .string()
    .required('Логин обязателен')
    .max(100),

  password: yup
    .string()
    .max(100)
    .when('type', {
      is: ACCOUNT_TYPE.LOCAL,
      then: (schema) => schema.required('Пароль обязателен'),
      otherwise: (schema) => schema.nullable(),
    }),
});
