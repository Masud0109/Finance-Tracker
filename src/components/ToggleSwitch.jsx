import React from 'react';

const ToggleSwitch = ({ id, checked, onChange, label }) => {
  return (
    <div className="toggle-switch-container">
      {label && <span className="toggle-label">{label}</span>}
      <label className="toggle-switch">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
        />
        <span className="toggle-slider"></span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
