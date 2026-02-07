<script setup lang="ts">
import { ref, watch } from 'vue';
import { Button, InputText, Password, Select } from 'primevue';
import { useForm } from 'vee-validate';

import type { Account, AccountForm } from '@/types/account';
import { useAccountStore } from '@/stores/AccountStore';
import { parseTags } from '@/utils/parseTags';
import { AccountSchema } from '@/schemas/account.schema';

const AccountStore = useAccountStore();
const props = defineProps<{
  account: Account,
}>();

const {
  errors,
  validate,
  defineField,
  validateField,
} = useForm<AccountForm>({
  validationSchema: AccountSchema,
  initialValues: {
    id: props.account.id,
    tags: props.account.tags.map(t => t.text).join('; '),
    type: props.account.type,
    login: props.account.login,
    password: props.account.password,
  },
});

const [tags] = defineField('tags');
const [type] = defineField('type');
const [login] = defineField('login');
const [password] = defineField('password');

const typeOptions = ref([
  { label: 'Локальная', value: 'LOCAL', },
  { label: 'LDAP', value: 'LDAP', },
]);

async function save() {
  const { valid } = await validate();
  if (!valid) return;

  AccountStore.updateAccount({
    id: props.account.id,
    tags: parseTags(tags.value),
    type: type.value,
    login: login.value,
    password: type.value === 'LOCAL' ? password.value : null,
  });
}

watch(type, () => {
  validateField('password');
})
</script>

<template>
  <div class="account-row" :class="type !== 'LOCAL' ? 'no-fourth-column' : ''">
    <div class="field">
      <InputText
        v-model="tags"
        type="text"
        placeholder="Метка"
        maxlength="50"
        fluid
        @blur="save"
      ></InputText>
    </div>

    <div class="field">
      <Select
        v-model="type"
        :options="typeOptions"
        option-label="label"
        option-value="value"
        placeholder="Тип записи"
        fluid
        @change="save"
        :invalid="Boolean(errors.type)"
      ></Select>
    </div>

    <div class="field">
      <InputText
        v-model="login"
        type="text"
        placeholder="Логин"
        maxlength="100"
        fluid
        @blur="save"
        :invalid="Boolean(errors.login)"
      ></InputText>
    </div>

    <div class="field" v-if="type === 'LOCAL'">
      <Password
        v-model="password"
        toggleMask
        placeholder="Пароль"
        :feedback="false"
        fluid
        maxlength="100"
        @blur="save"
        :invalid="Boolean(errors.password)"
      ></Password>
    </div>

    <div class="field">
      <Button
        icon="pi pi-trash"
        severity="danger"
        text
        @click="AccountStore.deleteAccount(props.account.id)"
      ></Button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.account-row {
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 2fr 45px;
}

.no-fourth-column {
  grid-template-columns: 2fr 2fr 4fr 45px;
}

.field:nth-child(2) {
  padding-left: 10px;
  padding-right: 10px;
}
.field:nth-child(4), .field:last-child {
  padding-left: 10px;
}
</style>