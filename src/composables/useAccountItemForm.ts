import { computed, watch } from 'vue';
import { useForm } from 'vee-validate';

import { ACCOUNT_TYPE, ACCOUNT_TYPE_OPTIONS } from '@/constants/account';
import { AccountSchema } from '@/schemas/account.schema';
import { useAccountStore } from '@/stores/AccountStore';
import type { Account, AccountForm } from '@/types/account';
import { parseTags } from '@/utils/parseTags';

export function useAccountItemForm(account: Account) {
  const accountStore = useAccountStore();

  const { errors, validate, defineField, validateField } = useForm<AccountForm>({
    validationSchema: AccountSchema,
    initialValues: {
      id: account.id,
      tags: account.tags.map((tag) => tag.text).join('; '),
      type: account.type,
      login: account.login,
      password: account.password,
    },
  });

  const [tags] = defineField('tags');
  const [type] = defineField('type');
  const [login] = defineField('login');
  const [password] = defineField('password');

  const isLocalAccount = computed(() => type.value === ACCOUNT_TYPE.LOCAL);

  async function save() {
    const { valid } = await validate();
    if (!valid) {
      return;
    }

    accountStore.updateAccount({
      id: account.id,
      tags: parseTags(tags.value),
      type: type.value,
      login: login.value,
      password: isLocalAccount.value ? password.value : null,
    });
  }

  function deleteAccount() {
    accountStore.deleteAccount(account.id);
  }

  watch(type, () => {
    validateField('password');
  });

  return {
    errors,
    tags,
    type,
    login,
    password,
    save,
    deleteAccount,
    isLocalAccount,
    accountTypeOptions: ACCOUNT_TYPE_OPTIONS,
  };
}
