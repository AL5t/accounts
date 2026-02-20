<script setup lang="ts">
import type { Account } from '@/types/account';

import { useAccountItemForm } from '@/composables/useAccountItemForm';

const props = defineProps<{
  account: Account,
}>();

const {
  errors,
  tags,
  type,
  login,
  password,
  save,
  deleteAccount,
  isLocalAccount,
  accountTypeOptions,
} = useAccountItemForm(props.account);
</script>

<template>
  <div class="account-row" :class="!isLocalAccount ? 'no-fourth-column' : ''">
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
        :options="accountTypeOptions"
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

    <div class="field" v-if="isLocalAccount">
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
        @click="deleteAccount"
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
