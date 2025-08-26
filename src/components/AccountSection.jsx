import React from 'react';
import AccountCard from './AccountCard.jsx';

const AccountSection = ({ accounts }) => {
  return (
    <div className="account-cards-grid">
      {accounts.length > 0 ? (
        accounts.map((account) => (
          <AccountCard key={account.id} account={account} />
        ))
      ) : (
        <p>No accounts added yet. Click "Add New Account" to get started!</p>
      )}
    </div>
  );
};

export default AccountSection;
