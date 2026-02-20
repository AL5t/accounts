import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';

import { useAccountsStorage } from '@/composables/useAccountsStorage';
import type { Account } from '@/types/account';

const accountsStorage = useAccountsStorage();

export const useAccountStore = defineStore('AccountStore', {
  state: () => ({
    accounts: [] as Account[],
  }),

  actions: {
    load() {
      this.accounts = accountsStorage.loadAccounts();
    },

    persist() {
      accountsStorage.persistAccounts(this.accounts);
    },

    addAccount() {
      this.accounts.push({
        id: uuidv4(),
        tags: [],
        type: null,
        login: '',
        password: null,
      });
      this.persist();
    },

    updateAccount(account: Account) {
      const index = this.accounts.findIndex((item) => item.id === account.id);

      if (index !== -1) {
        this.accounts[index] = account;
      }
      this.persist();
    },

    deleteAccount(accountId: string) {
      this.accounts = this.accounts.filter((item) => item.id !== accountId);
      this.persist();
    },
  },
});
