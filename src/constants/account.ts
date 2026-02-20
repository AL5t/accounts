import type { AccountTypeOption } from '@/types/account';

export const ACCOUNT_TYPE = {
  LOCAL: 'LOCAL',
  LDAP: 'LDAP',
} as const;

export const ACCOUNT_TYPE_OPTIONS: AccountTypeOption[] = [
  { label: 'Локальная', value: ACCOUNT_TYPE.LOCAL },
  { label: 'LDAP', value: ACCOUNT_TYPE.LDAP },
];
