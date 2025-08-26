import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext.jsx';

const AddIncomeForm = ({ onClose }) => {
  const { addTransaction, accounts } = useFinance();
  const [incomeSource, setIncomeSource] = useState('');
  const [creditToAccount, setCreditToAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default to today
  const [error, setError] = useState('');

  // Set default account if available
  useState(() => {
    if (accounts.length > 0) {
      setCreditToAccount(accounts[0].id);
    }
  }, [accounts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!incomeSource.trim()) {
      setError('Income Source cannot be empty.');
      return;
    }
    if (!creditToAccount) {
      setError('Please select an account to credit.');
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

    const newIncome = {
      type: 'income',
      source: incomeSource,
      accountId: creditToAccount,
      amount: parseFloat(amount),
      description: description.trim(),
      date: date,
    };

    addTransaction(newIncome);
    onClose(); // Close the modal after submission
  };

  return (
    <form onSubmit={handleSubmit} className="modal-form">
      <h3>Add Income</h3>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="form-group">
        <label htmlFor="income-source">Income Source:</label>
        <input
          type="text"
          id="income-source"
          placeholder="e.g., Salary, Freelance, Gift"
          value={incomeSource}
          onChange={(e) => setIncomeSource(e.target.value)}
          required
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="credit-to-account">Credit To:</label>
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
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-input"
          rows="3"
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
          Save changes
        </button>
      </div>
    </form>
  );
};

export default AddIncomeForm;
