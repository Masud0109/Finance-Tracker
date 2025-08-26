// src/services/financeService.jsx
// This file contains functions for managing financial accounts and transactions.
// It interacts with the mock `api.jsx` for demonstration purposes.

import api from './api.jsx';

const FinanceService = {
  /**
   * Fetches all accounts for a user.
   * @param {string} userId - The ID of the current user.
   * @returns {Promise<object>} - A promise resolving to an array of accounts or an error.
   */
  getAccounts: async (userId) => {
    try {
      // In a real app: const response = await api.get(`/users/${userId}/accounts`);
      // For mock:
      const mockAccounts = [
        { id: '1', name: 'Checking Account', balance: 5000, active: true, userId: 'mock-user' },
        { id: '2', name: 'Savings Account', balance: 12000, active: true, userId: 'mock-user' },
        { id: '3', name: 'Credit Card', balance: -800, active: true, userId: 'mock-user' },
      ];
      // Simulate filtering by userId if needed, but for now, returning all mock
      const response = await api.get(`/users/${userId}/accounts`);
      console.log('Fetched accounts:', response.data);
      return { success: true, data: mockAccounts };
    } catch (error) {
      console.error('Failed to fetch accounts:', error);
      return { success: false, message: error.message || 'Failed to fetch accounts' };
    }
  },

  /**
   * Adds a new account for a user.
   * @param {string} userId - The ID of the current user.
   * @param {object} accountData - Details of the new account.
   * @returns {Promise<object>} - A promise resolving to the new account or an error.
   */
  addAccount: async (userId, accountData) => {
    try {
      // In a real app: const response = await api.post(`/users/${userId}/accounts`, accountData);
      // For mock:
      const newAccount = { ...accountData, id: `acc-${Date.now()}`, userId, active: true };
      const response = await api.post(`/users/${userId}/accounts`, newAccount);
      console.log('Account added:', response.data);
      return { success: true, data: newAccount };
    } catch (error) {
      console.error('Failed to add account:', error);
      return { success: false, message: error.message || 'Failed to add account' };
    }
  },

  /**
   * Updates an existing account (e.g., status, balance).
   * @param {string} userId - The ID of the current user.
   * @param {string} accountId - The ID of the account to update.
   * @param {object} updateData - Data to update in the account.
   * @returns {Promise<object>} - A promise resolving to the updated account or an error.
   */
  updateAccount: async (userId, accountId, updateData) => {
    try {
      // In a real app: const response = await api.put(`/users/${userId}/accounts/${accountId}`, updateData);
      // For mock:
      const response = await api.put(`/users/${userId}/accounts/${accountId}`, updateData);
      console.log(`Account ${accountId} updated:`, response.data);
      return { success: true, data: { id: accountId, ...updateData } };
    } catch (error) {
      console.error('Failed to update account:', error);
      return { success: false, message: error.message || 'Failed to update account' };
    }
  },

  /**
   * Fetches all transactions for a user.
   * @param {string} userId - The ID of the current user.
   * @returns {Promise<object>} - A promise resolving to an array of transactions or an error.
   */
  getTransactions: async (userId) => {
    try {
      // In a real app: const response = await api.get(`/users/${userId}/transactions`);
      // For mock:
      const mockTransactions = [
        { id: 't1', date: '2025-08-20', amount: 1500, type: 'income', source: 'Salary', accountId: '1', userId: 'mock-user' },
        { id: 't2', date: '2025-08-21', amount: 50, type: 'expense', category: 'Food', accountId: '1', userId: 'mock-user' },
        { id: 't3', date: '2025-08-22', amount: 200, type: 'expense', category: 'Transport', accountId: '2', userId: 'mock-user' },
        { id: 't4', date: '2025-08-23', amount: 2000, type: 'income', source: 'Freelance', accountId: '2', userId: 'mock-user' },
      ];
      // Simulate filtering by userId if needed, but for now, returning all mock
      const response = await api.get(`/users/${userId}/transactions`);
      console.log('Fetched transactions:', response.data);
      return { success: true, data: mockTransactions };
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      return { success: false, message: error.message || 'Failed to fetch transactions' };
    }
  },

  /**
   * Adds a new transaction for a user.
   * @param {string} userId - The ID of the current user.
   * @param {object} transactionData - Details of the new transaction.
   * @returns {Promise<object>} - A promise resolving to the new transaction or an error.
   */
  addTransaction: async (userId, transactionData) => {
    try {
      // In a real app: const response = await api.post(`/users/${userId}/transactions`, transactionData);
      // For mock:
      const newTransaction = { ...transactionData, id: `trans-${Date.now()}`, userId };
      const response = await api.post(`/users/${userId}/transactions`, newTransaction);
      console.log('Transaction added:', response.data);
      return { success: true, data: newTransaction };
    } catch (error) {
      console.error('Failed to add transaction:', error);
      return { success: false, message: error.message || 'Failed to add transaction' };
    }
  },

  /**
   * Deletes a transaction.
   * @param {string} userId - The ID of the current user.
   * @param {string} transactionId - The ID of the transaction to delete.
   * @returns {Promise<object>} - A promise resolving to success status or an error.
   */
  deleteTransaction: async (userId, transactionId) => {
    try {
      const response = await api.remove(`/users/${userId}/transactions/${transactionId}`);
      console.log('Transaction deleted:', response.data);
      return { success: true, message: 'Transaction deleted successfully' };
    } catch (error) {
      console.error('Failed to delete transaction:', error);
      return { success: false, message: error.message || 'Failed to delete transaction' };
    }
  },

  /**
   * Updates a transaction.
   * @param {string} userId - The ID of the current user.
   * @param {string} transactionId - The ID of the transaction to update.
   * @param {object} updateData - Data to update in the transaction.
   * @returns {Promise<object>} - A promise resolving to the updated transaction or an error.
   */
  updateTransaction: async (userId, transactionId, updateData) => {
    try {
      const response = await api.put(`/users/${userId}/transactions/${transactionId}`, updateData);
      console.log('Transaction updated:', response.data);
      return { success: true, data: { id: transactionId, ...updateData } };
    } catch (error) {
      console.error('Failed to update transaction:', error);
      return { success: false, message: error.message || 'Failed to update transaction' };
    }
  },
};

export default FinanceService;
