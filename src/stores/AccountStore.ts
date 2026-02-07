import type { Account } from "@/types/account";
import { defineStore } from "pinia";
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'accounts';

export const useAccountStore = defineStore('AccountStore', {
  state: () => ({
    accounts: [] as Account[],
  }),

  actions: {
    load() {
      const dataFromStorage = localStorage.getItem(STORAGE_KEY);
      if(dataFromStorage) {
        this.accounts = JSON.parse(dataFromStorage);
      }
    },

    persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.accounts))
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
      const index = this.accounts.findIndex(item => item.id === account.id);

      if(index !== -1) {
        this.accounts[index] = account;
      }
      this.persist();
    },

    deleteAccount(accountId: string) {
      this.accounts = this.accounts.filter(item => item.id !== accountId);
      this.persist();
    }
  }
});