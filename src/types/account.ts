export type AccountType = 'LDAP' | 'LOCAL';

export interface Tag {
  text: string
}

export interface Account {
  id: string,
  tags: Tag[],
  type: AccountType | null,
  login: string,
  password: string | null,
}