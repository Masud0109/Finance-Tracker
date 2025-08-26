import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext.jsx';

const TransferForm = ({ onClose }) => {
  const { accounts, addTransaction } = useFinance();
  const [debitFromAccount, setDebitFromAccount] = useState('');
  const [creditToAccount, setCreditToAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default to today
  const [error, setError] = useState('');

  // Set default accounts if available
  useState(() => {
    if (accounts.length > 0) {
      setDebitFromAccount(accounts[0].id);
      if (accounts.length > 1) {
        setCreditToAccount(accounts[1].id);
      }
    }
  }, [accounts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!debitFromAccount || !creditToAccount) {
      setError('Both "Debit From" and "Credit To" accounts must be selected.');
      return;
    }
    if (debitFromAccount === creditToAccount) {
      setError('Cannot transfer money to and from the same account.');
      return;
    }
    if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      setError('Amount must be a positive number.');
      return;
    }
    if (!date) {
      setError('Date cannot be empty.');
      return;
    }

    const sourceAccount = accounts.find(acc => acc.id === debitFromAccount);
    if (sourceAccount && sourceAccount.balance < parseFloat(amount)) {
      setError('Insufficient funds in the debit account.');
      return;
    }

    // Add two transactions for the transfer: one debit, one credit
    // This approach tracks the movement in the transaction list
    // The FinanceContext's addTransaction will handle updating account balances
    addTransaction({
      type: 'expense', // Represents money leaving the source account
      category: 'Transfer Out',
      accountId: debitFromAccount,
      amount: parseFloat(amount),
      description: `Transfer to ${accounts.find(acc => acc.id === creditToAccount)?.name || 'another account'} - ${description.trim()}`,
      date: date,
    });

    addTransaction({
      type: 'income', // Represents money entering the destination account
      source: 'Transfer In',
      accountId: creditToAccount,
      amount: parseFloat(amount),
      description: `Transfer from ${accounts.find(acc => acc.id === debitFromAccount)?.name || 'another account'} - ${description.trim()}`,
      date: date,
    });

    onClose(); // Close the modal after submission
  };

  return (
    <form onSubmit={handleSubmit} className="modal-form">
      <h3>Transfer Funds</h3>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="form-group">
        <label htmlFor="debit-from-account">Debit From Account:</label>
        <select
          id="debit-from-account"
          value={debitFromAccount}
          onChange={(e) => setDebitFromAccount(e.target.value)}
          required
          className="form-input"
        >
          <option value="">Select Account</option>
          {accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.name} (Balance: ${account.balance.toFixed(2)})
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="credit-to-account">Credit To Account:</label>
        <select
          id="credit-to-account"
          value={creditToAccount}
          onChange={(e) => setCreditToAccount(e.target.value)}
          required
          className="form-input"
        >
          <option value="">Select Account</option>
          {accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.name} (Balance: ${account.balance.toFixed(2)})
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          min="0.01"
          step="0.01"
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description (optional):</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-input"
          rows="2"
        ></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="form-input"
        />
      </div>

      <div className="modal-form-actions">
        <button type="button" onClick={onClose} className="modal-cancel-button">
          Close
        </button>
        <button type="submit" className="modal-save-button">
          Transfer
        </button>
      </div>
    </form>
  );
};

export default TransferForm;
