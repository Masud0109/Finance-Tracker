import React, { createContext, useState, useContext, useEffect } from 'react';
import FinanceService from '../services/financeService.jsx'; // Import the finance service
import { useAuth } from './AuthContext.jsx'; // To get the current user ID

const FinanceContext = createContext(null);

export const FinanceProvider = ({ children }) => {
  const { user, loading: authLoading } = useAuth(); // Get user and auth loading state
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch all financial data for the user
  const fetchFinanceData = async () => {
    if (!user || authLoading) { // Only fetch if user is logged in and auth is not loading
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const accountsResult = await FinanceService.getAccounts(user.id || user.email);
      const transactionsResult = await FinanceService.getTransactions(user.id || user.email);

      if (accountsResult.success) {
        setAccounts(accountsResult.data);
      } else {
        setError(accountsResult.message);
      }

      if (transactionsResult.success) {
        setTransactions(transactionsResult.data);
      } else {
        setError(transactionsResult.message);
      }
    } catch (err) {
      console.error("Error fetching finance data:", err);
      setError("Failed to load financial data.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when user changes or on initial load
  useEffect(() => {
    fetchFinanceData();
  }, [user, authLoading]); // Rerun when user or authLoading changes

  const addAccount = async (accountData) => {
    if (!user) {
      setError('User not authenticated.');
      return { success: false, message: 'User not authenticated.' };
    }
    setLoading(true);
    try {
      const result = await FinanceService.addAccount(user.id || user.email, accountData);
      if (result.success) {
        setAccounts((prevAccounts) => [...prevAccounts, result.data]);
        return { success: true };
      } else {
        setError(result.message);
        return { success: false, message: result.message };
      }
    } catch (err) {
      setError(err.message || 'Failed to add account.');
      return { success: false, message: err.message || 'Failed to add account.' };
    } finally {
      setLoading(false);
    }
  };

  const updateAccountStatus = async (accountId, status) => {
    if (!user) {
      setError('User not authenticated.');
      return { success: false, message: 'User not authenticated.' };
    }
    setLoading(true);
    try {
      const result = await FinanceService.updateAccount(user.id || user.email, accountId, { active: status });
      if (result.success) {
        setAccounts((prevAccounts) =>
          prevAccounts.map((account) =>
            account.id === accountId ? { ...account, active: status } : account
          )
        );
        return { success: true };
      } else {
        setError(result.message);
        return { success: false, message: result.message };
      }
    } catch (err) {
      setError(err.message || 'Failed to update account status.');
      return { success: false, message: err.message || 'Failed to update account status.' };
    } finally {
      setLoading(false);
    }
  };

  const addTransaction = async (transactionData) => {
    if (!user) {
      setError('User not authenticated.');
      return { success: false, message: 'User not authenticated.' };
    }
    setLoading(true);
    try {
      const result = await FinanceService.addTransaction(user.id || user.email, transactionData);
      if (result.success) {
        setTransactions((prevTransactions) => [...prevTransactions, result.data]);
        // Also update the balance of the affected account
        setAccounts((prevAccounts) =>
          prevAccounts.map((account) => {
            if (account.id === transactionData.accountId) {
              if (transactionData.type === 'income') {
                return { ...account, balance: account.balance + parseFloat(transactionData.amount) };
              } else if (transactionData.type === 'expense') {
                return { ...account, balance: account.balance - parseFloat(transactionData.amount) };
              }
            }
            return account;
          })
        );
        return { success: true };
      } else {
        setError(result.message);
        return { success: false, message: result.message };
      }
    } catch (err) {
      setError(err.message || 'Failed to add transaction.');
      return { success: false, message: err.message || 'Failed to add transaction.' };
    } finally {
      setLoading(false);
    }
  };

  // You can also add updateTransaction and deleteTransaction functions here
  // similar to addTransaction, by calling FinanceService methods.

  return (
    <FinanceContext.Provider value={{ accounts, transactions, addAccount, addTransaction, updateAccountStatus, loading, error, fetchFinanceData }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);
