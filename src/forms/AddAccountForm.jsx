import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext.jsx';

const AddAccountForm = ({ onClose }) => {
  const { addAccount } = useFinance();
  const [accountType, setAccountType] = useState('Saving');
  const [accountName, setAccountName] = useState('');
  const [initialBalance, setInitialBalance] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!accountName.trim()) {
      setError('Account Name cannot be empty.');
      return;
    }
    if (isNaN(parseFloat(initialBalance)) || parseFloat(initialBalance) < 0) {
      setError('Initial Balance must be a non-negative number.');
      return;
    }

    const newAccount = {
      type: accountType,
      name: accountName,
      balance: parseFloat(initialBalance),
      active: true, // New accounts are active by default
    };

    addAccount(newAccount);
    onClose(); // Close the modal after submission
  };

  return (
    <form onSubmit={handleSubmit} className="modal-form">
      <h3>Add New Account</h3>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="form-group">
        <label htmlFor="account-type">Account Type:</label>
        <select
          id="account-type"
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
          required
          className="form-input"
        >
          <option value="Saving">Saving</option>
          <option value="FD">Fixed Deposit</option>
          <option value="RD">Recurring Deposit</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Cash">Cash</option>
          <option value="Loan">Loan</option>
          <option value="Investment">Investment</option>
          {/* Add more account types as needed */}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="account-name">Account Name:</label>
        <input
          type="text"
          id="account-name"
          placeholder="e.g., SBI Savings, My Wallet, Visa ****1234"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
          required
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="initial-balance">Initial Balance:</label>
        <input
          type="number"
          id="initial-balance"
          value={initialBalance}
          onChange={(e) => setInitialBalance(e.target.value)}
          required
          min="0"
          step="0.01"
          className="form-input"
        />
      </div>

      <div className="modal-form-actions">
        <button type="button" onClick={onClose} className="modal-cancel-button">
          Close
        </button>
        <button type="submit" className="modal-save-button">
          Save changes
        </button>
      </div>
    </form>
  );
};

export default AddAccountForm;
