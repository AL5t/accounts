<script setup lang="ts">
import { ref } from 'vue';
import { Button, InputText, Password, Select } from 'primevue';
import type { Account } from '@/types/account';
import { useAccountStore } from '@/stores/AccountStore';
import { parseTags } from '@/utils/parseTags';

const AccountStore = useAccountStore();

const props = defineProps<{
  account: Account,
}>();

const accountData = ref({
  id: props.account.id,
  tags: props.account.tags.map(item => item.text).join(';'),
  type: props.account.type,
  login: props.account.login,
  password: props.account.password,
});

const typeOptions = ref([
  { label: 'Локальная', value: 'LOCAL', },
  { label: 'LDAP', value: 'LDAP', },
]);

function save() {
  AccountStore.updateAccount({
    id: accountData.value.id,
    tags: parseTags(accountData.value.tags),
    type: accountData.value.type,
    login: accountData.value.login,
    password: accountData.value.type === 'LOCAL' ? accountData.value.password : null,
  });
}
</script>

<template>
  <div class="account-row" :class="accountData.type !== 'LOCAL' ? 'no-fourth-column' : ''">
    <InputText
      v-model="accountData.tags"
      type="text"
      placeholder="Метка"
      maxlength="50"
      fluid
      @blur="save"
    ></InputText>

    <Select
      v-model="accountData.type"
      :options="typeOptions"
      option-label="label"
      option-value="value"
      placeholder="Тип записи"
      fluid
      @blur="save"
    ></Select>

    <InputText
      v-model="accountData.login"
      type="text"
      placeholder="Логин"
      maxlength="100"
      fluid
      @blur="save"
    ></InputText>

    <Password
      v-if="accountData.type === 'LOCAL'"
      v-model="accountData.password"
      toggleMask
      placeholder="Пароль"
      :feedback="false"
      fluid
      maxlength="100"
      @blur="save"
    ></Password>

    <Button
      icon="pi pi-trash"
      severity="danger"
      text
      @click="AccountStore.deleteAccount(props.account.id)"
    ></Button>
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
</style>