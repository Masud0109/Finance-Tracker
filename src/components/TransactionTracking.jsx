import React from 'react';
import Table from './Table.jsx';

const TransactionTracking = ({ transactions, onAddIncome, onAddExpense }) => {
  const incomeTransactions = transactions.filter(t => t.type === 'income');
  const expenseTransactions = transactions.filter(t => t.type === 'expense');

  const incomeHeaders = ["Description", "Date", "Amount", "Source", "Operation"];
  const expenseHeaders = ["Description", "Date", "Amount", "Category", "Operation"];

  const renderIncomeRow = (income, index) => (
    <tr key={income.id}>
      <td>{income.description || 'Description of Income'}</td>
      <td>{income.date}</td>
      <td>${income.amount.toFixed(2)}</td>
      <td>{income.source}</td>
      <td>
        <button className="table-action-button edit">Edit</button>
        <button className="table-action-button delete">Delete</button>
      </td>
    </tr>
  );

  const renderExpenseRow = (expense, index) => (
    <tr key={expense.id}>
      <td>{expense.description || 'Description of Expense'}</td>
      <td>{expense.date}</td>
      <td>${expense.amount.toFixed(2)}</td>
      <td>{expense.category}</td>
      <td>
        <button className="table-action-button edit">Edit</button>
        <button className="table-action-button delete">Delete</button>
      </td>
    </tr>
  );

  return (
    <div className="transaction-tracking-container">
      <div className="transaction-tracking-controls">
        <button onClick={onAddIncome} className="add-income-button">Add new Income</button>
        <button onClick={onAddExpense} className="add-expense-button">Add New Expense</button>
      </div>

      <section className="transaction-list-section">
        <h3>Income</h3>
        <Table
          headers={incomeHeaders}
          data={incomeTransactions}
          renderRow={renderIncomeRow}
          emptyMessage="No income recorded yet."
        />
      </section>

      <section className="transaction-list-section">
        <h3>Expenses</h3>
        <Table
          headers={expenseHeaders}
          data={expenseTransactions}
          renderRow={renderExpenseRow}
          emptyMessage="No expenses recorded yet."
        />
      </section>
    </div>
  );
};

export default TransactionTracking;
