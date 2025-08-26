import AccountForm from "../components/AccountForm.jsx";

export default function Accounts({ accounts, addAccount }) {
  return (
    <section>
      <h2 className="mb-4 text-2xl font-semibold">Accounts</h2>
      <AccountForm addAccount={addAccount} />
      <div className="mt-4 space-y-2">
        {accounts.map(a => (
          <div key={a.id} className="p-2 border rounded flex justify-between">
            <span>{a.name} ({a.type}) - ₹{a.balance}</span>
            <span>{a.active ? "Active" : "Inactive"}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
