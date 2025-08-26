import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useFinance } from '../context/FinanceContext.jsx';
import AccountSection from '../components/AccountSection.jsx';
import TransactionTracking from '../components/TransactionTracking.jsx';
import ReportingSection from '../components/ReportingSection.jsx';
import Modal from '../components/Modal.jsx';
import AddAccountForm from '../forms/AddAccountForm.jsx';
import AddIncomeForm from '../forms/AddIncomeForm.jsx';
import AddExpenseForm from '../forms/AddExpenseForm.jsx';
import TransferForm from '../forms/TransferForm.jsx'; // Import TransferForm
import UserProfile from '../components/UserProfile.jsx';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout, loading: authLoading } = useAuth();
  const { accounts, transactions, loading: financeLoading, error: financeError } = useFinance();
  const navigate = useNavigate();

  const [isAddAccountModalOpen, setIsAddAccountModalOpen] = useState(false);
  const [isAddIncomeModalOpen, setIsAddIncomeModalOpen] = useState(false);
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false); // State for Transfer modal

  // Redirect to login if not authenticated or if user is still loading and no user found
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  // Display a loading state if authentication is still in progress
  if (authLoading || !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading user session...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>DashBoard</h1>
        <div className="header-actions">
          <span>Welcome, {user.name || user.email}!</span>
          <button onClick={() => navigate('/profile')} className="header-button">Profile</button>
          <button onClick={logout} className="header-button">Logout</button>
        </div>
      </header>
      
      {/* User Profile Section */}
      <section className="dashboard-section user-profile-summary">
        <UserProfile />
      </section>

      {/* Account Section */}
      <section className="dashboard-section account-section-container">
        <div className="section-header">
          <h2>Accounts</h2>
          <button onClick={() => setIsAddAccountModalOpen(true)} className="add-button">Add New Account</button>
        </div>
        {financeLoading ? (
          <p>Loading accounts...</p>
        ) : financeError ? (
          <p className="text-red-500">Error loading accounts: {financeError}</p>
        ) : (
          <AccountSection accounts={accounts} />
        )}
      </section>

      {/* Transaction Tracking Section */}
      <section className="dashboard-section transaction-tracking-section-container">
        <h2>Transaction Tracking</h2>
        <div className="transaction-tracking-controls"> {/* Re-added controls for dashboard view */}
          <button onClick={() => setIsAddIncomeModalOpen(true)} className="add-income-button">Add new Income</button>
          <button onClick={() => setIsAddExpenseModalOpen(true)} className="add-expense-button">Add New Expense</button>
          <button onClick={() => setIsTransferModalOpen(true)} className="add-button">Transfer Funds</button> {/* New Transfer Button */}
        </div>
        {financeLoading ? (
          <p>Loading transactions...</p>
        ) : financeError ? (
          <p className="text-red-500">Error loading transactions: {financeError}</p>
        ) : (
          <TransactionTracking
            transactions={transactions}
            // Handled modal opening directly in Dashboard controls, can keep these props if needed for internal components
            // onAddIncome={() => setIsAddIncomeModalOpen(true)}
            // onAddExpense={() => setIsAddExpenseModalOpen(true)}
          />
        )}
      </section>

      {/* Reporting Section */}
      <section className="dashboard-section reporting-section-container">
        <h2>Report Section</h2>
        {financeLoading ? (
          <p>Generating reports...</p>
        ) : financeError ? (
          <p className="text-red-500">Error generating reports: {financeError}</p>
        ) : (
          <ReportingSection transactions={transactions} />
        )}
      </section>

      {/* Modals for forms */}
      <Modal isOpen={isAddAccountModalOpen} onClose={() => setIsAddAccountModalOpen(false)} title="Add New Account">
        <AddAccountForm onClose={() => setIsAddAccountModalOpen(false)} />
      </Modal>
      <Modal isOpen={isAddIncomeModalOpen} onClose={() => setIsAddIncomeModalOpen(false)} title="Add New Income">
        <AddIncomeForm onClose={() => setIsAddIncomeModalOpen(false)} />
      </Modal>
      <Modal isOpen={isAddExpenseModalOpen} onClose={() => setIsAddExpenseModalOpen(false)} title="Add New Expense">
        <AddExpenseForm onClose={() => setIsAddExpenseModalOpen(false)} />
      </Modal>
      <Modal isOpen={isTransferModalOpen} onClose={() => setIsTransferModalOpen(false)} title="Transfer Funds">
        <TransferForm onClose={() => setIsTransferModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default Dashboard;
