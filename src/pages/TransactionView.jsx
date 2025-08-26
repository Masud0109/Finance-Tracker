import { useState } from "react";
import TransactionForm from "../components/TransactionForm.jsx";

export default function Transactions({ transactions, addTransaction, accounts }) {
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [filter, setFilter] = useState({ category: "", type: "", accountId: "" });

  const updateTransaction = (updatedTx) => {
    const newTx = transactions.map(tx => tx.id === updatedTx.id ? updatedTx : tx);
    localStorage.setItem("transactions", JSON.stringify(newTx));
    setEditingTransaction(null);
    addTransaction([]); // trigger re-render
  };

  const deleteTransaction = (id) => {
    const newTx = transactions.filter(tx => tx.id !== id);
    localStorage.setItem("transactions", JSON.stringify(newTx));
    addTransaction([]); // trigger re-render
  };

  const filteredTransactions = transactions.filter(tx => 
    (!filter.category || tx.category.includes(filter.category)) &&
    (!filter.type || tx.type === filter.type) &&
    (!filter.accountId || tx.accountId === filter.accountId)
  );

  return (
    <section>
      <h2 className="mb-4 text-2xl font-semibold">Transactions</h2>

      <TransactionForm 
        addTransaction={addTransaction} 
        accounts={accounts} 
        editingTransaction={editingTransaction} 
        updateTransaction={updateTransaction} 
        cancelEdit={() => setEditingTransaction(null)} 
      />

      <div className="my-4 flex gap-2">
        <input placeholder="Filter by category" value={filter.category} onChange={e => setFilter({...filter, category: e.target.value})} className="border p-1 rounded" />
        <select value={filter.type} onChange={e => setFilter({...filter, type: e.target.value})} className="border p-1 rounded">
          <option value="">All Types</option>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <select value={filter.accountId} onChange={e => setFilter({...filter, accountId: e.target.value})} className="border p-1 rounded">
          <option value="">All Accounts</option>
          {accounts.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
        </select>
      </div>

      <div className="space-y-2">
        {filteredTransactions.map(tx => (
          <div key={tx.id} className="p-2 border rounded flex justify-between items-center">
            <span>{tx.date} - ₹{tx.amount} - {tx.category} ({tx.type})</span>
            <div className="flex gap-2">
              <button onClick={() => setEditingTransaction(tx)} className="bg-yellow-400 text-white px-2 py-1 rounded text-xs">Edit</button>
              <button onClick={() => deleteTransaction(tx.id)} className="bg-red-500 text-white px-2 py-1 rounded text-xs">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
