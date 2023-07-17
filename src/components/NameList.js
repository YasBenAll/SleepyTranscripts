import React from 'react';

const NameBox = ({ name, isChecked, handleToggleCheckbox }) => {
  return (
    <div
      className={`inline-block m-2 p-2 border rounded cursor-pointer ${
        isChecked ? 'bg-blue-100' : ''
      }`}
      onClick={handleToggleCheckbox}
    >
      {name}
    </div>
  );
};

export default NameBox;