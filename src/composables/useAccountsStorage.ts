import type { Account } from '@/types/account';

const ACCOUNTS_STORAGE_KEY = 'accounts';

export function useAccountsStorage(storage?: Storage) {
  const safeStorage = storage ?? globalThis.localStorage;

  function loadAccounts(): Account[] {
    try {
      const dataFromStorage = safeStorage.getItem(ACCOUNTS_STORAGE_KEY);

      if (!dataFromStorage) {
        return [];
      }

      const parsed = JSON.parse(dataFromStorage) as Account[];
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error('Failed to read accounts from localStorage', error);
      return [];
    }
  }

  function persistAccounts(accounts: Account[]): void {
    try {
      safeStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
    } catch (error) {
      console.error('Failed to write accounts to localStorage', error);
    }
  }

  return {
    loadAccounts,
    persistAccounts,
  };
}
