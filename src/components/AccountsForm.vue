<script setup lang="ts">
import { useAccountStore } from '@/stores/AccountStore';
import { Button, Message } from 'primevue';
import AccountItem from '@/components/AccountItem.vue';

const AccountStore = useAccountStore();
</script>

<template>
  <div>
    <div class="header">
      <div>Учетные записи</div>
      <Button label="+" @click="AccountStore.addAccount"></Button>
    </div>

    <div class="message">
      <Message icon="pi pi-question-circle">
        Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
      </Message>
    </div>

    <div class="labels">
      <span>Метка</span>
      <span>Тип записи</span>
      <span>Логин</span>
      <span>Пароль</span>
      <span></span>
    </div>

    <div class="items">
      <AccountItem
        v-for="account in AccountStore.accounts"
        :key="account.id"
        :account="account"
      ></AccountItem>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 24px;
  font-weight: bold;
}

.message {
  margin: 40px 0;
}

.labels {
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 2fr 45px;
  margin-bottom: 20px;

  :nth-child(2) {
    padding: 0 10px;
  }

  :nth-child(4) {
    padding: 0 0 0 10px;
  }
}

.items {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>