import React from 'react';
import ToggleSwitch from './ToggleSwitch.jsx';
import { useFinance } from '../context/FinanceContext.jsx';

const AccountCard = ({ account }) => {
  const { updateAccountStatus } = useFinance();

  const handleToggle = () => {
    updateAccountStatus(account.id, !account.active);
  };

  return (
    <div className={`account-card ${!account.active ? 'inactive' : ''}`}>
      <h3>{account.name}</h3>
      <p>Balance: <span className="balance">${account.balance.toFixed(2)}</span></p>
      {/* <p className="link-for-details">Link for Details (Future Feature)</p> */}
      <div className="account-card-footer">
        <span className="status-label">Status: {account.active ? 'Active' : 'Inactive'}</span>
        <ToggleSwitch
          id={`toggle-${account.id}`}
          checked={account.active}
          onChange={handleToggle}
          // label="Toggle for active" // Label can be added if preferred next to switch
        />
      </div>
    </div>
  );
};

export default AccountCard;
